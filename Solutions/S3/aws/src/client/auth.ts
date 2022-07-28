export class AuthModule {
  login(): void {
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (usernameInput && passwordInput) {
      fetch(location.origin + '/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          username: usernameInput.value,
          password: passwordInput.value,
        })
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          if (response.success) {
            this.auth(usernameInput.value, passwordInput.value);
          } else if (response.error === 'username') {
            alert('User not found');
          } else if (response.error === 'password') {
            alert('Password is incorrect');
          }
        });
    }
  }

  signup(): void {
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (usernameInput && passwordInput) {
      fetch(location.origin + '/signup', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          username: usernameInput.value,
          password: passwordInput.value,
        })
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          if (response.success) {
            this.auth(usernameInput.value, passwordInput.value);
          } else {
            alert('Something not good');
          }
        });
    }
  }

  auth(username: string, password: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    location.href = '/upload';
  }

  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    location.href = '/';
  }
}
