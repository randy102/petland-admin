import React from "react";
import MainCKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "./UploadAdapter";

interface EditorProps {
  value?: string
  onChange: (value: string) => void
}

export default function CKEditor(props: EditorProps) {
  const {value, onChange} = props;
  return (
    <MainCKEditor
      editor={ClassicEditor}
      data={value}
      onInit={(editor: any) => {
        editor.plugins.get("FileRepository").createUploadAdapter = function (
          loader: any
        ) {
          return new UploadAdapter(loader);
        };
      }}
      onChange={(_: any, editor: any) => {
        const data = editor.getData();
        onChange(data)
      }}
    />
  );
}
