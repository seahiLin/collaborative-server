import { Module } from '@nestjs/common';
import { CollaborationGateway } from './tiptap.gateway';

@Module({
  providers: [CollaborationGateway],
})
export class WebsocketsGatewayModule {}
