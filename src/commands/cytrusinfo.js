exports.run = async (client, message) => { 
  try {
    client.fetchApplication("@me").then(app => {
      let embed = new client.Embed("blend", {
        title: app.name,
        thumbnail: app.iconURL,
        description: app.description,
        fields: [
          {
            title: "ID",
            text: app.id,
            inline: true
          },
          {
            title: "Public",
            text: app.botPublic,
            inline: true
          },
          {
            title: "Created at",
            text: app.createdAt
          },
          {
            title: "Owner",
            text: app.owner.tag
          }
        ]
      });

      message.channel.send(embed);
    });
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
  aliases: ["cyinf", "cyreinfo", "cyreinf"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "cytrusinfo",
  category: "General",
  description: "Returns Cytrus-RE's OAuth2 application.",
  usage: "cytrusinfo"
};
