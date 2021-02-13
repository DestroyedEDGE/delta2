exports.run = async (client, message) => { 
  try {
   
   message.channel.send({embed:  
                 { author: { name: client.user.username, icon_url: client.user.avatarURL}, 
                  color: 0x1167b1,
                  title: "**V1.3.0**",
                  fields: [{ name: "New commands!", value: "cyre.minesweeper has returned, alongside various dev commands."},
                           { name: "Grammar fixes", value: "Even more grammar has been fixed!" },
                           { name: "Minor improvements", value: "Among other things, the bot is much more stable." },
                           { name: "Bug fixes", value: "A lot of bugs have been fixed!" }],
                  footer: {text: "Made by Rexowogamer#1183, Odyssey346#9848 and Commandblock6417#9366!"
    } }});
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
  aliases: ["changes", "updates"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "changelog",
  category: "Utility",
  description: "Returns the latest changelog for Cytrus-RE.",
  usage: "changelog"
};
