module.exports = {
    name: 'next',
    description: 'Skips to the next song',
    execute(message, args, client) {
        if (!message.member.voice.channel)
            return message.channel.send('You need to be on a voice channel to skip a song!');
        if (!client.dispatcher) 
            return message.channel.send('There is no song to skip!');
        client.dispatcher.end();
        
    }
}