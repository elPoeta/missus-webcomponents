class ChatRoom extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }
    set chat(data) {
        this.root.innerHTML = `
              <style>
               h2 {
                font-family: Georgia, 'Times New Roman', Times, serif;
                color: blue;
              }
              .chat-panel{
                  height: 400px;
                  border: 1px solid #ccc;
              }
              
              </style>

              <div>
              <h2>Welcome!! ${data.user}</h2>
              <h3>Chat Room</h3>
              <div id='chat' class='chat-panel'></div>
              </div>
              <div id='users-online'></div>`;
    }

    set online(data) {
        const users = this.root.querySelector('#users-online');
        const temp = data.map(u => (
            `<p id='${u.id}'>${u.userName}</p>`
        )).join('');
        users.innerHTML = temp;
    }
}

customElements.define('chat-room', ChatRoom);