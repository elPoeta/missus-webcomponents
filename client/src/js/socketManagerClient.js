import '../components/chat-room.js';
import '../components/online-users.js';
const socket = io.connect('http://localhost:5000');
console.log('connected');
const error = document.querySelector('#error');
const userName = document.querySelector('#userName');
const submitUser = document.querySelector('#submitUser');
const main = document.querySelector('#main');

submitUser.addEventListener('click', e => {
    const user = userName.value;
    if (user) {
        socket.emit('new user', user, callback => {
            if (callback) {
                console.log('Succes');
                const el = document.createElement('chat-room');
                el.chat = { user };
                main.innerHTML = null;
                main.appendChild(el);

            }
        });
    } else {
        error.innerHTML = `<p>User name empty !!</p>`;
    }
})


socket.on('get users', data => {
    console.log('data :: ', data)
    const el = document.querySelector('chat-room');
    el.online = data
    main.appendChild(el);
})
