const rhyme = require("rhyme");
// todo: rewrite with rhymes library instead of rhyme
exports.run = async (client, message, args, level) => { 
  try {
    if (!args[0]) return message.reply("You need to input the word to rhyme!");
    
    let msg = await message.reply("Finding rhymes...");
    
    rhyme(async (rl) => {
      
      let rhymes = "";

      let words = rl.rhyme(args.join(" "));
      
      words.forEach(word => {
        rhymes += word.toProperCase() + ", ";
      });

      rhymes = rhymes.slice(0, -2);

      let embed = new client.Embed("blend", {
        title: "Rhyme",
        description: `**Rhyming Words**\n${rhymes || "None Found."}`
      });

      msg.edit(embed);
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
  aliases: [],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "rhyme",
  category: "Fun",
  description: "Returns all the words that rhyme with the specified word",
  usage: "rhyme <word>"
};