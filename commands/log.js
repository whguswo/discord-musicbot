const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('log')
        .setDescription('로그 관련 명령어입니다.')
        .addStringOption(option =>
            option.setName('option')
                .setDescription('사용할 기능')
                .setRequired(false)),

    async execute(interaction) {
        const { log } = require('../index');

        const embed = {
            color: 0x426cf5,
            author: {
                name: 'Chat Log',
                icon_url: 'https://cdn.discordapp.com/avatars/1011894019388883005/8dbf7d6a5839d45881bb1bb3998d68d1.webp',
            },
            title: '',
            fields: [],
            timestamp: new Date().toISOString(),
            footer: {
                text: '',
                icon_url: '',
            },
        };

        if (!interaction.options._hoistedOptions[0] || interaction.options._hoistedOptions[0].value == 'list') {
            if (!log[interaction.channelId]) {
                interaction.reply('아직 채팅내역이 없습니다.');
                return;
            }
            embed.title = interaction.channel.name;
            for (let i = 0; i < log[interaction.channelId].length; i++) {
                embed.fields.push({ name: log[interaction.channelId][i].author, value: log[interaction.channelId][i].content });
            }
            interaction.reply({ embeds: [embed] });
        } else if (interaction.options._hoistedOptions[0].value == 'reset') {
            if (!log[interaction.channelId]) {
                interaction.reply('아직 채팅내역이 없습니다.');
                return;
            }
            delete log[interaction.channelId];
            interaction.reply('로그가 리셋되었습니다.');
        }

    },
};