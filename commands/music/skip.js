const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "skip",
        aliases: ["s"],
        description: "**跳過歌曲**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**<:Skip:993870732427804773> 歌曲跳過中**...");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`**目前沒有播放音樂！**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("**我需要和你進入一樣的語音！ 請輸入$join**")

        if (queue.songs.length === 1) {
                const embed = new MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription("<:playlist:993486946619904071> | 現在沒有其他音樂在歌單中**")

                msg.edit({ content: ' ', embeds: [embed] });
        } else {
            client.distube.skip(message)
                .then(song => {
                    const embed = new MessageEmbed()
                        .setColor("#FDFF9A")
                        .setDescription("**<:Skip:993870732427804773> | 歌曲已被跳過**")

                    msg.edit({ content: ' ', embeds: [embed] });
                });
        }
    }
}
