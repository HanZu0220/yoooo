const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue) => {
    const embed = new MessageEmbed()
        .setDescription(`<:Stop:993866555131711581> | **歌曲已結束**`)
        .setColor('#ff0000')

    queue.textChannel.send({ embeds: [embed] })
}