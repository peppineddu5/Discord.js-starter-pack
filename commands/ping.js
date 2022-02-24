//const Discord=require("discord.js")
module.exports = {
    name: "ping",
    description: "description",
    //the alias are the other words that will trigger this command
    aliases: ["ping!"],
    execute(msg, args) {
        msg.channel.send(`pong`);        
    }

}
