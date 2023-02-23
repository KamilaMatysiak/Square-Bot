const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("I will *pong* you fro that!"),
    async execute(interaction) {
        await interaction.reply("Pong you.")
    }
}