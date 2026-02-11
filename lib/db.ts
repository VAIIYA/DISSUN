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

export const getBlogsCollection = async (): Promise<any> => {
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
    }),
    findOne: async (query: any) => {
      const id = query.id || query._id;
      const result = await db_drizzle.query.blogs.findFirst({
        where: id ? eq(schema.blogs.id, id.toString()) : undefined,
      });
      return result ? { ...result, _id: result.id } : null;
    },
    updateOne: async (query: any, update: any) => {
      const id = query.id || query._id;
      const data = update.$set || update;
      delete data._id;
      delete data.id;
      return await db_drizzle.update(schema.blogs).set(data).where(eq(schema.blogs.id, id.toString()));
    },
    deleteOne: async (query: any) => {
      const id = query.id || query._id;
      return await db_drizzle.delete(schema.blogs).where(eq(schema.blogs.id, id.toString()));
    },
    insertOne: async (data: any) => {
      const id = data.id || data._id || Math.random().toString(36).substring(7);
      const insertData = { ...data, id };
      delete insertData._id;
      await db_drizzle.insert(schema.blogs).values(insertData);
      return { insertedId: id };
    }
  };
};

export const getMessagesCollection = async (): Promise<any> => {
  return {
    countDocuments: async () => {
      const result = await db_drizzle.select({ count: sql<number>`count(*)` }).from(schema.messages);
      return result[0].count;
    },
    findOne: async (query: any) => {
      const id = query.id || query._id;
      const result = await db_drizzle.query.messages.findFirst({
        where: id ? eq(schema.messages.id, id.toString()) : undefined,
      });
      return result ? { ...result, _id: result.id } : null;
    },
    deleteOne: async (query: any) => {
      const id = query.id || query._id;
      return await db_drizzle.delete(schema.messages).where(eq(schema.messages.id, id.toString()));
    }
  };
};

export const getCollection = async (name: string): Promise<any> => {
  if (name === 'blogs') return getBlogsCollection();
  if (name === 'messages') return getMessagesCollection();

  const mockCollection = (tableName: any) => ({
    findOne: async (query: any) => {
      const id = query.id || query._id;
      const result = await db_drizzle.query[name as keyof typeof db_drizzle.query].findFirst({
        where: id ? eq((schema as any)[name].id, id.toString()) : undefined,
      } as any);
      return result ? { ...result, _id: (result as any).id } : null;
    },
    find: () => ({ sort: () => ({ toArray: async () => [] }) }),
    insertOne: async (data: any) => {
      const id = data.id || data._id || Math.random().toString(36).substring(7);
      const insertData = { ...data, id };
      delete insertData._id;
      await db_drizzle.insert((schema as any)[name]).values(insertData);
      return { insertedId: id };
    },
    updateOne: async (query: any, update: any) => {
      const id = query.id || query._id;
      if (update.$inc) {
        const field = Object.keys(update.$inc)[0];
        const value = update.$inc[field];
        await db_drizzle.update((schema as any)[name])
          .set({ [field]: sql`${sql.raw(field)} + ${value}` })
          .where(eq((schema as any)[name].id, id.toString()));
      } else {
        const data = update.$set || update;
        delete data._id;
        delete data.id;
        await db_drizzle.update((schema as any)[name]).set(data).where(eq((schema as any)[name].id, id.toString()));
      }
      return { modifiedCount: 1 };
    },
    deleteOne: async (query: any) => {
      const id = query.id || query._id;
      return await db_drizzle.delete((schema as any)[name]).where(eq((schema as any)[name].id, id.toString()));
    },
  });

  if (name === 'products') return mockCollection(schema.products);
  if (name === 'orderItems') return mockCollection(schema.orderItems);
  if (name === 'orders') return mockCollection(schema.orders);

  return {
    findOne: async () => null,
    find: () => ({ sort: () => ({ toArray: async () => [] }) }),
    insertOne: async (data: any) => ({ insertedId: 'mock' }),
    updateOne: async () => ({}),
    deleteOne: async () => ({}),
  };
};