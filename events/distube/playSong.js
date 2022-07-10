const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, queue, track) => {
      var newQueue = client.distube.getQueue(queue.id)
      var data = disspace(newQueue, track)

      const nowplay = await queue.textChannel.send(data)

      const filter = (message) => {
        if(message.guild.me.voice.channel && message.guild.me.voice.channelId === message.member.voice.channelId) return true;
        else {
          message.reply({ content: "**我需要和你進入一樣的語音！ 請輸入$join**", ephemeral: true });
        }
      };
      const collector = nowplay.createMessageComponentCollector({ filter, time: 120000 });

      collector.on('collect', async (message) => {
        const id = message.customId;
        const queue = client.distube.getQueue(message.guild.id);
        if(id === "pause") {
        if(!queue) {
            collector.stop();
        } 
        if (queue.paused) { 
          await client.distube.resume(message.guild.id);
          const embed = new MessageEmbed()
            .setColor("#ff7b47")
            .setDescription(`<:Resume:993865213617115287> | **歌曲已重新播放**`);
    
          message.reply({ embeds: [embed], ephemeral: true });
        } else {
          await client.distube.pause(message.guild.id);
          const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`<:Pause:993865055529603152> | **歌曲已暫停**`);
    
          message.reply({ embeds: [embed], ephemeral: true });
        }
        } else if (id === "skip") {
          if(!queue) {
            collector.stop();
          }
          if (queue.songs.length === 1) {
            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription("<:error:993478219086966855> | **沒有其他歌曲在歌單中**")

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
          await client.distube.skip(message)
            .then(song => {
                const embed = new MessageEmbed()
                    .setColor("#22ff00")
                    .setDescription("<:Skip:993870732427804773> | **歌曲已被跳過**")

            nowplay.edit({ components: [] });
            message.reply({ embeds: [embed], ephemeral: true });
            });
          }
        } else if(id === "stop") {
          if(!queue) {
            collector.stop();
          }
  
          await client.distube.stop(message.guild.id);
  
          const embed = new MessageEmbed()
              .setDescription(`<:Stop:993866555131711581> | **歌曲已被停止**`)
              .setColor('#ff0000');
          
          await nowplay.edit({ components: [] });
          message.reply({ embeds: [embed], ephemeral: true });
        } else if(id === "loop") {
          if(!queue) {
            collector.stop();
          }
          if (queue.repeatMode === 0) {
            client.distube.setRepeatMode(message.guild.id, 1);
            const embed = new MessageEmbed()
                .setColor("22ff00")
                .setDescription(`<a:check:993876102781083668> | **已開啟歌曲重複模式 <:Repeat_:993873881871949914>**`)

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
            client.distube.setRepeatMode(message.guild.id, 0);
            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`<a:error:993876336496091196> | **已關閉歌曲重複模式<:Repeat_:993873881871949914>**`)

            message.reply({ embeds: [embed], ephemeral: true });
          }
        } else if (id === "previous") {
          if(!queue) {
            collector.stop();
          }
          if (queue.previousSongs.length == 0) {
            const embed = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription("<:error:993478219086966855> | **沒有上一首歌曲了**")

            message.reply({ embeds: [embed], ephemeral: true });
          } else {
          await client.distube.previous(message)
                const embed = new MessageEmbed()
                    .setColor("#22ff00")
                    .setDescription("<:Previous_Track:993870676219924650> | **歌曲已回到上一首**")

                nowplay.edit({ components: [] });
                message.reply({ embeds: [embed], ephemeral: true });
            }
        }
      });
      collector.on('end', async (collected, reason) => {
        if(reason === "time") {
          nowplay.edit({ components: [] });
        }
      });
  }

  function disspace(nowQueue, nowTrack) {
    const embeded = new MessageEmbed()
    .setAuthor({ name: `開始播放中...`, iconURL: 'https://cdn.discordapp.com/emojis/741605543046807626.gif'})
    .setThumbnail(nowTrack.thumbnail)
    .setColor('#22ff00')
    .setDescription(`**[${nowTrack.name}](${nowTrack.url})**`)
    .addField(`影片作者:`, `**[${nowTrack.uploader.name}](${nowTrack.uploader.url})**`, true)
    .addField(`指令發送者:`, `**${nowTrack.user}**`, true)
    .addField(`目前音量:`, `**${nowQueue.volume}%**`, true)
    .addField(`音樂特效:`, `**${nowQueue.filters.join(", ") || "普通"}**`, true)
    .addField(`自動播放:`, `**${nowQueue.autoplay ? "啟用" : "尚未啟用"}**`, true)
    .addField(`音樂長度:`, `**${nowQueue.formattedDuration}**`, true)
    .addField(`目前時間: \`[0:00 / ${nowTrack.formattedDuration}]\``, `\`\`\`🔴 | 🎶──────────────────────────────\`\`\``)
    .setTimestamp()

    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId("pause")
        .setEmoji("<:pause_resume:994041226040967199>")
        .setStyle("SUCCESS")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("previous")
        .setEmoji("<:Previous_Track:993870676219924650>")
        .setStyle("PRIMARY")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("stop")
        .setEmoji("<:VoteXMark:993471221456969788>")
        .setStyle("DANGER")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("skip")
        .setEmoji("<:Skip:993870732427804773>")
        .setStyle("PRIMARY")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("loop")
        .setEmoji("<:Repeat_:993873881871949914> ")
        .setStyle("SUCCESS")
    )
    return {
      embeds: [embeded],
      components: [row]
    }
  }