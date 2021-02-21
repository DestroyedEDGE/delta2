exports.run = async (client, message, args) => {
  try {
    message.delete().catch();
    switch(args[0]) {
      case "encode":
        if (!args.slice(1).join(" ")) return message.reply("You need to provide the string to encode!");
        message.channel.send(Buffer.from(args.slice(1).join(" "), "utf8").toString("base64"));
        break;
      case "decode":
        if (!args.slice(1).join(" ")) return message.reply("You need to provide the string to decode!");
        message.channel.send(Buffer.from(args.slice(1).join(" "), "base64").toString("utf8"));
        break;
      default:
        return message.reply("You need to choose to encode or decode the string!");
    }
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
  aliases: ["64", "base"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "base64",
  category: "General",
  description: "Encodes or decodes a base64 string.",
  usage: "base64 <encode/decode> <string>"
};
