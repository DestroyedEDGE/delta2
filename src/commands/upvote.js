exports.run = async (client, message, args, level) => { 
  try {
    message.channel.send("Upvoting the bot on discordbotlist.com helps other people discover Cytrus-RE! Thanks for voting!\n Vote here: https://discordbotlist.com/bots/cytrus-re");
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

//permissions and aliases

exports.conf = {
  enabled: true,
  aliases: ["vote"],
  guildOnly: false,
  permLevel: "User"
};


//what the command does

exports.help = {
  name: "upvote",
  category: "System",
  description: "Upvote the bot on Discord Bot List.",
  usage: "upvote"
};
