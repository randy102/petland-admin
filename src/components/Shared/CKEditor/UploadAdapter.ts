import Axios from "axios";
import { getToken } from "utils/auth";

export default class UploadAdapter {
  loader: any;

  constructor(loader: any) {
    // Save Loader instance to update upload progress.
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    data.append("file", await this.loader.file);

    return new Promise((resolve, reject) => {
      Axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/file`,
        method: "post",
        data,
        headers: {
          token: `Bearer ${getToken()}`,
        },
      })
        .then((res) => {
          const resData = res.data;
          const url = process.env.REACT_APP_BACKEND_URL
          resData.default = `${url}/file/${resData.fileId}`;
          resolve(resData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  abort() {
    // Reject promise returned from upload() method.
  }
}