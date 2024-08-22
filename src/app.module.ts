import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketsGatewayModule } from './gateway/websocket.module';

@Module({
  imports: [WebsocketsGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
