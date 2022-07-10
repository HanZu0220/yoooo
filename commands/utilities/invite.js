const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    config: {
        name: "invite",
        aliases: [],
        category: "utilities",
        description: "**邀請機器人進入您的伺服器**",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor("#45E5FF")
        .setDescription("**```邀請我進入您的伺服器！```**")
        .setTimestamp()
        .setFooter({ text: `指令發送者: ${message.author.tag}`, iconURL: message.author.displayAvatarURL()});

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("點我")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot`)
                    .setEmoji("<:invite:994039236468690984>")
                    .setStyle("LINK")
            )
        
        message.channel.send({ embeds: [embed], components: [row] });
    }
}
