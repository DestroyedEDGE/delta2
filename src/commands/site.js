exports.run = async (client, message, args, level) => { 
  try {
    message.channel.send("Check it out here: **https://cytrus-re.github.io**");
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

//permissions and aliases

exports.conf = {
  enabled: true,
  aliases: ["cytrusresite", "webpage", "page"],
  guildOnly: false,
  permLevel: "User"
};


//what the command does

exports.help = {
  name: "site",
  category: "System",
  description: "Returns the link to our (totally good) website hosted on GitHub Pages!",
  usage: "site"
};
