exports.run = async (client, message, args, level) => { 
  try {
    let msg = await message.channel.send("Editing tag...");
    
    if (!args.join(" ").split("|")[0]) return message.channel.send("You have to name the tag!");
    if (!args.join(" ").split("|")[1]) return message.channel.send("You have to supply the text for the tag!");
    
    if (!client.tags.has(message.guild.id)) client.tags.set(message.guild.id, {});
    if (!client.tags.has(message.guild.id, args.join(" ").split("|")[0])) return message.channel.send("That's not a tag!");
    client.tags.set(message.guild.id, {
      name: args.join(" ").split("|")[0],
      text: args.join(" ").split("|")[1]
    }, args.join(" ").split("|")[0]);
    
    msg.edit("Tag edited with the ID of " + message.id + "!");
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
  aliases: ["etag"],
  guildOnly: false,
  permLevel: "Administrator"
};

exports.help = {
  name: "edittag",
  category: "General",
  description: "Edits a tag.",
  usage: "edittag trigger|text"
};
