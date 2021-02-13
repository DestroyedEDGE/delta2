const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { 
  try {
    const hook = new Discord.WebhookClient(process.env.LOG_WEBHOOK_ID, process.env.LOG_WEBHOOK_TOKEN);
    hook.send(args.join(" "));
    message.channel.send("Message sent to the Delta Log Channel!");
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
  aliases: [],
  guildOnly: false,
  permLevel: "Bot Moderator"
};

exports.help = {
  name: "send",
  category: "General",
  description: "Sends a message to the CytrusLog",
  usage: "send"
};
