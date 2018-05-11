
const auth = require('./auth.json');
const Discord = require('discord.js');
const service = require('./trello-service.js');
const composer = require('./composer.js');

const client = new Discord.Client();
let lastActivityID = '';

let processActivity = function(data) {
    const channel = client.channels.find('name', 'notifications');
    let index = -1;
    let lastActivity = data.find((element) => {
        return element.id === lastActivityID;
    });
    if (lastActivity) {
        index = data.indexOf(lastActivity);
    } else {
        index = 0;
        lastActivity = data[index];
        lastActivityID = lastActivity.id;
        return true;
    }
    if (index > 0) {
        newActivity = data.slice(0, index);
        for (let i = newActivity.length; i--;) {
            let activity = newActivity[i];
            lastActivityID = activity.id;
            msg = composer.composeMessage(activity);
            channel.send(msg);
        }
    }

};

let queryTrello = function() {
    console.log('querying trello');
    service.getActivity()
    .then((data) => {
        processActivity(data);
    });
};

client.on('ready', () => {
    client.user.setUsername('Adjutant');
    queryTrello();
    setInterval(queryTrello, 60000);
});

client.on('message', (message) => {
    if (message.content.charAt(0) === '!') {
        let command = message.content.slice(1);
        switch (command) {
            case 'status':
                message.channel.send('command status');
                message.channel.send('nothing to report');
                break;
            default:
                message.channel.send('Unknown command');
        }
    }
});

client.login(auth.disc_token);
