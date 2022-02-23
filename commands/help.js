const fs = require("fs");
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "help",
    description: "description",
    aliases: [],
    execute(msg, args) {
        //Embed Message
        const exampleEmbed = new MessageEmbed()
            .setColor('#1bb563')
            .setTitle('Help')
            .setDescription('Prefix: ' + prefix + "\n")
            .setTimestamp()
            .setFooter({ text: 'Help Command' });

        //Get ALL file(.js) on this folder
        fs.readdir(__dirname, (err, files) => {
            files.forEach(file => {
                if (file.endsWith(".js")) {
                    const event = require(`${__dirname}/${file}`);
                    //Setup the description
                    exampleEmbed.setDescription(exampleEmbed.description + `->**${event.name}**--${event.description}\n`);
                }
            });
            msg.channel.send({ embeds: [exampleEmbed] });
        });
        
        //to send the error
        msg.channel.send({ embeds: [err("Title of the problem","Description of the problem")] });
    }

}