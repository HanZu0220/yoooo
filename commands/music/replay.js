const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "replay",
        aliases: [],
        description: "**重頭播放歌曲**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**加載中...**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`**目前沒有播放音樂！**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("**我需要和你進入一樣的語音！ 請輸入$join**")

        await queue.seek(0)

        const embed = new MessageEmbed()
            .setColor("#FFA544")
            .setDescription("**<:replay:994059143763730565> | 重新播放歌曲**")

        msg.edit({ content: ' ', embeds: [embed] });
        
    }
}
