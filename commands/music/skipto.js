const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "skipto",
        aliases: ["st"],
        description: "**跳到指定的歌曲**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**<:Skip:993870732427804773> 歌曲跳過中**...");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`**目前沒有播放音樂！**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("**我需要和你進入一樣的語音！ 請輸入$join**")

        if (isNaN(args[0])) {
            const embed = new MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`**請輸入一個正確的數字**`);

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        await client.distube.jump(message, parseInt(args[0]))
            .then(queue => {
                const embed = new MessageEmbed()
                    .setColor("#22ff00")
                    .setDescription(`**<:Skip:993870732427804773> | 歌曲跳到排列第${args[0]}的歌曲**`)

                msg.edit({ content: ' ', embeds: [embed] });
            });
    }
}
