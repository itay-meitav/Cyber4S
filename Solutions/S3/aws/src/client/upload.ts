import { json } from "body-parser";

export class UploadModule {
  totalSize = 0;
  totalSizeEl = document.getElementById('total-size') as HTMLDivElement
  onload() {
    this.displayUsername();
    this.initFileUploader();
    this.totalSizeEl = document.getElementById('total-size') as HTMLDivElement
    this.totalSizeEl.classList.add('total-size')
    this.loadImages();
  }

  displayUsername() {
    const authNameInput = document.getElementById('username') as HTMLSpanElement;
    authNameInput.innerText = localStorage.getItem('username');
  }

  initFileUploader() {
    const fileInput = document.getElementById('file') as HTMLInputElement;
    fileInput.onchange = () => {
      if (fileInput.files && fileInput.files.length > 0) {
        this.sendFile(fileInput.files[0]);
      }
    };
  }

  loadImages() {
    this.totalSize = 0
    this.totalSizeEl.innerHTML = `<b>Total Size:${formatBytes(this.totalSize)}</b>`;
    const queryParams = {
      username: localStorage.getItem('username')
    };
    fetch(location.origin + '/images?' + this.getQueryString(queryParams), {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        const imagesDiv = document.getElementById('images') as HTMLDivElement;
        imagesDiv.innerHTML = '';
        if (response.images.length > 0) {
          response.images.forEach(async (id: number) => {
            const details = document.createElement('div') as HTMLDivElement;
            details.id = "details";
            imagesDiv.appendChild(details);
            const a = document.createElement('a') as HTMLAnchorElement;
            a.href = '/image/' + id;
            a.target = '_blank';
            const img = document.createElement('img') as HTMLImageElement;
            img.src = '/image/' + id;
            a.appendChild(img);
            details.appendChild(a);
            const getSize = await (async () => {
              const data = await fetch(`image/detailes/${id}`);
              const size = await data.json();
              return size.length;
            })();
            this.totalSize += getSize
            const size = document.createElement('div') as HTMLDivElement;
            size.id = "size";
            size.innerHTML = `<b>Size:${formatBytes(getSize)}</b>`;
            this.totalSizeEl.innerHTML = `<b>Total Size:${formatBytes(this.totalSize)}</b>`;
            details.appendChild(size);
            imagesDiv.appendChild(details);
            const deleteBtn = document.createElement('button') as HTMLButtonElement;
            deleteBtn.id = "deleteBtn";
            deleteBtn.innerHTML = "&#128465";
            deleteBtn.addEventListener('click', async () => {
              let res = await fetch(`/delete/${id}`, {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({
                  username: localStorage.getItem('username')
                })
              });
              let data = await res.json();
              if (data.success) {
                details.remove();
                this.totalSize -= getSize;
                this.totalSizeEl.innerHTML = `<b>Total Size:${formatBytes(this.totalSize)}</b>`;
              } else {
                alert('error');
              }
            })
            details.appendChild(deleteBtn);
          })
        }
      });
  }

  async sendFile(file: File) {
    const mimeType: string = this.getMimeType(file.name);
    if (mimeType.startsWith('image')) {
      const fileContent: Uint8Array = await this.getFileContent(file);
      const queryParams = {
        filename: file.name,
        username: localStorage.getItem('username')
      };
      const response = await fetch(location.origin + '/upload?' + this.getQueryString(queryParams), {
        headers: { 'Content-Type': mimeType },
        method: 'POST',
        body: fileContent
      });
      if (response.status == 413) {
        alert('file is too large!')
      } else {
        const json = await response.json();
        if (json.success) {
          this.resetFileInput();
          this.loadImages();
        }
      }
    } else {
      alert('File should be an image');
      this.resetFileInput();
    }
  }

  private getQueryString(queryParam: Object) {
    return Object.keys(queryParam)
      .map(key => `${key}=${queryParam[key]}`)
      .join('&');
  }

  resetFileInput(): void {
    const fileInput = document.getElementById('file') as HTMLInputElement;
    fileInput.value = '';
  }

  deleteAll(): void {
    fetch(location.origin + '/delete', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        username: localStorage.getItem('username')
      })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response.success) {
          this.loadImages();
        }
      });
  }

  // filename.jpg -> jpg
  getExtension(filename: string): string {
    filename = filename.toLowerCase();
    const extensionRegExp = /(?:\.([^.]+))?$/;
    const extension: string = extensionRegExp.exec(filename)[1];
    if (extension) {
      return extension;
    } else {
      if (filename !== '') {
        return filename;
      } else {
        return undefined;
      }
    }
  }

  // Returns mime type. type/subtype[;parameter]
  getMimeType(filename: string): string {
    switch (this.getExtension(filename)) {
      case 'jpg':
      case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
      case 'gif': return 'image/gif';
      case 'ico': return 'image/x-icon';
      case 'webp': return 'image/webp';
      default: return 'text/plain;charset=utf-8';
    }
  }

  // Gets content from browser File
  getFileContent(file: File): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const binary = new Uint8Array(reader.result as ArrayBuffer);
        resolve(binary);
      };
      reader.onerror = () => {
        reject();
      };
    });
  }
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}