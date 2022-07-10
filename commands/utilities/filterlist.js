const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "filterlist",
        aliases: ["fl"],
        usage: "(command)",
        category: "utilities",
        description: "**查看各種音樂特效**",
        accessableby: "Members"
    },
    run: async (client, message) => {
        const msg = await message.channel.send("**加載中...**");
        const embed = new MessageEmbed()
            .setColor('#DF44FF')
            .setAuthor({ name: `📜 特效列表`, iconURL: message.guild.iconURL({ dynamic: true })})
            .setDescription(`**<a:bassboost:993685485589381220> 各種音樂特效如下**`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .addField('**3D環繞特效**', `\`3d\``, true)
            .addField('**重低音**', `\`bassboost\``, true)
            .addField('**回音特效**', `\`echo\``, true)
            .addField('**卡拉OK**', `\`karaoke\``, true)
            .addField('**很嗨就對了**', `\`nightcore\``, true)
            .addField('**蒸汽波特效**', `\`vaporwave\``, true)
            .addField('**噴射機特效（？**', `\`flanger\``, true)
            .addField('**悶音**', `\`gate\``, true)
            .addField('**倒轉**', `\`reverse\``, true)
            .addField('**環繞**', `\`surround\``, true)
            .addField('**類似重金屬的效果**', `\`phaser\``, true)
            .addField('**震音效果**', `\`tremolo\``, true)
            .setFooter({ text: `範例: ${client.prefix}filter bassboost`})
            .setTimestamp()

            msg.edit({ content: ' ', embeds: [embed] })
        }
}; // testing version
