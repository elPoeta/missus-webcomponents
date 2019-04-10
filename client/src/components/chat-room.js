class ChatRoom extends HTMLElement {
  constructor() {
    super();
    this.message;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
        h2 {
         font-family: Georgia, 'Times New Roman', Times, serif;
         color: blue;
       }
       .room {
           display: flex;
           height: 400px;
           margin: 0 auto;
           width:60%;
           border: 1px solid #ccc;
           
       }
       #users-online{
            border-right: 1px solid #ccc; 
            padding: 6px 3px;
            width: 20%;
       }
       #message, #send{
           margin: 8px auto;
           padding: 8px;
           display: flex;
       }
       #message{
        width: 59%;
       }
       #send{
        width: 60%;
        border: none;
        border-radius: .5em;
        background: green;
        color: #fff;
        font-size: 1em;
        text-align: center;
        line-height: initial;
        justify-content:center;
        align-self:center;
       }
       .strong{
           font-weight: bold;
       }
       .msg-list{
           list-style: none;
       }
       .strong p {
           display: flex;
       }
       </style>

       <div>
       <h2 id="welcome"></h2>
       <h3>Chat Room</h3>
       <section class='room'>
       <div id='users-online'></div>
       <div  class='chat-panel'><ul id='chat'></ul></div>
       </section> 
       <input type='text' id='message' placeholder='Say something...' />
       <button id='send'>Send</button>
       </div>`;
    this.shadowRoot
      .querySelector("#send")
      .addEventListener("click", this._sendMessage);
  }

  set title(user) {
    console.log(user);
    this.shadowRoot.querySelector("#welcome").textContent = `Welcome!! ${
      user.user
    }`;
  }

  set users(users) {
    const template = `
        ${users.map(u => `<p id'${u.id}'>${u.userName}</p>`).join("")}
        `;

    this.shadowRoot.querySelector("#users-online").innerHTML = template;
  }

  _sendMessage = () => {
    const sendEvent = new Event("send");
    this.message = this.shadowRoot.querySelector("#message").value;
    if (this.message) {
      this.dispatchEvent(sendEvent);
    }
  };
  set msg(msg) {
    console.log("m@ ", msg);
    const li = document.createElement("li");
    const p = document.createElement("p");
    const template = `
        <span class="strong">${msg.userName}: </span>${msg.message}`;
    p.innerHTML = template;
    li.className = "msg-list";
    li.appendChild(p);
    this.shadowRoot.querySelector("#chat").appendChild(li);
  }

  clearMessage() {
    this.message = "";
    this.shadowRoot.querySelector("#message").value = "";
  }
}

customElements.define("chat-room", ChatRoom);
