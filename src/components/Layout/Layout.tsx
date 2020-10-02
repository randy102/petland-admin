import React from 'react';
import './Layout.scss'

export default function Layout(props: any) {
  return (
    <div>
      {props.children}
    </div>
  )
}