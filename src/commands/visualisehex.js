const Discord = require("discord.js");

const validate = (color) => {
  if(!color || typeof color !== "string") return false;
  color = color.replace("#", "");

  switch(color.length) {
    case 3: return /^[0-9A-F]{3}$/i.test(color);
    case 6: return /^[0-9A-F]{6}$/i.test(color);
    case 8: return /^[0-9A-F]{8}$/i.test(color);
    default: return false;
  }
};

exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send("You need to supply the HEX code!");
    if (!validate(args.join(" "))) return message.reply("That's not a valid HEX code!");

    message.channel.send(new Discord.MessageEmbed().setColor(args[0]).setTitle("HEX visualiser"));
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
  name: "visualisehex",
  category: "General",
  description: "Sends an embed with the specified HEX code as the color.",
  usage: "visualisehex <hex>"
};
