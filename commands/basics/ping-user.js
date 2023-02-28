const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping-user')
        .setDescription("I will *pong* who do you want!")
        .addUserOption(option => 
            option
				.setName('person')
				.setDescription('Pick a person')
				.setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('person');
        await interaction.reply(`Pong you, ${user}.`);
    }
}