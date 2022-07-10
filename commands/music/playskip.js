const { Permissions } = require("discord.js");

module.exports = {
    config: {
        name: "playskip",
        description: "**可指定下一首歌曲**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
      //  message.channel.send(`**Searching.....** \`${args.join(" ")}\``).then(msg => {
      //      setTimeout(() => msg.delete(), 5000)
      //  })
        
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("**<:error:993478219086966855> | 你需要進入一個語音！**")
        if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed: { description: "<:error:993478219086966855> | 我沒有說話和加入語音的權限**", color: "#ff0000" } });
        if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed : { description: `**<:error:993478219086966855> | 我在 ${channel.name} 沒有說話和加入語音的權限**`, color: "#ff0000" } });

        const string = args.join(" ");
        if (!string) {
            return message.channel.send("**<:error:993478219086966855> | 請輸入Url或者名稱**");
        }

        const options = {
            member: message.member,
            textChannel: message.channel,
            message,
            skip: true
        }

        await client.distube.play(message.member.voice.channel, string, options);
    }
}
