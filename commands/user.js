const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('유저 정보 출력하기!'),
    async execute(interaction) {
        await interaction.reply(`태그: ${interaction.user.tag}\n아이디: ${interaction.user.id}`);
    },
};