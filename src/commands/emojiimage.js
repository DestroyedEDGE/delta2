//https://cdn.discordapp.com/emojis/id.png
const { Attachment } = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    let id = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.exec(args[1]);
    
    if (!id) return message.channel.send("You didn't input a valid emoji or it is a default Discord emote!");
    switch (args[0]) {
      case "animated":
        message.channel.send(new Attachment("https://cdn.discordapp.com/emojis/" + id + ".gif"));
        break;
      case "static":
        message.channel.send(new Attachment("https://cdn.discordapp.com/emojis/" + id + ".png"));
        break;
      default:
        message.channel.send("You need to specify what type of emoji this is. (animated, static)");
        break;
    }
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
  aliases: ["emoteimage", "ei", "eimage", "emojii", "emotei"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "emojiimage",
  category: "Fun",
  description: "Returns the image of the specified emoji",
  usage: "emojiimage <static/animated> <emoji>"
};
