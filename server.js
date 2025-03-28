// server.js 后端服务
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

// 所有连接的客户端
const clients = new Set();

server.on('connection', (socket) => {
    clients.add(socket);
    
    // 收到消息时广播给所有客户端
    socket.on('message', (message) => {
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    // 断开连接时移除
    socket.on('close', () => {
        clients.delete(socket);
    });
});

console.log('聊天室已启动在 ws://localhost:3000');