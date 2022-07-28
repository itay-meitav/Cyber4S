import { UploadModule } from './upload';
import { AuthModule } from './auth';

export class HeaderModule {
  onload(): void {
    const username: string = localStorage.getItem('username');
    if (username) {
      location.href = '/upload';
    }
  }

  checkAuth(): void {
    const username: string = localStorage.getItem('username');
    if (!username) {
      location.href = '/';
    }
  }
}

export const headerModule = new HeaderModule();
export const uploadModule = new UploadModule();
export const authModule = new AuthModule();
