exports.run = async (client, message, args, level) => { 
   try {
     let output = "";
     client.uses.forEach((cmd) => output += cmd + "\n");
     message.channel.send(output);
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
   aliases: ["cmdu"],
   guildOnly: false,
   permLevel: "Bot Manager"
 };

  exports.help = {
   name: "commandusage",
   category: "System",
   description: "Shows how much commands are being used.",
   usage: "commandusage"
 };
