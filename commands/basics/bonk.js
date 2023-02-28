const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bonk')
        .setDescription("Bonk!")
        .addUserOption(option => 
            option
				.setName('person')
				.setDescription('Pick a person to bonk')
				.setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('person');
        const image = new AttachmentBuilder("https://i.kym-cdn.com/entries/icons/original/000/033/758/Screen_Shot_2020-04-28_at_12.21.48_PM.png", { name: "Screen_Shot_2020-04-28_at_12.21.48_PM.png", description: 'ugabuga'});
        await interaction.deferReply();
        await interaction.deleteReply();
        await interaction.channel.send({content:`${interaction.user} bonked ${user}`, files : [image]});
    }
}