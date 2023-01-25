const io = require('socket.io')(server)
const fdb = require('./database/firebase');
// Listen for connections
io.on('connection', (socket) => {
    // Listen for events from the client
    socket.on('getData', () => {
        const collectionRef = fdb.db.collection('Invoices');
        collectionRef.get().then((snapshot) => {
            let collectionData = []
            snapshot.forEach((doc) => {
                collectionData.push(doc.data())
            });
            // Emit data to the client
            socket.emit('data', collectionData)
        });
    });
});
