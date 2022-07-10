const lyricsfinder = require('lyrics-finder');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "lyrics",
        aliases: [],
        description: "**查詢歌曲歌詞**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("<a:search:994042247999926382> | **搜尋歌詞中**...");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`**目前沒有播放音樂！**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("**我需要和你進入一樣的語音！ 請輸入$join**")

        let song = args.join(" ");
            let CurrentSong = queue.songs[0];
        if (!song && CurrentSong) song = CurrentSong.name;

        let lyrics = null;

        try {
            lyrics = await lyricsfinder(song, "");
            if (!lyrics) msg.edit("**<a:cry:994042597389651978> | 很抱歉,並沒有找到您要的這首歌詞**");
        } catch (err) {
            console.log(err);
            msg.edit("**<a:cry:994042597389651978> | 很抱歉,並沒有找到您要的這首歌詞**");
        }
        let lyricsEmbed = new MessageEmbed()
            .setColor('#22ff00')
            .setTitle(`歌詞🎤`)
            .setDescription(`**${song}\n${lyrics}**`)
            .setFooter({ text: `查詢者: ${message.author.username}`})
            .setTimestamp();

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription("**<a:error:993876336496091196> | 很抱歉,歌詞太長無法顯示！**");
        }

        msg.edit({ content: ' ', embeds: [lyricsEmbed] })
        .then(n => {
            var total = queue.songs[0].duration * 1000;
            var current = queue.currentTime * 1000;
            let time = total - current;
            setTimeout(() => { msg.delete(); }, time);
        });
    }
};