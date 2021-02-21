exports.run = async (client, message, args, level) => {
  try {
    let number = Math.floor(Math.random() * 10000000000001);
    
    message.channel.send("Random number: " + number);
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
  aliases: ["num", "number", "rnum"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "randomnumber",
  category: "Utility",
  description: "Returns a random number from 0 to 10000000000000.",
  usage: "randomnumber"
};
