import { Server } from 'socket.io';
import http from 'http';

export let io: Server;

export function initSocket(server: http.Server) {
    io = new Server(server, {
        cors: {
            origin: '*', // or your frontend URL
        },
    });

    io.on("connection", (socket) => {
        console.log("New socket connected:", socket.id);

        socket.on("join", (accountId) => {
            console.log(`Socket ${socket.id} joined room: ${accountId}`);
            socket.join(accountId);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });
}
