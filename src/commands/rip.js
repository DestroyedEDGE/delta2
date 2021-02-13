const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    message.channel.send(new Discord.Attachment("https://cdn.discordapp.com/emojis/230989718471442432.png"));
  } catch (err) {
    const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Something went wrong")
    .setFooter(`${client.config.botName} v1.3.0-delta`)
    .addField("Info", `${client.errors.fancyError}`)
    .addField("What's the error?", `${err}`)
    .addField("What can I do?", `You can only report the error. We plan on making it automatically report errors in the future.`);
    message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "rip",
  category: "Fun",
  description: "Returns a RIP Image",
  usage: "rip"
};
