var amqp = require('amqplib');

//todo: change rabbitmq url to read from env

async function consumer(){
    const queue = 'hello';
    try {
        const conn = await amqp.connect('amqp://admin:admin@localhost:5672');
        const channel = await conn.createChannel();
        await channel.assertQueue(queue, {durable: false});
        
        channel.consume("jobs", message => {
            if (message !== null) {
                console.log(message)
                const input = JSON.parse(message.content.toString());
                console.log(`Recieved job with input ${input}`)
                channel.ack(message);
            }
            
        })
        console.log(" [x] Sent %s", message);
        console.log("Waiting for messages...")

    } catch (err) {
        console.error("[AMQP] Error", err.message);
        process.exit(1)
    }
}

consumer();
