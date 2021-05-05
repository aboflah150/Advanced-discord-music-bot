const Discord = require('discord.js');

module.exports = {
  name : 'help',
  run : async(client, message, args)=>{
    let color = message.guild.me.displayHexColor;
   let embed = new Discord.MessageEmbed()
   .setTitle('Please chose')
   .setColor(color)
   .setDescription(`**
> ⚙️ \`To show Iformation commands\`

> 🎵  \`To show Music commands\`

> 🔧 \`To show Config commands\`
   
    **`)


  message.channel.send(embed).then(async msg => {
      msg.react("⚙️")
      msg.react("🎵")
      msg.react("🔧")
 
 const doma= msg.createReactionCollector((reaction, user) => reaction.emoji.name == "⚙️" && user.id == message.author.id, {time: 86400000})
 const domaa = msg.createReactionCollector((reaction, user) => reaction.emoji.name == "🎵" && user.id == message.author.id, {time: 86400000})
 const domaaa = msg.createReactionCollector((reaction, user)=> reaction.emoji.name == "🔧" && user.id == message.author.id, {time: 86400000} )
 
 doma.on("collect",async r => {
   let embe = new Discord.MessageEmbed()
   .setColor(color)
   .setTitle('⚙️ Information commands')
   .setDescription(`
- help ➛ To Show Help List

- ping ➛ To See Bot Latency

   `)
   msg.edit(embe)
 })
      domaa.on("collect", async r => {
        let embe = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('🎵 Music commands')
        .setDescription(`
- play ➛ To Play A Song

- loop ➛ To Repeat Song

- pause ➛ To Pause Song

- resume ➛ To Resume Song

- skip ➛ To Skip To Next Song

- stop ➛ To Stop Song

- volume ➛ To Set Volume 0-100

- queue ➛ To See Queued Songs List

- skip-to ➛ Skips To A Certain Position In The Queue

- now-playing ➛ To Show The Current Song
         `)
      msg.edit(embe)
      })
 domaaa.on("collect",async r => {
   let embe = new Discord.MessageEmbed()
   .setColor(color)
   .setTitle('🔧 config commands')
   .setDescription(`
- set-prefix (prefx) ➛ To Change the bot prefix
   `)
   msg.edit(embe)
 })

    })
  }
}
