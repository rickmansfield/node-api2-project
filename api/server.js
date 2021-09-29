const express = require('express');
const router = require('./posts/posts-router');

const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());

server.use('/api/posts/', postsRouter)

// server.use('/', (req, res) => res.send('API up and running!'));

server.get('/', (req, res) => {
    res.send(`
    <h2>Ricks Blog Posts API</h2>
    `);
})
module.exports = server;
