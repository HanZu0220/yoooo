const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "pause",
        aliases: ["pa"],
        description: "**暫停現在播放中的歌曲**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**加載中...**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`**目前沒有播放音樂！**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("**我需要和你進入一樣的語音！ 請輸入$join**")
		
		if (queue.paused) { 
			const embed = new MessageEmbed()
				.setColor("#22ff00")
				.setDescription(`**<a:check:993876102781083668> | 歌曲已被暫停**`);

			msg.edit({ content: ' ', embeds: [embed] });
		} else {
			client.distube.pause(message);
			const embed = new MessageEmbed()
				.setColor("#22ff00")
                .setDescription(`**<a:check:993876102781083668> | 歌曲已被暫停**`);

			msg.edit({ content: ' ', embeds: [embed] });
		}
    }
}
