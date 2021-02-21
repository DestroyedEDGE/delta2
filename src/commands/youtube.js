const Discord = require("discord.js");
const { YTSearcher } = require("ytsearcher");

const searcher = new YTSearcher(process.env.YOUTUBE_API_KEY);

exports.run = async (client, message, args, level) => { 
  try {
    if (!args[0]) return message.reply("You need to give something to search!");
    
    let msg = await message.channel.send("Searching YouTube...");
    
    searcher.search(args.join(" ")).then(info => {
      if (!info.first) return message.reply("I couldn't find anything on Youtube with your query!");
      
      let embed = new Discord.MessageEmbed()
      .setTitle(info.first.title)
      .setDescription(info.first.url)
      .setColor("#eeeeee");
      
      msg.edit(embed);
    });

  } catch (err) {
    const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Something went wrong")
    .setFooter(`${client.config.botName} v${client.config.version}`)
    .addField("Info", `${client.errors.fancyError}`)
    .addField("What's the error?", `${err}`)
    .addField("What can I do?", `You can only report the error. We plan on making it automatically report errors in the future.`);
    message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  aliases: ["yt", "ytsearch"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "youtube",
  category: "General",
  description: "Returns info about a Youtube video",
  usage: "youtube <video name>"
};
