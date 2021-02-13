const exec = require("child_process").exec;
const os = require ("os");

exports.run = async (client, message, args, level) => { 
  try {
    const execute = (command) => {

      message.channel.send("The files have been sent to your DMs!");
      exec(command, (err, stdout, stderr) => {
        message.author.send(`**${stdout}**\n`);
        if (err || stderr) {
          if (err) {
            message.author.send("```"+err+"```");
          }

          if (stderr) {
            message.author.send("```"+stderr+"```");
          }

          message.channel.send("Shell Error.");
        }
      });
    };
    if (os.platform == "win32") {
      execute("dir"); // are we windows? run this
    }
    else {
      execute("ls -a "); // ok, we're not windows, run this
    };

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
  aliases: ["fls", "ls", "fl"],
  guildOnly: false,
  permLevel: "Bot Support"
};

exports.help = {
  name: "files",
  category: "System",
  description: "Returns all the files for Cytrus.",
  usage: "files"
};
