exports.run = async (client, message, args, level) => { 
  try {
    let res = await client.awaitReply(message, "Are you sure you want to destroy the client?");
    
    if (res == "yes") {
      message.channel.send("Destroying client...");
      client.destroy();
    }
    else message.channel.send("Aborted.");
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
  aliases: ["botdest", "clidest"],
  guildOnly: true,
  permLevel: "Bot Admin"
};

exports.help = {
  name: "destroy",
  category: "System",
  description: "Destroys the client and logs out of Discord.",
  usage: "destroy"
};
