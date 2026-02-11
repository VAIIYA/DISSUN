import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './db/schema';
import { eq, desc, sql, and } from 'drizzle-orm';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || '',
  authToken: process.env.TURSO_AUTH_TOKEN || '',
});

export const db_drizzle = drizzle(client, { schema });

import { Product, Order, ContactMessage, BlogPost } from './types';

// Compatibility layer for the existing code that expects a MongoDB-like interface
export const db = {
  products: {
    findMany: async (options?: { where?: any; orderBy?: any; include?: any; take?: number }): Promise<Product[]> => {
      const result = await db_drizzle.query.products.findMany({
        where: options?.where ? (products, { eq, and }) => {
          const conditions = Object.entries(options.where).map(([key, value]) => {
            const field = key === '_id' ? 'id' : key;
            return eq((products as any)[field], value);
          });
          return and(...conditions);
        } : undefined,
        limit: options?.take,
        orderBy: options?.orderBy ? (products) => {
          const field = Object.keys(options.orderBy)[0];
          const direction = options.orderBy[field];
          return direction === 'desc' ? desc((products as any)[field]) : (products as any)[field];
        } : undefined,
        with: options?.include?.images ? { images: true } : undefined,
      });
      return result.map(p => ({ ...p, _id: p.id })) as any;
    },
    findUnique: async (options: { where: any; include?: any }): Promise<Product | null> => {
      const result = await db_drizzle.query.products.findFirst({
        where: (products, { eq, and }) => {
          const conditions = Object.entries(options.where).map(([key, value]) => {
            const field = key === '_id' ? 'id' : key;
            return eq((products as any)[field], value);
          });
          return and(...conditions);
        },
        with: options?.include?.images ? { images: true } : undefined,
      });
      return result ? ({ ...result, _id: result.id } as any) : null;
    },
    create: async (options: { data: any }): Promise<Product> => {
      const data = { ...options.data };
      if (data._id) {
        data.id = data._id;
        delete data._id;
      }
      await db_drizzle.insert(schema.products).values(data);
      return { ...data, _id: data.id };
    },
    update: async (options: { where: any; data: any }): Promise<Product | null> => {
      const id = options.where.id || options.where._id;
      await db_drizzle.update(schema.products).set(options.data).where(eq(schema.products.id, id));
      return db.products.findUnique({ where: { id } });
    },
    count: async (options?: { where?: any }): Promise<number> => {
      const result = await db_drizzle.select({ count: sql<number>`count(*)` }).from(schema.products);
      return result[0].count;
    }
  },
  orders: {
    create: async (options: { data: any }) => {
      const data = { ...options.data };
      if (data._id) {
        data.id = data._id;
        delete data._id;
      }
      await db_drizzle.insert(schema.orders).values(data);
      return { ...data, _id: data.id };
    },
    count: async () => {
      const result = await db_drizzle.select({ count: sql<number>`count(*)` }).from(schema.orders);
      return result[0].count;
    },
    aggregate: async (options: { where?: any; _sum: any }) => {
      const result = await db_drizzle.select({ total: sql<number>`sum(totalAmount)` }).from(schema.orders);
      return { _sum: { totalAmount: result[0].total || 0 } };
    }
  },
  messages: {
    findMany: async (options?: { orderBy?: any }) => {
      const result = await db_drizzle.query.messages.findMany({
        orderBy: options?.orderBy ? (messages) => {
          const field = Object.keys(options.orderBy)[0];
          const direction = options.orderBy[field];
          return direction === 'desc' ? desc((messages as any)[field]) : (messages as any)[field];
        } : undefined,
      });
      return result.map(m => ({ ...m, _id: m.id }));
    },
    create: async (options: { data: any }) => {
      const data = { ...options.data };
      if (data._id) {
        data.id = data._id;
        delete data._id;
      }
      await db_drizzle.insert(schema.messages).values(data);
      return { ...data, _id: data.id };
    },
    delete: async (options: { where: any }) => {
      const id = options.where.id || options.where._id;
      await db_drizzle.delete(schema.messages).where(eq(schema.messages.id, id));
    }
  }
};

export const getBlogsCollection = async () => {
  return {
    find: (query?: any) => ({
      sort: (sort?: any) => ({
        toArray: async () => {
          const result = await db_drizzle.query.blogs.findMany({
            orderBy: sort ? (blogs) => {
              const field = Object.keys(sort)[0];
              const direction = sort[field];
              return direction === -1 ? desc((blogs as any)[field]) : (blogs as any)[field];
            } : undefined,
          });
          return result.map(b => ({ ...b, _id: b.id }));
        }
      })
    })
  };
};

export const getMessagesCollection = async () => {
  return {
    countDocuments: async () => {
      const result = await db_drizzle.select({ count: sql<number>`count(*)` }).from(schema.messages);
      return result[0].count;
    }
  };
};