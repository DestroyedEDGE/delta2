exports.run = async (client, message, args) => { 
  try {
    if (client.liusers.has(message.author.id)) {
      client.logger.info(message.author.id + " | " + args.join(" "), "user");
      message.channel.send("Your message has been sent to Cytrus-RE's logs!");
    } else message.channel.send("You are not logged in! (Use profile login to login)");
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
  enabled: false, // right now this relies on the removed profile system
  aliases: ["logsend"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "log",
  category: "General",
  description: "Sends a message to the Cytrus-RE Log",
  usage: "log"
};
