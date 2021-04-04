import React from 'react'

interface RImageProps{
  alt?: string
  style?: React.CSSProperties
  width?: number
  id: string
}

export default function RImage(props: RImageProps) {
  const {alt, style, width, id} = props
  const src = process.env.REACT_APP_S3URL + "/" + id
  return (
    <img alt={alt} src={src} style={{maxWidth: width, ...style}} />
  )
}
