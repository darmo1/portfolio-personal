import { BlobServiceClient } from '@azure/storage-blob'

const containerName = `bankfiles`
const sasToken = process.env.REACT_APP_STORAGESASTOKEN
const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME

export const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true
}

const getBlobsInContainer = async containerClient => {
  const returnedBlobUrls = []

  for await (const blob of containerClient.listBlobsFlat()) {
    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`,
    )
  }

  return returnedBlobUrls
}

const createBlobInContainer = async (containerClient, file, metadata) => {
  const blobClient = containerClient.getBlockBlobClient(file.name)

  const options = { blobHTTPHeaders: { blobContentType: file.type } }

  await blobClient.uploadData(file, options)
  await blobClient.setMetadata(metadata)
}

const uploadFileToBlob = async (file, metadata) => {
  if (!file) return []

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`,
  )

  const containerClient = blobService.getContainerClient(containerName)
  await containerClient.createIfNotExists({
    access: 'container',
  })

  await createBlobInContainer(containerClient, file, metadata)

  return getBlobsInContainer(containerClient)
}

export default uploadFileToBlob
