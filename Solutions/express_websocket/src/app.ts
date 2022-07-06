
const listOfMessages = document.getElementById("list") as HTMLUListElement;
const comment = document.getElementById("your-message") as HTMLTextAreaElement;
const sender = document.getElementById("your-name") as HTMLInputElement;
const submitBtn = document.getElementById("submit") as HTMLButtonElement;
// const refreshBtn = document.getElementById("refresh") as HTMLButtonElement;

class Module {
  connection: WebSocket;

  connect(): void {
    this.connection = new WebSocket('ws://localhost:4040');
    this.connection.onopen = () => {
      console.log('WebSocket connected');
    };
    this.connection.onmessage = (event) => {
      const { name, message } = JSON.parse(event.data) as {
        name: string;
        message: string;
      };
      appendMessage(name, message);
    };
    this.connection.onclose = () => {
      console.log('WebSocket closed');
    };
    this.connection.onerror = () => {
      console.error('WebSocket connection failed');
    };
  }
  sendMessage(str: string) {
    if (this.connection.readyState) this.connection.send(str);
  }
}

export const module = new Module();
module.connect();


submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const myName = sender.value;
  const myMessage = comment.value;
  module.sendMessage(
    JSON.stringify({
      name: myName,
      message: myMessage,
    })
  );
});


function appendMessage(name: string, message: string) {
  let newMsg = document.createElement('li');
  let author = document.createElement('span');
  author.style.fontSize = '10px';
  author.innerText = "-" + name;
  newMsg.appendChild(author);
  newMsg.innerText = message;
  listOfMessages.appendChild(newMsg);
}
