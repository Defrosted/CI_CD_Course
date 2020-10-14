import { connect } from "amqplib/callback_api";
import { sleep, settings, bindCleanup } from "./util";

const { exchange, routings, connectionString } = settings;
const key = routings.o;

connect(connectionString, (connectionError, connection): void => {
    if(connectionError)
        throw connectionError;

    connection.createChannel(async (channelError, channel): Promise<void> => {
        if(channelError)
            throw channelError;
        
        channel.assertExchange(exchange, 'topic', {
            durable: false
        });

        for(let i = 1; i <= 3; i++) {
            await sleep(3000);
            const message = `MSG_${i}`;
            channel.publish(exchange, key, Buffer.from(message, 'utf-8'));
            console.log(`ORIG sent ${message} to ${exchange}:${key}`);
        }
    });

    bindCleanup((): void => {
        connection.close();
    });
});