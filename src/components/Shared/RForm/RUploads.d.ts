import * as React from 'react'

export interface UploadApi{
  reset: () => void,
  removeAll: () => void
}

export interface RUploadsProps {
  
  // URL to upload image
  url: string
  
  // URL to load uploaded image 
  viewUrl: string

  
  label?: string
  initId?: string
  disabled: boolean
  onChange?: (fileList: string[]) => void
  uploadApi?: (uploadApi: UploadApi) => void
}

declare const RUploads: React.FunctionComponent<RUploadsProps>
export default RUploads