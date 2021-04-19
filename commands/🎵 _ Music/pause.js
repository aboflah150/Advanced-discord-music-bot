const color = require('../../configuration/colors.json')
const footer = require('../../configuration/footer.json')

module.exports = {
  name: "pause",
  aliases : ['ps'],
  description : 'To pause the music that is playing :3',
  run: async (client, message, args) => {
    const serverQueue = client.queue.get(message.guild.id);
    const { channel } = message.member.voice;
    try {
      if (!channel)
        return message.channel.send({embed:{
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
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause(true);
        return message.channel.send({
          embed: {
            color: color.blue,
            description : `⏸️ \`Paused the music for you\``,
            footer : {
              text : footer.footertext,
              icon_url : footer.footericon
            }
          }
        }).then(msg=>msg.react('⏸️'))
      }
      return message.channel.send({embed : {
        description : `:x: \`There is nothing playing\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
    }
  }
};
