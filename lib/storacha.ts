import { create } from '@storacha/client'

const client = await create()

export async function uploadImage(file: File): Promise<string> {
  try {
    // Create a new File with optimized name
    const optimizedFile = new File([file], `dissun-${Date.now()}-${file.name}`, {
      type: file.type
    })

// Upload to Storacha with API key
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${process.env.STORACHA_API_KEY}`)
    
    const formData = new FormData()
    formData.append('file', optimizedFile)
    
    const response = await fetch('https://api.storacha.network/v1/upload', {
      method: 'POST',
      headers: headers,
      body: formData
    })
    
    if (!response.ok) {
      throw new Error('Upload failed')
    }
    
    const result = await response.json()
    const url = `https://${result.cid}.ipfs.w3s.link/${optimizedFile.name}`
    return url
  } catch (error) {
    console.error('Error uploading to Storacha:', error)
    throw new Error('Failed to upload image')
  }
}

export async function deleteImage(cid: string): Promise<void> {
  try {
    // Note: Web3.Storage doesn't have a direct delete API
    // Images are immutable once uploaded to IPFS
    // In a production app, you might want to maintain a database
    // of active images and filter them in your application
    console.log(`Image ${cid} marked for deletion (IPFS is immutable)`)
  } catch (error) {
    console.error('Error deleting from Storacha:', error)
    throw new Error('Failed to delete image')
  }
}

export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  try {
    const optimizedFiles = files.map((file, index) =>
      new File([file], `dissun-${Date.now()}-${index}-${file.name}`, {
        type: file.type
      })
    )

    const cid = await client.uploadDirectory(optimizedFiles)

    // Return URLs for all uploaded images
    const urls = optimizedFiles.map(file =>
      `https://${cid}.ipfs.w3s.link/${file.name}`
    )

    return urls
  } catch (error) {
    console.error('Error uploading multiple images to Storacha:', error)
    throw new Error('Failed to upload images')
  }
}