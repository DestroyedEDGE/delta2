exports.run = async (client, message, args, level) => { 
  try {
    if (message.member.hasPermission("CREATE_INSTANT_INVITE")) {
      message.channel.createInvite().then(invite => message.channel.send(`I've succesfuly created the invite!\nCode: https://discord.gg/${invite.code}`));
    } else message.reply("You don't have the Create Invite permission!");
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
  aliases: ["ci", "createinvite", "invmake"],
  guildOnly: true,
  permLevel: "User"
};

exports.help = {
  name: "invite",
  category: "General",
  description: "Creates an invite for the channel that the command was executed in.",
  usage: "invite"
};
