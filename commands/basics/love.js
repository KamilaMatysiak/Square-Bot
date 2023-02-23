const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('send-love')
		.setDescription("Show some lovin'.")
        .addStringOption(option => 
            option.setName('who')
                    .setDescription('Pick a person')
                    .setRequired(true)),
	async execute(interaction) {
		await interaction.reply(`Love you ${interaction.options.getString('who')}`);
	},
};