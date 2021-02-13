exports.run = async (client, message, args, level) => { 
  try {
    let msg = await message.channel.send("Deleting tag...");
    if (!args[0]) return message.reply("You have to supply the name of the tag!");
    
    if (!client.tags.has(message.guild.id)) client.tags.set(message.guild.id, {});
    if (!client.tags.has(message.guild.id, args.join(" "))) return message.reply("That's not a valid tag!");
    
    client.tags.delete(message.guild.id, args.join(" "));
    
    msg.edit("Tag deleted with the ID of " + message.id + "!");
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
  aliases: ["rtag", "rmtag"],
  guildOnly: false,
  permLevel: "Administrator"
};

exports.help = {
  name: "removetag",
  category: "General",
  description: "Removes the specified tag.",
  usage: "removetag <tag>"
};
