const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue, playlist) => {
    const embed = new MessageEmbed()
        .setDescription(`**<:nutron_addsong:993863646423814214> 新增歌單\n•	[${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} 首歌曲)	•\n<a:arrowded:974236415397351424> 音樂播放者${playlist.user}`)
        .setColor('#22ff00')
  
      queue.textChannel.send({ embeds: [embed] })
}