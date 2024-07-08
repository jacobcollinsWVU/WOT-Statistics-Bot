const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = { 
  data: new SlashCommandBuilder()
  .setName('rating')
  .setDescription("Returns user's rating")
  .addStringOption(option =>
      option
          .setName('username')
          .setDescription("Player's username")
          .setRequired(true)
  ),

  async execute(interaction){
    const username = interaction.options.getString('username');
    
    // get user's account ID for statistics check
    let getID = async () => {
      let result = await fetch
      (`https://api.worldoftanks.com/wot/account/list/?application_id=74e58c10f7e21027e3fd126dca8ec859&search=${username}`)
      let json = await result.json();
      return json
    }
    let userID = await getID();
    const account_id = userID.data[0].account_id;
    //

    let getRating = async () => {
      let result = await fetch
      (`https://api.worldoftanks.com/wot/account/info/?application_id=74e58c10f7e21027e3fd126dca8ec859&account_id=${account_id}`)
      let json = await result.json();
      return json
    }
    let rating = await getRating();

    interaction.reply(`Global rating for ${userID.data[0].nickname}: ${rating.data[account_id].global_rating}`)
  }
}

/* 
API Call for Rating:
https://api.worldoftanks.com/wot/account/info/?application_id=74e58c10f7e21027e3fd126dca8ec859&account_id=
Account ID of searched player must be appended 

*/
