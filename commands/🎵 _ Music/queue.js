const { MessageEmbed } = require("discord.js");
const color = require('../../configuration/colors.json')
const footer = require('../../configuration/footer.json')
module.exports = {
  name: "queue",
  aliases: ["q"],
  description : 'To show the songs queue :3',
  run: async (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send({embed:{
        description : `:x: \`You have to be in a voice channel to use this command\` `,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.channel.send({embed:{
        description : `:x: \`You have to be in the channel as the bot\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    }
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send({embed : {
        description : `:x: \`There is nothing playing\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    try {
      let currentPage = 0;
      const embeds = generateQueueEmbed(message, serverQueue.songs);
      const queueEmbed = await message.channel.send(
        embeds[currentPage]
      );
      await queueEmbed.react("⬅️");
      await queueEmbed.react("⏹");
      await queueEmbed.react("➡️");

      const filter = (reaction, user) =>
        ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) &&
        message.author.id === user.id;
      const collector = queueEmbed.createReactionCollector(filter);

      collector.on("collect", async (reaction, user) => {
        try {
          if (reaction.emoji.name === "➡️") {
            if (currentPage < embeds.length - 1) {
              currentPage++;
              queueEmbed.edit(
                `**Current Page - ${currentPage + 1}/${embeds.length}**`,
                embeds[currentPage]
              );
            }
          } else if (reaction.emoji.name === "⬅️") {
            if (currentPage !== 0) {
              --currentPage;
              queueEmbed.edit(
                `**Current Page - ${currentPage + 1}/${embeds.length}**`,
                embeds[currentPage]
              );
            } 
          } else {
            collector.stop();
            reaction.message.reactions.removeAll();
          }
          await reaction.users.remove(message.author.id);
        } catch {
          serverQueue.connection.dispatcher.end();
          return message.channel.send({embed :{
            description : `:x: \`Missing permission [ADD_REACTIONS],[MANAGE_MESSAGES]\``,
            color : color.error,
            footer : {
              text : footer.footertext,
              icon_url : footer.footericon
            }
          }}).then(msg=>msg.react('❌'))
        }
      });
    } catch {
      serverQueue.connection.dispatcher.end();
      return message.channel.send({embed :{
            description : `:x: \`Missing permission [ADD_REACTIONS],[MANAGE_MESSAGES]\``,
            color : color.error,
            footer : {
              text : footer.footertext,
              icon_url : footer.footericon
            }
          }}).then(msg=>msg.react('❌'));
    }
  }
};

function generateQueueEmbed(message, queue) {
  const embeds = [];
  let k = 10;
  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;
    const info = current
      .map(track => `**\`${++j} :\` -  [${track.title}](${track.url}) ${track.duration}**`)
      .join("\n");
    const embed = new MessageEmbed()
      .setTitle("Server Queue\n")
      .setColor(color.blue)
      .setDescription(
        `**\`Current Song :\` - [${queue[0].title}](${queue[0].url})**\n\n${info}`
      )
     .setFooter(footer.footertext, footer.footericon) 
    embeds.push(embed);
  }
  return embeds;
}
