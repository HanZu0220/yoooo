const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "shuffle",
        aliases: ["mix"],
        description: "隨機播放",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**開啟隨機播放模式中**...");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`**目前沒有播放音樂！**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("**我需要和你進入一樣的語音！ 請輸入$join**")

            await client.distube.shuffle(message);

			let embed = new MessageEmbed()
				.setColor('#4487FF')
				.setDescription(`**<:shuffle_queue:994060353778483220> | 歌單已開始隨機播放**`);

			msg.edit({ content: ' ', embeds: [embed] });
    }
};