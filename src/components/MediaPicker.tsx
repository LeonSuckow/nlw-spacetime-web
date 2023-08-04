'use client'

import { ChangeEvent, useState } from 'react'

type MediaType = 'video' | 'image'
export function MediaPicker() {
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [mediaType, setMediaType] = useState<MediaType>()
  const allowedTypes: MediaType[] = ['video', 'image']

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files || files.length <= 0) {
      return null
    }

    const selectedFile = files[0]
    const fileURL = URL.createObjectURL(selectedFile)
    const fileType = selectedFile.type.split('/')[0]

    if (allowedTypes.includes(fileType as MediaType)) {
      setMediaType(fileType as MediaType)
      setPreviewUrl(fileURL)
    }
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*, video/*"
        className="invisible h-0 w-0"
      />
      {mediaType === 'image' && (
        <img
          src={previewUrl}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
      {mediaType === 'video' && (
        <video
          src={previewUrl}
          className="aspect-video w-full rounded-lg object-cover"
          controls
        />
      )}
    </>
  )
}
