const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "leave",
        aliases: ["lev", "stop", "dc"],
        description: "**讓機器人退出頻道**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**<a:offline:994034329044926525> | 退出中.....**");
        const queue = client.distube.getQueue(message);
		if (!queue) return msg.edit(`**<:playlist:993486946619904071> | 現在沒有任何音樂在歌單中**`)
        const clientVoice = message.guild.me.voice.channel;
        const memberVoice = message.member.voice.channel;

        if (clientVoice === memberVoice) {
            if (queue) {
                client.distube.stop(message);
                client.distube.voices.leave(message.guild);
            } else {
                client.distube.voices.leave(message.guild);
            }

            const embed = new MessageEmbed()
                .setDescription(`<:icons_dleave:994034705328513124> | **退出語音:** \`${memberVoice.name}\``)
                .setColor('#ff0000')

            msg.edit({ content: ' ', embeds : [embed] });

        }

    }
}
