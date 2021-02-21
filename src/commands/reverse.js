exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send("You need to give me the text to reverse!");
    
    const str = args.join(" ");
    message.channel.send(str.split("").reverse().join(""));
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
  aliases: [],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "reverse",
  category: "Fun",
  description: "Reverses any text.",
  usage: "reverse <text>"
};
