const { Util, MessageEmbed} = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const color = require('../../configuration/colors.json')
const footer = require('../../configuration/footer.json')
module.exports = {
  name: "play",
  description: "To play songs :3",
  aliases: ["p"],

  run: async function(client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel) {
      message.channel.send({embed:{
        description : `:x: \`You have to be in a voice channel to use this command\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    }



    if (!message.guild.me.hasPermission("CONNECT")) {
      message.channel.send({
        embed: {
          color: color.error,
          description: `:x: \`Missing permission [CONNECT]\``
        }
      }).then(msg=>msg.react('❌'))
    }
    if (!message.guild.me.hasPermission("SPEAK")) {
      message.channel.send({
        embed: {
          color: color.error,
          description: `:x: \`Missing permission [SPEAK]\` `
        }
      }).then(msg=>msg.react('❌'))
    }
    var searchString = args.join(" ");
    if (!searchString) {
      message.channel.send({embed :{
        description : `:x: \`Please provide a song <name/url>\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))

      console.log('No search query given')
    }

    var serverQueue = message.client.queue.get(message.guild.id);

    var searched = await yts.search(searchString);
    if (searched.videos.length === 0) {
      message.channel.send({embed :{
        description : `:x: \`I can't find this song\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url  : footer.footericon
        }      
        }}).then(msg=>msg.react('❌'))
    }
    var songInfo = searched.videos[0];

    const song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, " "),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
          let embed = new MessageEmbed()
      .setTitle("Added to queue")
      .setThumbnail(song.img)
      .setColor(color.blue)
      .setDescription(`
      **Song title : \`${song.title}\`
      Song duration : \`${song.duration}\`
      Song requester : \`${song.req.tag}\`** `)
      .setFooter(footer.footertext, footer.footericon)

      return message.channel.send(embed).then(msg=>msg.react('🎵'))
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 3.5,
      playing: true
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
         message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
                let embed2 = new MessageEmbed()
      .setTitle("Started playing")
      .setThumbnail(song.img)
      .setColor(color.blue)
      .setDescription(`
      **Song title : [${song.title}](${song.url})
      Song duration : \`${song.duration}\`
      Song requester : \`${song.req.tag}\`** `)
      .setFooter(footer.footertext, footer.footericon)

      queue.textChannel.send(embed2).then(msg=>msg.react('🎶'))
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      message.client.queue.delete(message.guild.id);
      //await channel.leave();
      return console.log(
        `I could not join the voice channel: ${error}`,
        message.channel
      );
    }
  }
};
