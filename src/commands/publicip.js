const http = require("http");

exports.run = async (client, message) => {
  try {
    http.get({"host": "api.ipify.org", "port": 80, "path": "/"}, resp => {
      resp.on("data", ip => {
        message.author.send("Cytrus-RE's public IP: " + ip);
        message.channel.send("Cytrus-RE's IP is in your DMs!");
      });
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
  aliases: ["ip"],
  guildOnly: false,
  permLevel: "Bot Admin"
};

exports.help = {
  name: "publicip",
  category: "System",
  description: "Returns Cytrus-RE's public IP.",
  usage: "publicip"
};
