export const sleep = async (delay: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(() => {
        resolve();
    }, delay));
};

export const settings = {
    connectionString: "amqp://rabbit",
    exchange: "messages",
    routings: {
        o: "my.o",
        i: "my.i"
    },
    messagesFilePath: '/messages/messages.txt'
};

export const bindCleanup = (cleanup: () => void): void => {
    ['exit', 'SIGINT'].forEach((event) => {
        process.on(event, cleanup);
    });
};