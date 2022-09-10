const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unpause')
        .setDescription('음악 일시중지를 해제합니다.'),
    async execute(interaction) {
        const { queue } = require('../index');

        if (!queue[interaction.guild.id]) {
            interaction.reply('음악 재생중이 아닙니다.');
            return false;
        } else if (queue[interaction.guild.id].player._state.status != 'paused') {
            interaction.reply('일시중지 상태가 아닙니다.');
            return false;
        }

        queue[interaction.guild.id].player.unpause();

        interaction.reply('일시중지를 해제합니다.');
        const reply = await interaction.fetchReply();

        reply.react('▶️');
    },
};