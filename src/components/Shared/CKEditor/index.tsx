import React from "react";
import MainCKEditor from "@ckeditor/ckeditor5-react";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import UploadAdapter from "./UploadAdapter";

interface EditorProps {
  init?: string;
  onChange: (value: string) => void;
}

const editorConfiguration = {
  toolbar: {
    items: [
      'heading',
      '|',
      'fontFamily',
      'fontSize',
      'fontColor',
      'fontBackgroundColor',
      'bold',
      'strikethrough',
      'italic',
      'underline',
      'link',
      'highlight',
      'removeFormat',
      'horizontalLine',
      'bulletedList',
      'numberedList',
      '|',
      'alignment',
      'indent',
      'outdent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
      'htmlEmbed',
      'codeBlock',
      'code'
    ]
  },
  language: 'en',
  image: {
    toolbar: [
      'imageTextAlternative',
      'imageStyle:full',
      'imageStyle:side'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableCellProperties',
      'tableProperties'
    ]
  },
};

export default function CKEditor(props: EditorProps) {
  const { init = "", onChange } = props;
  let editorElm: any = null;
  return (
    <div style={{ marginBottom: 15, marginTop: 10 }}>
      <MainCKEditor
        data={init}
        editor={Editor}
        config={ editorConfiguration }
        onReady={ (editor: any) => {
          console.log( 'Editor is ready to use!', editor );

          // Insert the toolbar before the editable area.
          editor.ui.getEditableElement().parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
          );

          editorElm = editor;
      } }
      onError={ ( { willEditorRestart }: any ) => {
          // If the editor is restarted, the toolbar element will be created once again.
          // The `onReady` callback will be called again and the new toolbar will be added.
          // This is why you need to remove the older toolbar.
          if ( willEditorRestart ) {
            editorElm.ui.view.toolbar.element.remove();
          }
      } }
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
