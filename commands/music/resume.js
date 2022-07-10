const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "resume",
        aliases: ["re"],
        description: "**返回播放歌曲**",
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
			await client.distube.resume(message);

			const embed = new MessageEmbed()
				.setColor("#FFA544")
				.setDescription(`**<:pause_resume:994041226040967199> | 歌曲已開始重新播放**`);

			msg.edit({ embeds: [embed] });
		} else {
			const embed = new MessageEmbed()
				.setColor("#FFA544")
				.setDescription(`**<:pause_resume:994041226040967199> | 歌單已開始重新播放**`);

			msg.edit({ embeds: [embed] });
		}
    }
}
