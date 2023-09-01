const amqp = require("amqplib");

const rabbitmqURL = "amqp://localhost";

(async () => {
	let connection;
	try {
		connection = await amqp.connect(rabbitmqURL);
		const channel = await connection.createChannel();

		let queueName = "myQueue";
		await channel.assertQueue(queueName, { durable: false });

		// to get message from queue
		channel.consume(
			queueName,
			(msg) => {
				console.log(`Received: ${msg.content.toString()}`);
			},
			{
				noAck: true, //it will send an acknowledgment and delete messages from queue after the receiver receives it
			}
		);
	} catch (error) {
		throw error;
	} finally {
		// once we have received messages from the queue there is no need of connection so close it
		setTimeout(() => {
			connection.close();
		}, 3000);
	}
})();
