const Discord = require("discord.js");
const color = require('../../configuration/colors.json')
const footer = require('../../configuration/footer.json')
module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  description : 'To show the song that is playing :3',
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send({embed:{
      description : `:x: \`You have to be in a voice channel to use this command\``,
      color : color.error,
      footer : {
        text : footer.footertext,
        icon_url : footer.footericon
      }
    }}).then(msg=>msg.react('❌'))

        if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.channel.send({embed:{
        description : `:x: \`You have to be in the same channel as the bot\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    }


    const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue)
      return message.channel.send({embed:{
        description : `:x: \`There is nothing playing try to add some songs\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    let song = serverQueue.songs[0]
    let embed = new Discord.MessageEmbed()
      .setTitle("Now Playing")
      .setThumbnail(song.img)
      .setColor(color.blue)
      .setDescription(`
      **Song title : \`${song.title}\`
      Song duration : \`${song.duration}\`
      Song requester : \`${song.req.tag}\` **`)
      .setFooter(footer.footertext, footer.footericon)
    return message.channel.send(embed).then(msg=>msg.react('🔘'))
  }
};