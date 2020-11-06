import React from "react";
import MainCKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "./UploadAdapter";

interface EditorProps {
  init?: string;
  onChange: (value: string) => void;
}

export default function CKEditor(props: EditorProps) {
  const { init = "", onChange } = props;

  return (
    <div style={{ marginBottom: 15, marginTop: 10 }}>
      <MainCKEditor
        data={init}
        editor={ClassicEditor}
        onInit={(editor: any) => {
          editor.setData(init);
          editor.plugins.get("FileRepository").createUploadAdapter = function (
            loader: any
          ) {
            return new UploadAdapter(loader);
          };
        }}
        onChange={(_: any, editor: any) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
