const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('q')
        .setDescription('Train embed!!!'),
    async execute(interaction) {
        const { queue } = require('../index');

        if (!queue[interaction.guild.id]) {
            interaction.reply('Queue가 없습니다. 노래를 먼저 재생해주세요!');
            return false;
        }
        interaction.reply('지금 재생중인 음악입니다.');
        interaction.channel.send({ embeds: [queue[interaction.guild.id].playlist[0].embed] });
    },
};