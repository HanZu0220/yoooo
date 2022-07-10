const { MessageEmbed } = require("discord.js");
const pagequeue = require('../../structures/pagequeue.js');

module.exports = {
    config: {
        name: "queue",
        aliases: ["q", "que"],
        description: "**顯示歌單內的歌曲**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message);
        if (!queue) message.channel.send(`**目前沒有播放音樂！**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("**我需要和你進入一樣的語音！ 請輸入$join**")

		const pagesNum = Math.ceil(queue.songs.length / 10);
		if(pagesNum === 0) pagesNum = 1;

        const qduration = queue.formattedDuration;

		const songStrings = [];
		for (let i = 1; i < queue.songs.length; i++) {
			const song = queue.songs[i];
			songStrings.push(
				`${i}. [${song.name}](${song.url}) \`[${song.formattedDuration}]\` • ${song.user}
				`);
		}

		const pages = [];
		for (let i = 0; i < pagesNum; i++) {
			const str = songStrings.slice(i * 10, i * 10 + 10).join('');
			const embed = new MessageEmbed()
                .setAuthor({ name: `歌單 - ${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true })})
                .setThumbnail(queue.songs[0].thumbnail)
				.setColor('#22ff00')
				.setDescription(`**目前播放中歌曲...\n[${queue.songs[0].name}](${queue.songs[0].url}) \`[${queue.songs[0].formattedDuration}]\` • ${queue.songs[0].user}\n\n其他歌曲${str == '' ? '  `無`' : '\n' + str }**`)
				.setFooter({ text: `• ${i + 1}/${pagesNum}頁 • ${queue.songs.length}首歌 • ${queue.formattedDuration} • 加總音樂長度 •`});
			pages.push(embed);
		}

		if (!args[0]) {
			if (pages.length == pagesNum && queue.songs.length > 10) pagequeue(client, message, pages, 60000, queue.songs.length, qduration);
			else return message.channel.send({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args[0])) return message.channel.send('Page must be a number.');
			if (args[0] > pagesNum) return message.channel.send(`There are only ${pagesNum} pages available.`);
			const pageNum = args[0] == 0 ? 1 : args[0] - 1;
			return message.channel.send({ embeds: [pages[pageNum]] });
		}
	}
}
