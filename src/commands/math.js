const math = require("mathjs");

exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send("You need to give me an equation!");
    
    message.channel.send("Output: " + math.evaluate(args.join(" ")));
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
  aliases: ["calc"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "math",
  category: "Utility",
  description: "Does math for you.",
  usage: "math"
};
