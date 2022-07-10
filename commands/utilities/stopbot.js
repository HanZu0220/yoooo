const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "restart",
        description: "**重新啟動機器人**",
        category: "utilities",
        accessableby: "Owner",
        aliases: ["stopbot"]
    },
    run: async (client, message, args) => {
    if(message.author.id != client.owner) return message.channel.send("You not the client the owner!")

    const restart = new MessageEmbed()
        .setDescription("```機器人將被重新啟動: 關閉中...```")
        .setColor("#ff7b47");

    await message.channel.send({ embeds: [restart] });
        console.log(chalk.red(`[系統] 重啟中...`));
            
    process.exit();
    }
};