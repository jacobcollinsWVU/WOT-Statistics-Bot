const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = { 
  data: new SlashCommandBuilder()
  .setName('joke')
  .setDescription('Returns a random joke'),

  async execute(interaction){
    let getJoke = async () => {
      let result = await fetch
      ('https://official-joke-api.appspot.com/random_joke')
      let json = await result.json();
      return json
    }
    let joke = await getJoke();

    interaction.reply(`Here's your joke: \n\n${joke.setup} \n\n${joke.punchline}`)
  }
}