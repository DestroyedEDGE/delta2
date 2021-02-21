exports.run = async (client, message, args, level) => {
  try {
    await message.channel.send("Unmuting Channel...");
    
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    });
    
    message.channel.send("This channel has been unmuted. You may now send messages. Admins, you can run c.raid at any time should you need to again.");
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
  aliases: ["uc", "unraid"],
  guildOnly: true,
  permLevel: "Administrator"
};

exports.help = {
  name: "unmutechannel",
  category: "Moderation",
  description: "Unmutes the channel",
  usage: "unmutechannel"
};
