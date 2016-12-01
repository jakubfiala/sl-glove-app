const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let gestureDB = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/client/html.js', (req, res) => {
    res.sendFile(__dirname + '/client/html.js');
});

app.get('/client/index.js', (req, res) => {
    res.sendFile(__dirname + '/client/index.js');
});

io.on('connection', socket => {
    console.log('conn');

    socket.emit('updateState', gestureDB);

    socket.on('gesture', data => {
        const gObj = {
            data,
            id: gestureDB.length + 1,
            dateCreated: Date.now()
        };

        gestureDB.push(gObj);

        io.emit('gesture', gObj);

        console.log('g');
    });

    socket.on('updateName', g => {
        console.log('updating name', g);

        let gestureToUpdate = gestureDB.filter(ges => ges.id == g.id)[0];
        gestureToUpdate.name = g.name;

        io.emit('updateState', gestureDB);
    });
});

http.listen(3333, () => console.log('listening on localhost:3333'));



