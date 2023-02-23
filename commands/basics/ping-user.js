const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping-user')
        .setDescription("I will *pong* you fro that!")
        .addStringOption(option => 
            option.setName("who")
            .setDescription("tell me who to pong")
            .setRequired(true)),
    async execute(interaction) {
        await interaction.reply(interaction.options.getString('who') ? `Pong you ${interaction.options.getString('who')}.` : '... pong who?');
    }
}