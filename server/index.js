import { Server } from 'socket.io';
import express from 'express';
import Connection from './database/db.js';
import {createServer} from 'http';

import { getDocument, updateDocument } from './controller/document-controller.js'

const PORT = process.env.PORT || 9000;
const URL = process.env.MONGODB_URI;
Connection(URL);

const app = express();

const httpServer = createServer(app);
httpServer.listen(PORT);



const io = new Server(httpServer);

io.on('connection', socket => {
    socket.on('get-document', async documentId => {
        const document = await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })

        socket.on('save-document', async data => {
            await updateDocument(documentId, data);
        })
    })
});