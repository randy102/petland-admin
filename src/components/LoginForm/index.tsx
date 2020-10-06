import React from "react";
import "./logform.scss";

interface LogFormProps {
  title: string;
  children: any;
}

export default function LogForm(props: LogFormProps) {
  const { children, title } = props;
  return (
    <div className="rui-logform-wrap">
      <div className="rui-logform-body">
        <div className="title">{title}</div>
        {children}
      </div>
    </div>
  );
}
