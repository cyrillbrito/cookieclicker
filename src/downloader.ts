import axios from 'axios';
import { createWriteStream } from 'fs';


export async function httpGet(url: string): Promise<string> {
  const response = await axios.get(url);
  return response.data;
}

export async function bulkDownloadFile(serverBase: string, localBase: string, files: string[]): Promise<void> {

  let promises: Promise<unknown>[] = [];

  for (const [i, file] of files.entries()) {

    console.log(`Downloading file ${i + 1} of ${files.length}: ${file}`);

    promises.push(downloadFile(serverBase + file, localBase + file));

    if (promises.length === 32) {
      await Promise.all(promises);
      promises = [];
    }
  }

  if (promises.length) {
    await Promise.all(promises);
  }
}

// https://stackoverflow.com/questions/55374755/node-js-axios-download-file-stream-and-writefile
export async function downloadFile(url: string, path: string): Promise<boolean> {
  const writer = createWriteStream(path);

  return axios({
    method: 'get',
    url: url,
    responseType: 'stream',
  }).then(response => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error: Error;
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
      });
    });
  });
}
