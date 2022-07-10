const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "volume",
        aliases: ["vol", "v"],
        description: "**調整音量**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**調整中...**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`**目前沒有播放音樂！**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("**我需要和你進入一樣的語音！ 請輸入$join**")

        const volume = parseInt(args[0]);

        if (!volume) {
            const embed = new MessageEmbed()
                .setColor("#F5FF00")
                .setDescription(`**<a:Volume:993760550435688498> | 目前音量:\`${queue.volume}\`%**`)

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        if (isNaN(volume)) {
            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`**請輸入一個數字1~100**`);

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        if (Number(volume) < 1 || Number(volume) > 100) return msg.edit(`**請輸入一個正確的數字1~100**`)

        client.distube.setVolume(message, volume);

        const embed = new MessageEmbed()
            .setColor("#22ff00")
            .setDescription(`**<a:Volume:993760550435688498> | 音量從${queue.volume}%調整至${args[0]}%**`)

        msg.edit({ content: ' ', embeds: [embed] });

    }
}
