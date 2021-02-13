exports.run = async (client, message, args, level) => { 
  try {
    if (!args[0]) message.channel.send("You need to provide a message to spacify!");
    message.channel.send(args.join(" ").split("").join(" "));
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
  aliases: ["aestheticify"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "spacify",
  category: "Fun",
  description: "Spacifies your message",
  usage: "spacify <message>"
};
