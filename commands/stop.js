module.exports = {
    name: 'stop',
    description: 'Stops the music and clears the queue',
    execute(message, args, client) {
        if (!message.member.voice.channel)
            return message.channel.send('You need to be on a voice channel to stop the music!');
        if (!client.dispatcher) 
            return message.channel.send('There is no song to stop!');
        client.queue = [];
        client.dispatcher.end();
    }
}