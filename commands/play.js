const ytdl = require('ytdl-core');
const { playlists } = require('../bot-config.json');
const { shuffle } = require('../utils.js');


module.exports = {
    name: 'play',
    description: 'Plays a random song from one of the queues.',
    async execute(message, args, client) {
        const playlist = args[0];
        if (!playlist || !playlists.hasOwnProperty(playlist))
            return message.channel.send("You need provide a valid playlist name");
        client.queue = playlists[playlist];
        client.queue = shuffle(client.queue);
        client.channel = message.member.voice.channel;
        if (!client.channel)
            return message.channel.send('You need to be in a voice channel to play music!');
        const permissions = client.channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK'))
            return message.channel.send('You need permission to speak on a voice channel');

        play(client);
    }
}


async function play(client) {
    if (client.queue.length === 0)
        return;
    const song = client.queue[client.index++];
    client.index = client.index % client.queue.length;
    console.log(client.index);
    try {
        var connection = await client.channel.join();
        client.dispatcher = connection
            .play(ytdl(song, { filter: format => format.container === 'mp4'}) )
            .on('finish', () => {
                play(client);
            });
    } catch (error) {
        console.error(error);
    }

}