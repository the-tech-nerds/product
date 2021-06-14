import { Injectable } from '@nestjs/common';
import { Client, Transport, ClientRMQ } from '@nestjs/microservices';

@Injectable()
class InventoryUpdateEvent {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
      ],
      queue: 'product_queue',
      queueOptions: {
        durable: true,
      },
    },
  })
  client: ClientRMQ;

  emit(data: string) {
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
