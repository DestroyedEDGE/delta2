//load the file that contains all the copypastas
const copypastas = require("../data/copypastas.json");

exports.run = async (client, message, args) => { 
    try {
        // test if the requested pasta is in the list of available pastas
        if (copypastas.pastalist.includes(args[0])) {
            let pasta = copypastas[args[0]]; //if so, attach it to the pasta variable. i.e. copypastas[testing]
            message.channel.send(`${pasta}\nTriggered by ${message.author}`); //send a message with the pasta and who triggered it.
        } else {
            message.channel.send({ embed: { color: "#ff3333", title: "What's that?", description: `I don't know that copypasta. Maybe try one of the following instead:\n${copypastas.pastalist.join(", ")}. \nFor example, run c.copypasta interjection to send the Interjection copypasta.` } });
            //send error if pasta is nonexistent.        
        }
        message.delete(); //delete the command usage.
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
  aliases: ["cpasta"],
  guildOnly: false,
  permLevel: "User"
};
  
exports.help = {
  name: "copypasta",
  category: "Fun",
  description: "Sends totally 100% funny copypastas that will make everyone like you.",
  usage: "copypasta <copypastaname>"
};
