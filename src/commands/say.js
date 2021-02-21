exports.run = async (client, message, args) => {
  try {
    message.delete().catch();
    const mg = args.join(" ");
    if (message.mentions.everyone) {
      message.channel.send(client.errors.cannotPingEveryone); 
      return; //send error and return early if the message includes mentions.
    }
    message.channel.send(mg);
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
  enabled: true, // You all know why I did this.
  aliases: ["rep", "echo"],
  guildOnly: true,
  permLevel: "Server Owner",
};

exports.help = {
  name: "say",
  category: "General",
  description: "Returns the text you provide.",
  usage: "say <text>"
};
