const fs = require("fs");
const { MessageEmbed, Message } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord-buttons');
const arr = [[,]]
let string = "", c, index = 0, page = 1;
module.exports = {
    name: "help",
    description: "description",
    aliases: [],
    execute(msg, args) {
        const ButtonLeft = new MessageButton()
            .setEmoji("⬅️")
            .setStyle("green")
            .setID("-");
        const ButtonRight = new MessageButton()
            .setEmoji("➡️")
            .setStyle("green")
            .setID("+");
        const row = new MessageActionRow()
            .addComponent(ButtonLeft)
            .addComponent(ButtonRight);

        fs.readdir(__dirname, (err, files) => {
            files.forEach(file => {
                if (file.endsWith(".js")) {
                    const event = require(`${__dirname}/${file}`);
                    arr.push([event.name]);
                    arr[index][1] = event.description;
                }
            });
            string = "";
            for (let i = 0; i < arr.length; i++) {
                string += `->**${arr[i][0]}**--${arr[i][1]}\n`;
                if (i >= 9) {
                    i = 11;
                }
            }
            c = Math.ceil(arr.length / 10);
            const exampleEmbed = new MessageEmbed()
                .setColor('#1bb563')
                .setTitle('Help')
                .setDescription('Prefix: ' + prefix + "\n" + string + `\n**1/${c}**`);


            msg.channel.send(exampleEmbed, row);
        });
    }

}
client.on("clickButton", button => {
    if (button.id == "+") {
        string = "";
        if (page == c) {
            let er = 9;
            if (arr.length < 10) {
                er = 13;
            }
            for (let i = 0; i < arr.length; i++) {
                string += `->**${arr[i][0]}**--${arr[i][1]}\n`;
                if (i == er) {
                    i = arr.length;
                }
            }
            page = 1;
        } else {
            for (let i = page * 10; i < (page * 10) + 10; i++) {
                string += `->**${arr[i][0]}**--${arr[i][1]}\n`;
                if (i == arr.length - 1) {
                    i = (page * 10) + 10;
                }
            }
            page++;
        }
    } else {
        string = "";
        if (page == 1) {
            page = Math.floor(arr.length / 10);
            for (let i = page * 10; i < (page * 10) + 10; i++) {
                string += `->**${arr[i][0]}**--${arr[i][1]}\n`;
                if (i == arr.length - 1) {
                    i = (page * 10) + 10;
                }
            }
            page++;
        } else {
            page--;
            for (let i = (page - 1) * 10; i < ((page - 1) * 10) + 10; i++) {
                string += `->**${arr[i][0]}**--${arr[i][1]}\n`;
                if (i == arr.length - 1) {
                    i = ((page - 1) * 10) + 10;
                }
            }
        }
    }
    const pageS = new MessageEmbed()
        .setColor('#1bb563')
        .setTitle('Help')
        .setDescription('Prefix: ' + prefix + "\n" + string + `\n**${page}/${c}**`);
    button.reply.defer();
    button.message.edit(pageS);
})