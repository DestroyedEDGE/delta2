exports.run = async (client, message, args, level) => { 
  try {
    let res = await client.awaitReply(message, "Are you sure you want to kill the client?");
    
    if (res == "yes") {
      message.channel.send("Killing client...");
      client.destroy();
    }
    else message.channel.send("Aborted.");
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
  aliases: ["botdest", "clidest", "destroy"],
  guildOnly: true,
  permLevel: "Bot Admin"
};

exports.help = {
  name: "kill",
  category: "System",
  description: "Kills the client and logs out of Discord.",
  usage: "kill"
};
