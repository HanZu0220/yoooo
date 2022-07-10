const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const chalk = require("chalk");

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: "(command)",
        category: "utilities",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        console.log(chalk.magenta(`[指令] 使用者為 ${message.author.tag} 來自 ${message.guild.name}`));
        const embed = new MessageEmbed()
            .setColor('#9FEEFF')
            .setAuthor({ name: `${message.guild.me.displayName} 指令列表📜`, iconURL: message.guild.iconURL({ dynamic: true })})
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }));

        if(!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(`**<:DiscordStaff:993483104096374784> 指令前綴為： ${client.prefix}**`)
            embed.setFooter({ text: `© ${message.guild.me.displayName} | 全部指令： ${client.commands.size}`, iconURL: client.user.displayAvatarURL({ dynamic: true })});

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
                } catch(e) {
                    console.log(e)
                }
            })

            return message.channel.send({ embeds: [embed] })
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send({ embeds: [embed.setTitle("無效的指令").setDescription(`****輸入 \`${client.prefix}help\` 查看指令列表**`)] })
            command = command.config

            embed.setDescription(stripIndents`**<:DiscordStaff:993483104096374784> 指令前綴為： \`${client.prefix}\`**\n
            **指令:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **詳細內容:** ${command.description || "No Description provided."}
            **用法:** ${command.usage ? `\`${client.prefix}${command.name} ${command.usage}\`` : "No Usage"}
            **所需身分:** ${command.accessableby || "Members"}
            **通用詞:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            return message.channel.send({ embeds: [embed] })
        }
    }
}