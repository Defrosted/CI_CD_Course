import { connect } from "amqplib/callback_api";
import { sleep, settings, bindCleanup } from "./util";

const { connectionString, exchange, routings } = settings;
const inputKey = routings.o;
const outputKey = routings.i;

connect(connectionString, (connectionError, connection): void => {
    if(connectionError)
        throw connectionError;

    connection.createChannel((channelError, channel): void => {
        if(channelError)
            throw channelError;

        channel.assertExchange(exchange, 'topic', {
            durable: false
        });

        channel.assertQueue('', {
            exclusive: true
        }, async (queueError, queue): Promise<void> => {
            if(queueError)
                throw queueError;

            channel.bindQueue(queue.queue, exchange, inputKey);

            channel.consume(queue.queue, async (message): Promise<void> => {
                const content = message.content.toString('utf-8');
                
                console.log(`IMED received ${message.content} from ${exchange}: ${inputKey}`);

                await sleep(1000);

                const relayedMessage = `Got ${content}`;
                channel.publish(exchange, outputKey, Buffer.from(relayedMessage, 'utf-8'));
                console.log(`IMED sent ${relayedMessage} to ${exchange}:${outputKey}`);
            });
        });
    });

    bindCleanup((): void => {
        connection.close();
    });
});