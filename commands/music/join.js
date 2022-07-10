const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    config: {
        name: "join",
        aliases: ["summon"],
        description: "**讓機器人加入語音**",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("**<a:online:993475382818914314> | 加入中.....**");

		const { channel } = message.member.voice;
		if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed: { description: "**<:error:993478219086966855> | 我沒有說話和加入語音的權限**", color: "#ff0000" } });
        if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed : { description: `**<:error:993478219086966855> | 我在 ${channel.name} 沒有說話和加入語音的權限**`, color: "#ff0000" } });

        const clientVoice = message.guild.me.voice.channel;
        const memberVoice = message.member.voice.channel;
		
		if (clientVoice) {
			if (clientVoice !== memberVoice) {
				const embed = new MessageEmbed()
					.setColor("#ff0000")
					.setDescription(`**<:error:993478219086966855> | 你需要和 ${message.client.user} 在同樣的語音～**`);

				return msg.edit({ content: ' ', embeds: [embed] });
			} else {
				const embed = new MessageEmbed()
					.setColor("#ff0000")
					.setDescription(`**<:error:993478219086966855> | 我已經在你的語音裡面囉～**`);

				return msg.edit({ content: ' ', embeds: [embed] });
			}
		} else {
			if (memberVoice) {
				client.distube.voices.join(memberVoice)
					.then(voice => {
						const embed = new MessageEmbed()
							.setColor('#22ff00')
							.setDescription(`<:icons_djoin:994034655571488859> | **加入語音:** \`${memberVoice.name}\``)

                        msg.edit({ content: ' ', embeds: [embed] });
					})
					.catch(error => {
						console.log(e);
					})

				
			} else {
				const embed = new MessageEmbed()
					.setColor("#ff0000")
					.setDescription(`**<:error:993478219086966855> | 你需要進入一個語音頻道～**`);

				return msg.edit({ content: ' ', embeds: [embed] });
			}
		}
    }
}
