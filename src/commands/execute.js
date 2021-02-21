const exec = require("child_process").exec;
exports.run = async (client, message, args, level) => { 
  try {
    const execute = (command) => {

      message.channel.send("Command executed in shell!");
      exec(command, (err, stdout, stderr) => {
        message.author.send(stdout).catch("The output was too big!");
        if (stderr) {
          message.author.send("```"+stderr+"```");

          message.channel.send("Shell error!");
        }
      });
    };

    execute(args.join(" "));
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
  aliases: ["exec"],
  guildOnly: false,
  permLevel: "Bot Manager"
};

exports.help = {
  name: "execute",
  category: "System",
  description: "Executes a command in the shell.",
  usage: "execute <shell-command>"
};
