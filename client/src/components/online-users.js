class OnlineUsers extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }
    set users(data) {
        this.root.innerHTML = `
              <style>
              #users-online{
                  border: 1px solid green; 
                }
              
              </style>

              <div id='users-online'>
                 ${data.map(u => (
            `<p id='${u.id}'>${u.userName}</p>`
        )).join('')}
              </div>`;
    }


}

customElements.define('online-users', OnlineUsers);