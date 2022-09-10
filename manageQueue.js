const ytdl = require('ytdl-core');
const { createAudioResource } = require('@discordjs/voice');
const { queue } = require('./index');


const play = (guidId) => {
    const url = queue[guidId].playlist[0].url;
    const player = queue[guidId].player;
    const resource = createAudioResource(ytdl(url, {
        filter: 'audioonly',
        quality: 'highestaudio',
    }));
    player.play(resource);
};

const getNextResource = (guildId) => {
    if (queue[guildId]) {
        queue[guildId].playlist.shift();
        play(guildId);
    }
};

module.exports = { play, getNextResource };