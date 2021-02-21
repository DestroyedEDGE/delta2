exports.run = async (client, message, args, level) => { 
  try {
    let msg = await message.channel.send("Creating tag...");
    
    if (!args.join(" ").split("|")[0]) return message.channel.send("You have to name the tag!");
    if (!args.join(" ").split("|")[1]) return message.channel.send("You have to supply text for the tag!");
    
    if (!client.tags.has(message.guild.id)) client.tags.set(message.guild.id, {});
    if (client.tags.has(message.guild.id, args.join(" ").split("|")[0])) return message.channel.send("Sorry, but the tag you specified already exists.");
    
    client.tags.set(message.guild.id, {
      name: args.join(" ").split("|")[0],
      text: args.join(" ").split("|")[1]
    }, args.join(" ").split("|")[0]);
    
    msg.edit("Tag created with the ID of " + message.id + "!");
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
  aliases: [],
  guildOnly: false,
  permLevel: "Administrator"
};

exports.help = {
  name: "createtag",
  category: "General",
  description: "Creates a tag that triggers whenever someone sends the specified message.",
  usage: "createtag trigger|text"
};
