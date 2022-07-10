const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "**查看現在播放中的歌曲**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
		const msg = await message.channel.send('**加載中...**');

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`**目前沒有播放音樂！**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("**我需要和你進入一樣的語音！ 請輸入$join**")

        const uni = `${queue.songs[0].playing ? '⏸️ |' : '🔴 |'}`;
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

        const embed = new MessageEmbed()
            .setAuthor({ name: queue.songs[0].playing ? '歌曲暫停中...' : '現正播放中...', iconURL: "https://cdn.discordapp.com/emojis/741605543046807626.gif"})
            .setColor('#B59CFF')
            .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
            .setThumbnail(`${queue.songs[0].thumbnail}`)
            .addField('影片作者:', `**[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})**`, true)
            .addField('指令發送者:', `**${queue.songs[0].user}**`, true)
            .addField('目前音量:', `**${queue.volume}%**`, true)
            .addField('觀看數:', `**${queue.songs[0].views}**`, true)
            .addField('按讚:', `**${queue.songs[0].likes}**`, true)
            .addField('倒讚:', `**${queue.songs[0].dislikes}**`, true)
            .addField(`目前時間: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\``)
            .setTimestamp()

        msg.edit({ content: ' ', embeds: [embed] });
    }
}
