import * as fs from 'fs';
import { connect } from 'amqplib/callback_api';
import { settings, bindCleanup } from './util';

const { connectionString, exchange, routings, messagesFilePath } = settings;
try {
    fs.writeFileSync(messagesFilePath, "");
} catch(exception) {
    console.log("Failed to write messages file:", exception);
}

const writeMessageToFile = (message: string, exchange: string, key: string): void => {
    console.log(`OBSE received ${message} from ${exchange}: ${key}`);

    const data = `${new Date().toISOString()} Topic ${key}: ${message}\n`;
    fs.appendFileSync(messagesFilePath, data);
};

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

            channel.bindQueue(queue.queue, exchange, '#');

            channel.consume(queue.queue, (message) => 
                writeMessageToFile(message.content.toString('utf-8'), exchange, message.fields.routingKey));
        });
    });

    bindCleanup((): void => {
        connection.close();
    });
});
