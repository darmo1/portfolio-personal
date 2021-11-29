import { BlobServiceClient } from '@azure/storage-blob'

const containerName = `bankfiles`
const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME
const sasToken = process.env.REACT_APP_STORAGESASTOKEN

// return list of blobs in container to display
const getBlobsInContainer = async () => {
  const returnedBlobUrls = []

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`,
  )
  const containerClient = blobService.getContainerClient(containerName)

  try {
    for await (const blob of containerClient.listBlobsFlat({ include: ['metadata'] })) {
      // if image is public, just construct URL
      const simplifiedBlob = {
        name: blob.name,
        createdOn: blob.properties.createdOn,
        etag: blob.properties.etag,
        contentLength: blob.properties.contentLength,
        contentType: blob.properties.contentType,
        blobType: blob.properties.blobType,
        url: `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`,
        usuario: blob.metadata['usuario'],
        solicitud_id: blob.metadata['solicitud_id'],
      }
      returnedBlobUrls.push(simplifiedBlob)
    }
  } catch (err) {
    console.log(err)
  }
  return returnedBlobUrls
}

export default getBlobsInContainer
