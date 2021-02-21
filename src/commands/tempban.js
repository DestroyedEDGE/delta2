const Discord = require("discord.js");
const ms = require("ms");

exports.run = async (client, message, args) => {
  try {
    const user = message.mentions.users.first();
    const settings = client.getSettings(message.guild.id);

    if (args) {
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member.ban().then(() => {
            message.reply(`Successfully banned ${user.tag}`);

            const modLogChannel = settings.modLogChannel;
            if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
              let embed = new Discord.MessageEmbed()
              .setTitle("User TempBan")
              .setColor("#eeeeee")
              .setDescription(`Name: ${user.username}\nID: ${user.id}\nTime: ${args.slice(1).join(" ")}\nModerator: ${message.author.username}`);

              message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
            }
            
            setTimeout(async () => {
              message.guild.unban(user.id);
            }, ms(args.join(" ")));
          }).catch(err => {
           message.reply("I was unable to ban the member");
           client.logger.error(err);
          });
        } else message.reply("That user isn't in this guild!");
      } else message.reply("You didn't mention the user to ban!");
    } else message.reply("You didin't specify the time to ban them for!");
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
  aliases: ["tb"],
  guildOnly: true,
  permLevel: "Moderator"
};

exports.help = {
  name: "tempban",
  category: "Moderation",
  description: "Temporarily Bans a member for an optional reason",
  usage: "tempban @<user> <time>"
};
