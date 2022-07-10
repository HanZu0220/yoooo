const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "autoplay",
        aliases: ["ap"],
        description: "**切換當前伺服器的自動播放**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("加載中.....");
        
        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`<:error:993478219086966855> | **沒有其他歌曲在歌單中**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("<:VoteXMark:993471221456969788> | **你需要進入一個語音或者跟我同樣的語音**")

        if (!queue.autoplay) {
            client.distube.toggleAutoplay(message);
    
            const embed = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`**<a:check:993876102781083668> | 啟用Autoplay模式**`)

            msg.edit({ content: ' ', embeds: [embed] });
        } else {
            client.distube.toggleAutoplay(message);

            const embed = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`**<a:error:993876336496091196> | 關閉Autoplay模式**`)

            msg.edit({ content: ' ', embeds: [embed] });
        }
    }
}
