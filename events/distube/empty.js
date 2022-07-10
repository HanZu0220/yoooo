const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue) => {
    const embed = new MessageEmbed()
    .setColor('#ff0000')
    .setDescription(`**頻道無人**`)

    queue.textChannel.send({ embeds: [embed] })
}