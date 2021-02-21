exports.run = async (client, message, args, level) => { 
  try {
    if (!args[0]) return message.channel.send("You need to give me the channel name!");
    if (!args[1]) return message.channel.send("You need to give me the channel type!");
    
    message.channel.send("Channel created.").then(() => {
      message.guild.channels.create(args[0], { type: args[1] }).catch((err) => {
        message.channel.send(client.errors.genericError);
      });
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
  aliases: ["crc", "chanmake"],
  guildOnly: true,
  permLevel: "Administrator"
};

exports.help = {
  name: "createchannel",
  category: "Moderation",
  description: "Creates a channel in the server.",
  usage: "createchannel <name> <voice/text>"
};
