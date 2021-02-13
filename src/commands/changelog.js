exports.run = async (client, message) => { 
  try {
   
   message.channel.send({embed:  
                 { author: { name: client.user.username, icon_url: client.user.avatarURL}, 
                  color: 0x1167b1,
                  title: "**v1.3.0-delta1**",
                  fields: [{ name: "There is more to come...", value: "https://discord.gg/hHBy4JZ4hr"}],
                  footer: {text: "By DestroyedEDGE#0120 and Odyssey346#9848"
    } }});
  } catch (err) {
   message.channel.send(client.errors.genericError + err).catch();
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
