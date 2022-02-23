const { MessageEmbed } = require('discord.js');
global.err=(Title,Description)=>{
    const errorEmbed = new MessageEmbed()
	.setColor('#ff2d19')
	.setTitle(Title)
	.setDescription(Description)
	.setTimestamp()
	.setFooter({ text: 'We have a problem'});
    return errorEmbed;
}