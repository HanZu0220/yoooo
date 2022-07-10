const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue, song) => {
    let embed = new MessageEmbed()
    .setDescription(`**<:nutron_addsong:993863646423814214> 新增歌曲\n	•	[${song.name}](${song.url}) \`${song.formattedDuration}\`	•\n<a:arrowded:974236415397351424> 音樂播放者${song.user}**`)
    .setColor('#fff180')

    queue.textChannel.send({ content: ' ', embeds: [embed] })
}