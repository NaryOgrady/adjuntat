const Discord = require('discord.js');
const fs = require('fs');
const { token, prefix } = require('./bot-config.json')


const client = new Discord.Client();
client.commands = new Discord.Collection();
client.queue = [];
client.index = 0;


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for ( const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.once('reconnecting', () => {
    console.log('Reconnecting!')
});

client.once('disconnect', () => {
    console.log('Disconnect!')
});

client.on('message', message => {
    console.log('message receive')
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.replay('There was an error trying to execute that command');
    }
});

client.login(token)