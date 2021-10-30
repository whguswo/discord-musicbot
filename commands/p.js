const { SlashCommandBuilder } = require('@discordjs/builders');
const Youtube = require('youtube-node');
const youtube = new Youtube();
const { youtube_key } = require('../config.json');
youtube.setKey(youtube_key);

const ytdl = require("discord-ytdl-core");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const { join } = require('path');
const player = createAudioPlayer();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('p')
        .setDescription('사용법: /p (검색어나 유튜브 주소)')
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('검색어나 유튜브 주소')
                .setRequired(true)),
    async execute(interaction) {
        let keyword = interaction.options._hoistedOptions[0].value
        let url = ''

        //// 검색 옵션
        youtube.addParam('type', 'video');

        //search
        youtube.search(keyword, 1, (err, result) => {
            if (err) { console.log(err); return; }
            let title = result["items"][0]["snippet"]["title"];
            let thumbail = `https://i.ytimg.com/vi/${result["items"][0]["id"]["videoId"]}/hq720.jpg`

            url = `https://www.youtube.com/watch?v=${result["items"][0]["id"]["videoId"]}`
            let stream = ytdl(url, {
                filter: "audioonly",
                opusEncoded: true,
                encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
            });

            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            })

            const player = createAudioPlayer();
            let resource = createAudioResource(stream);
            player.play(resource)
            connection.subscribe(player)


            const youtubeInfo_embed = {
                color: '#00fa9a',
                title: '재생목록에 추가됨!',
                description: title,
                image: {
                    url: thumbail,
                },
            };

            interaction.channel.send({ embeds: [youtubeInfo_embed] })
            interaction.reply('재생합니다!')

        });
    }
};