const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset-pz')
        .setDescription("Will tell admins to restart server for you."),
    async execute(interaction) {
        await interaction.reply("Telling admin to do their job! :D")
    }
}