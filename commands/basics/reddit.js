const fetch = require("node-fetch");
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reddit')
        .setDescription("Wonder if that will work...")
        .addStringOption((option => 
            option.setName("subreddit")
            .setDescription("Choose subreddit to fetch data.")
            .setRequired(true))),
    async execute(interaction) {
        await interaction.deferReply();
        await interaction.deleteReply();

        function fetchData() {
            const subreddit = interaction.options.getString("subreddit");
            const count = 150;
            fetch(`https://reddit.com/r/${subreddit}/new.json?limit=${count}`)
                .then((res) => res.json())
                .then((data) => data.data.children.map((data) => [data.data.title, data.data.url, data.data.author, data.data.permalink]))
                .then((post) => createEmbed(post))
                .catch((err) => interaction.channel.send(`I couldn't fetch data from subreddit called ***${subreddit}***. Are you sure you haven't made a typo?`));
        } 
        
        function getRandomNumber(max) {
            return Math.floor(Math.random() * max.length);
        }
        
        function createEmbed(posts) {
            photos = []
            for(let i in posts)
            {
                let x = posts[i][1].split(".")
                if (x.includes('jpg') || x.includes('png'))
                    photos.push(posts[i])
            }
        
            console.log(photos.length);
            const post = photos[getRandomNumber(photos)];
            console.table(post);
            const title = post[0];
            const url = post[1];
            const author = post[2];
            const permalink = post[3];

            const postURL = `https://reddit.com${permalink}`;
        
            const memeEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(title)
                .setURL(postURL)
                .setImage(url)
                .setFooter({ text: `u/${author}`});
            
            interaction.channel.send({ embeds: [memeEmbed] });
        }
        
            fetchData();
    }
}