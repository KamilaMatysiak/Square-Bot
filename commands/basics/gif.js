const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription("Sends gif.")
        .addStringOption(option => 
            option.setName("keywords")
            .setDescription("what gif?")
            .setRequired(true)),
    async execute(interaction) {
        const keywords = interaction.options.getString("keywords");
        const url = `https://api.tenor.com/v2/search?q=${keywords}&key=${process.env.tenor_token}&limit=20`
        const response = await fetch(url);
        const result = await response.json()
        const index = Math.floor(Math.random() * result.results.length);
        await interaction.deferReply();
        await interaction.deleteReply();
        await interaction.channel.send(`Gif from <@${interaction.user.id}>`);
        await interaction.channel.send(result.results[index].url);
    }
}