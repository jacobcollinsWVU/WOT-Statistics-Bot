const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = { 
  data: new SlashCommandBuilder()
  .setName('id')
  .setDescription('Returns Wargaming account ID')
  .addStringOption(option =>
      option
          .setName('username')
          .setDescription("Player's username")
          .setRequired(true)
  ),

  async execute(interaction){
    const username = interaction.options.getString('username');
    let getID = async () => {
      let result = await fetch
      (`https://api.worldoftanks.com/wot/account/list/?application_id=74e58c10f7e21027e3fd126dca8ec859&search=${username}`)
      let json = await result.json();
      return json
    }
    let userID = await getID();

    interaction.reply(`Account ID for ${userID.data[0].nickname}: ${userID.data[0].account_id}`)
  }
}

/* 
API Call for User ID:
https://api.worldoftanks.com/wot/account/list/?application_id=74e58c10f7e21027e3fd126dca8ec859&search=

Username of searched player must be appended 

*/
