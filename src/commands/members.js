exports.run = async (client, message, args, level) => { 
  try {
    message.reply("This server has " + message.guild.memberCount + " members!");
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
  aliases: ["memcount", "ucount"],
  guildOnly: true,
  permLevel: "User"
};

exports.help = {
  name: "members",
  category: "General",
  description: "Returns the amount of members the server has.",
  usage: "members"
};
