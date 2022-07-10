const { Permissions } = require("discord.js");

module.exports = {
    config: {
        name: "play",
        aliases: ["pplay", "p"],
        description: "**播放歌曲**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
     //   message.channel.send(`**Searching.....** \`${args.join(" ")}\``).then(msg => {
     //       setTimeout(() => msg.delete(), 5000)
     //   })
        
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("**<:error:993478219086966855> | 你需要進入一個語音！**")
        if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed: { description: "I don't have perm `CONNECT` or `SPEAK` to execute command!", color: "#000001" } });
        if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed : { description: `I don't have perm \`CONNECT\` or \`SPEAK\` in ${channel.name} to join voice!`, color: "#000001" } });

        const string = args.join(" ");
        if (!string) {
            return message.channel.send("**<:error:993478219086966855> | 請輸入Url或者名稱**");
        }

        const options = {
            member: message.member,
            textChannel: message.channel,
            message
        }

        await client.distube.play(message.member.voice.channel, string, options);
    }
}
