const amqp = require("amqplib");

// RabbitMQ server URL
const rabbitmqURL = "amqp://localhost";

(async () => {
	let connection;
	try {
		//create connection with rabbit mq server
		connection = await amqp.connect(rabbitmqURL);
		// create channel
		const channel = await connection.createChannel();

		// create a queue if there is no querue in the server
		let queueName = "myQueue";
		await channel.assertQueue(queueName, { durable: false });

		// send a message to queue
		let message = "hello world";
		channel.sendToQueue(queueName, Buffer.from(message));
		console.log(`message: ${message}`);
	} catch (error) {
		throw error;
	} finally {
		// once we have send message to the queue there is no need of connection so close it
		setTimeout(() => {
			connection.close();
		}, 1000);
	}
})();
