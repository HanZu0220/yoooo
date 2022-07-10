const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "loopqueue",
        aliases: ["lq", "loop all"],
        description: "**重複整個歌單**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**加載中...**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`**目前沒有播放音樂！**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("**我需要和你進入一樣的語音！ 請輸入$join**")

        if (queue.repeatMode === 2) {
                client.distube.setRepeatMode(message, 0);
                const embed = new MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription(`<a:offline:994034329044926525> | **重複歌單模式已關閉 <:repeat_mode:993873914985971732>**`)

                msg.edit({ content: ' ', embeds: [embed] });
            } else {
                client.distube.setRepeatMode(message, 2);
                const embed = new MessageEmbed()
                    .setColor("#22ff00")
                    .setDescription(`<a:online:993475382818914314> | **重複歌單模式已開啟 <:repeat_mode:993873914985971732>**`)

                msg.edit({ content: ' ', embeds: [embed] });
            }
    }
}
