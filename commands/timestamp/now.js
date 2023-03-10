const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('now')
        .setDescription("Send a timestamp with current time."),
    async execute(interaction) {
        const date = new Date;
        const timestamp = parseInt(date / 1000)
        await interaction.reply(`<t:${timestamp}:t>`);
    }
}