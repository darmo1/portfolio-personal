import { useRouter } from 'next/router'
import React, { useState } from 'react'
import uploadFileToBlob, { isStorageConfigured } from './azure-storage-blob'

const FileUploader = () => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario

  const [fileSelected, setFileSelected] = useState(null)

  const [uploading, setUploading] = useState(false)
  const [inputKey, setInputKey] = useState(Math.random().toString(36))

  const storageConfigured = isStorageConfigured()

  const onFileChange = event => {
    setFileSelected(event.target.files[0])
  }

  const onFileUpload = async () => {
    setUploading(true)

    const response = await uploadFileToBlob(fileSelected, {
      usuario: cedula,
      solicitud_id: solicitud,
    })

    setFileSelected(null)
    setUploading(false)
    setInputKey(Math.random().toString(36))
  }

  const DisplayForm = () => (
    <div className="p-4">
      <input type="file" onChange={onFileChange} key={inputKey || ''} />
      <button
        className="mt-4 p-2 w-1/2 text-white rounded-full bg-color_primary_2_ligth"
        type="submit"
        onClick={onFileUpload}
      >
        Subir
      </button>
    </div>
  )

  return (
    <div className="border py-4 rounded-lg my-4">
      {storageConfigured && !uploading && DisplayForm()}
      {storageConfigured && uploading && <div>Uploading</div>}
    </div>
  )
}

export default FileUploader
