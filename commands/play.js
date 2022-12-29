const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const { parse } = require('iso8601-duration');
const { google } = require('googleapis');
const { play, getNextResource } = require('../manageQueue');
require('dotenv').config();

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API,
});

const embed = {
    color: 0x426cf5,
    author: {
        name: '',
        icon_url: '',
    },
    title: '🎶',
    thumbnail: {
        url: '',
    },
    fields: [
        {
            name: '재생시간',
            value: '',
            inline: true,
        },
        {
            name: '조회수',
            value: '',
            inline: true,
        },
        {
            name: '유튜브',
            value: '',
            inline: true,
        },
    ],
    timestamp: new Date().toISOString(),
    footer: {
        text: '',
        icon_url: '',
    },
};

function addComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play music!')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Youtube URL')
                .setRequired(true)),

    async execute(interaction) {
        const { queue } = require('../index');
        const client = interaction.client.user;
        const user = interaction.member.user;

        if (!interaction.member.voice.channel) {
            interaction.reply('음성채널에 먼저 참가해주세요!');
            return false;
        }
        const keyword = interaction.options._hoistedOptions[0].value;

        const searchList = await youtube.search.list({
            part: 'id,snippet',
            q: keyword,
            type: 'video',
        });
        const id = searchList.data.items[0].id.videoId;

        const result = await youtube.videos.list({
            part: 'id,snippet,contentDetails,statistics',
            id: id,
        });
        const contentDetails = result.data.items[0].contentDetails;
        const info = result.data.items[0].snippet;
        const duration = parse(contentDetails.duration);
        duration.minutes = String(duration.minutes).length == 1 ? '0' + duration.minutes : duration.minutes;
        duration.seconds = String(duration.seconds).length == 1 ? '0' + duration.seconds : duration.seconds;
        const videoDuration = duration.hours == 0 ? `${duration.minutes}:${duration.seconds}` : `${duration.hours}:${duration.minutes}:${duration.seconds}`;
        const viewCount = addComma(result.data.items[0].statistics.viewCount);
        const url = `https://www.youtube.com/watch?v=${id}`;

        interaction.reply('노래를 대기열에 추가합니다!');

        embed.author.name = client.username;
        embed.author.icon_url = `https://cdn.discordapp.com/avatars/${client.id}/${client.avatar}.webp`;
        embed.title = `🎶${info.title}`;
        embed.fields[0].value = videoDuration;
        embed.fields[1].value = `${viewCount}회`;
        embed.fields[2].value = `[링크](${url})`;
        embed.footer.text = user.username;
        embed.footer.icon_url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`;
        embed.thumbnail.url = `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
        interaction.channel.send({ embeds: [embed] });

        // queue
        if (!queue[interaction.guild.id]) {
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            const player = createAudioPlayer();
            player.on('error', error => {
                console.error(`Error: ${error.message}`);
                getNextResource(interaction.guild.id);
            });
            player.on(AudioPlayerStatus.Idle, () => {
                getNextResource(interaction.guild.id);
            });
            connection.subscribe(player);

            queue[interaction.guild.id] = {
                playlist: [],
                player: player,
            };
            queue[interaction.guild.id].playlist.push({
                url: url,
                embed: embed,
            });
            play(interaction.guild.id);
            return true;
        }

        queue[interaction.guild.id].playlist.push({
            url: url,
            embed: embed,
        });
    },
};