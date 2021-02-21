const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  try {
    const user = args[0];
    const settings = client.getSettings(message.guild.id);

    if (user) {
        message.guild.members.unban(args.slice(1).join(" ")).then(() => {
          message.channel.send(`Successfully unbanned ${user.tag}!`);

          const modLogChannel = settings.modLogChannel;
          if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
            let embed = new Discord.MessageEmbed()
            .setTitle("User Unbanned")
            .setColor("#eeeeee")
            .setDescription(`Reason: ${args.slice(1).join(" ")}\nModerator: ${message.author.username}`);

            message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
          }
        }).catch(err => {
         message.channel.send("I was unable to unban the member!");
         client.logger.console.error(err);
        });
    } else {
      message.channel.send("You didn't specify the user to unban!");
    }
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
  aliases: ["b"],
  guildOnly: true,
  permLevel: "Moderator"
};

exports.help = {
  name: "unban",
  category: "Moderation",
  description: "Unbans a member.",
  usage: "unban <userid> [reason]"
};
