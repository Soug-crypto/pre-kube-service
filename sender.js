var amqp = require('amqplib');
const { v4: uuidv4 } = require ('uuid');



//todo: change rabbitmq url to read from env

async function producer (){
    const queue = 'hello';
    const message = {content: "Hello World " +  uuidv4()}

    try {
        console.log("about to connect")
        const conn = await amqp.connect('amqp://guest:guest@rabbitmq-service:5672');
        console.log("We are live...wohooo")
        const channel = await conn.createChannel();
        console.log("channel created")
        await channel.assertQueue(queue, {durable: false});
        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log(" [x] Sent %s", message);
    } catch (err) {
        console.error("[AMQP] Error", err.message);
        process.exit(1)
    }
}

producer()
console.log("Please wait, I'm sending message,...")