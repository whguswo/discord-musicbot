const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('음악을 일시중지합니다.'),
    async execute(interaction) {
        const { queue } = require('../index');

        if (!queue[interaction.guild.id]) {
            interaction.reply('음악 재생중이 아닙니다.');
            return false;
        }
        queue[interaction.guild.id].player.pause();

        interaction.reply('음악을 일시중지합니다.');
        const reply = await interaction.fetchReply();

        reply.react('⏸️');
    },
};