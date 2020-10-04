import React from 'react'
import './logform.scss'

export default function LogForm({children, title}) {
  return (
    <div className="rui-logform-wrap">
      <div className="rui-logform-body">
        <div className="title">
          {title}
        </div>
        {children}
      </div>
    </div>
  )
}
