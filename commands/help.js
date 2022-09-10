const { SlashCommandBuilder } = require('discord.js');

const embed = {
    color: 0x426cf5,
    author: {
        name: 'Train Kid ( Ryan )',
        icon_url: 'https://cdn.discordapp.com/avatars/1011894019388883005/8dbf7d6a5839d45881bb1bb3998d68d1.webp',
    },
    title: '도움말',
    fields: [
        {
            name: '/help',
            value: '도움말을 출력합니다.',
        },
        {
            name: '/play (url or keyword)',
            value: '음악을 재생합니다.',
        },
        {
            name: '/skip',
            value: '지금 재생하고있는 노래를 스킵합니다.',
        },
        {
            name: '/stop',
            value: '음악재생을 중지하고 큐를 정리합니다.',
        },
        {
            name: '/q',
            value: '현재 재생중인 음악의 정보를 출력합니다.',
        },
        {
            name: '/pause',
            value: '음악 재생을 일시중지합니다.',
        },
        {
            name: '/unpause',
            value: '일시중지를 해제합니다.',
        },
    ],
    timestamp: new Date().toISOString(),
    footer: {
        text: '',
        icon_url: '',
    },
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('도움말을 출력합니다.'),
    async execute(interaction) {
        const client = interaction.client.user;
        const user = interaction.member.user;

        embed.author.name = client.username;
        embed.author.icon_url = `https://cdn.discordapp.com/avatars/${client.id}/${client.avatar}.webp`;
        embed.footer.text = interaction.member.user.username;
        embed.footer.icon_url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`;
        interaction.reply({ embeds: [embed] });
    },
};