const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "previous",
        aliases: ["prev"],
        description: "**回到上一首歌曲**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**加載中...**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`**目前沒有播放音樂！**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("**我需要和你進入一樣的語音！ 請輸入$join**")

        if (queue.previousSongs.length == 0) {
                const embed = new MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription("**<a:cry:994042597389651978> | 很抱歉因為沒有上一首歌曲,所以無法執行此指令**")

                msg.edit({ content: ' ', embeds: [embed] });
        } else {
            await client.distube.previous(message)
                .then(song => {
                    const embed = new MessageEmbed()
                        .setColor("#22ff00")
                        .setDescription("**<:Previous_Track:993870676219924650> | 播放上一首歌曲中**")

                    msg.edit({ content: ' ', embeds: [embed] });
            });
        }
    }
}
