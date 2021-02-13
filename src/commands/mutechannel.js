exports.run = async (client, message) => {
  try {
    message.channel.send("Muting channel...");
    
    message.channel.overwritePermissions(message.guild.id, {SEND_MESSAGES: false});
    
    message.channel.send("This channel has been muted. You may not send any messages at this time. Admins, you can run c.unraid to unmute the chat at any time.");
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
  aliases: ["raid", "chmute", "cmute", "mutech"],
  guildOnly: true,
  permLevel: "Administrator"
};

exports.help = {
  name: "mutechannel",
  category: "Moderation",
  description: "Mutes the channel you use the command in.",
  usage: "mutechannel"
};
