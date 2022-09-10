const { SlashCommandBuilder } = require('discord.js');
const { getNextResource } = require('../manageQueue');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('지금 재생중인 노래를 스킵합니다.'),
    async execute(interaction) {
        const { queue } = require('../index');
        const guildId = interaction.guild.id;

        if (!queue[interaction.guild.id]) {
            interaction.reply('Queue가 없습니다.');
            return false;
        }
        interaction.reply('노래를 스킵합니다.');
        const reply = await interaction.fetchReply();
        reply.react('⏭️');
        if (queue[guildId].playlist.length == 1) {
            queue[guildId].player.stop();
            delete queue[guildId];
        } else {
            getNextResource(interaction.guild.id);
        }
    },
};