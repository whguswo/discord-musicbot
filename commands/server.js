const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('서버 정보 출력하기!'),
    async execute(interaction) {
        const guild = interaction.guild
        await guild.members.fetch()
            .then(async map => {
                let bot_count = 0
                let result = Array.from(map, ([name, value]) => ({ name, value }));
                result.forEach(user => {
                    if (user.value.user.bot) {
                        bot_count++
                    }
                })
                await interaction.reply(`서버 이름: ${interaction.guild.name}\n총 멤버: ${result.length - bot_count}\n총 챗봇: ${bot_count}`);
            })

    },
};