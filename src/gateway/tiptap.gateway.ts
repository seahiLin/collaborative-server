import { Server as HocuspocusServer } from '@hocuspocus/server';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const hocuspocusServer = HocuspocusServer.configure({});

@WebSocketGateway(3002, {
  cors: {
    origin: '*',
  },
})
export class CollaborationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('WebSocket server initialized');
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Client connected:ee', client.request);

    const context = {
      user: {
        id: 1234,
        name: 'Jane',
      },
    };

    // Check if the transport is WebSocket and then access the ws property
    if (client.conn.transport.name === 'websocket') {
      const ws = (client.conn.transport as any).ws;
      if (ws) {
        hocuspocusServer.handleConnection(ws, client.request, context);
      }
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
}
