const Discord = require("discord.js");
const moment = require("moment");
const cpu = require("pidusage");
const { version } = require("discord.js");
require("moment-duration-format");

exports.run = (client, message, args, level) => { 
  client.startuptime = new Date().getTime() - client.starttime;
  try {
    cpu(process.pid, async (err, stats) => {
      const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
      const embed = new Discord.MessageEmbed()
      .setTitle("Cytrus-RE Status")
      .setDescription(`
RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
Uptime: ${duration}
Users: ${client.users.cache.size}
Servers: ${client.guilds.cache.size}
Channels: ${client.channels.cache.size}
Status: ${client.user.presence.status}
Game: ${client.user.presence.game}
Discord.js: v${version}
CPU Usage: ${Math.round(stats.cpu)}%
Node.js: ${process.version}
Dependencies: ${Object.keys(require("../../package").dependencies).length}
Startup Time: ${client.startuptime}ms
Voice Connections: ${client.voiceConnections.cache.size}`)
      .setColor("#eeeeee");

      message.channel.send(embed);
    });
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
  aliases: ["stats"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "status",
  category: "System",
  description: "Returns some info about the bot.",
  usage: "status"
};
