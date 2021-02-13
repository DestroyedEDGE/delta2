const ms = require("ms");

exports.run = async (client, message, args, level) => {
  try {
    message.channel.send(ms(args.join(" ")));
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
  aliases: ["timems"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "toms",
  category: "General",
  description: "Returns the time specified in millisecconds.",
  usage: "toms <time (NOT IN MS)>"
};
