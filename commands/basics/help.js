const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder,AttachmentBuilder } = require('discord.js');

const image = new AttachmentBuilder('./yes-square.png', { name: 'yes-square.png', description: 'ugabuga'});
const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Welcome to SquareBot!')
	.setDescription('I was created to make your lifes better here!')
    .setThumbnail("attachment://yes-square.png")
	.addFields(
		{ name: '/send-love', value: 'Show other users some affection.' },
		{ name: '/gif', value: 'Send a random gif.' },
		{ name: '/pz-reset', value: 'Make me scream at admins to restart server.' },
		{ name: '/ping-user', value: "Make me ping someone, so you don't have to." },
	)
	.setTimestamp()
	.setFooter({ text: 'See you soon!', iconURL: "attachment://yes-square.png"});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription("Use it if you're lost!"),
    async execute(interaction) {
        await interaction.deferReply()
        await interaction.deleteReply()
        interaction.channel.send({ embeds: [exampleEmbed], files: [image] });
    }
}