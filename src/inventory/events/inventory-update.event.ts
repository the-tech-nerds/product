import { Injectable } from '@nestjs/common';
import { Client, Transport, ClientRMQ } from '@nestjs/microservices';

@Injectable()
class InventoryUpdateEvent {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:pass@rabbitmq:5672'],
      queue: 'product_queue',
      queueOptions: {
        durable: true,
      },
    },
  })
  client: ClientRMQ;

  emit(data: string) {
    console.log('here');
    console.log(data);
    this.client.emit(
      'inventory_updated',
      JSON.stringify({
        source: {
          microservice: 'product',
          domain: 'inventory',
          action: 'create',
        },
        data,
      }),
    );
  }
}
export { InventoryUpdateEvent };
