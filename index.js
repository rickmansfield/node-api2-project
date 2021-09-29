const server = require('./api/server');

const PORT = 7000
server.listen(PORT, () => {
    console.log('Listening on PORT:', PORT);
})