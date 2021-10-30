const { SlashCommandBuilder } = require('@discordjs/builders');
const helpEmbed = {
    "title": "도움말",
    "description": "Discord-musicbot",
    "color": 12451840,
    "fields": [
        {
            "name": "/help, /도움말",
            "value": "도움말을 출력합니다."
        },
        {
            "name": "/p",
            "value": "/p (url or keyword), 음악을 재생합니다"
        },
        {
            "name": "-p",
            "value": "-p (url or keyword), 음악을 재생합니다"
        },
        {
            "name": "-stop",
            "value": "음악재생을 중지합니다."
        },
        {
            "name": "-pause",
            "value": "음악재생을 일시정지합니다."
        },
        {
            "name": "-play",
            "value": "음악을 다시 재생합니다."
        },
        {
            "name": "/server",
            "value": "서버 정보를 츨력합니다."
        },
        {
            "name": "/user",
            "value": "유저 정보를 출력합니다."
        },
    ]
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('봇 도움말 출력'),
    async execute(interaction) {
        interaction.reply('도움말 출력!')
        interaction.channel.send({ embeds: [helpEmbed] })
    },
};