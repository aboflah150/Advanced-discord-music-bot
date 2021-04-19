const color = require('../../configuration/colors.json')
const footer = require('../../configuration/footer.json')
module.exports = {
  name: "skipto",
  alisases : ['st'],
  description : 'To skip to a specefic song :3',

  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send({embed : {
        description : `:x: \`Please provide a song number from the queue\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))

    const { channel } = message.member.voice;
    if (!channel) return message.channel.send({embed : {
      description : `:x: \`You have to be in a voice channel to use this command\``,
      color : color.error,
      footer : {
        text : footer.footertext,
        icon_url : footer.footericon
      }
    }}).then(msg=>msg.react('❌'))
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) {
      message.channel.send({embed:{
        description : `:x: \`There is nothing playing\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    }

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

    if (args[0] < 1 && args[0] >= serverQueue.songs.length) {
      return message.channel.send({embed : {
        description : `:x: \`Please provide a valid song number from the queue\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'));
    }
    try {
      serverQueue.songs.splice(0, args[0] - 2);
      serverQueue.connection.dispatcher.end();
      return;
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send({embed:{
        description : `💥 \`Something went wrong in the bot system , try again later\``,
        color : color.boom,
        footer : {
          text : footer.footertext,
          icon_url : footer.footer.icon
        }
      }}).then(msg=>msg.react('💥'))
    }
  }
};
