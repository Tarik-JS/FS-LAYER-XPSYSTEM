
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const random = require("random")

let prefix = "!";

//حقوق لاير تيم
let Layer_XPSYSTEM = JSON.parse(fs.readFileSync("./Layer_XPSYSTEM.json", 'utf8'));
client.on('message', message => {
  if (!message.channel.guild) return;

  if (!Layer_XPSYSTEM[message.author.id]) {
    Layer_XPSYSTEM[message.author.id] = {
      userXP: 0,
      userTOTAL: 0,
      reqXP: 200,
      userLVL: 0,
    }
    console.log('xp set..........')
    fs.writeFile('Layer_XPSYSTEM.json',JSON.stringify(Layer_XPSYSTEM,null,5),err=>{
      console.log(err)
    })
  }

  let xp = random.int(0,2)
  Layer_XPSYSTEM[message.author.id].userXP += xp;
  console.log(xp)
  Layer_XPSYSTEM[message.author.id].userTOTAL += xp;

  if(Layer_XPSYSTEM[message.author.id].userXP > Layer_XPSYSTEM[message.author.id].reqXP){
    Layer_XPSYSTEM[message.author.id].userXP -= Layer_XPSYSTEM[message.author.id].reqXP;
    Layer_XPSYSTEM[message.author.id].reqXP += 200; // العدد المطلوب لكل لفل يزيد 200 مثلا لفل 1 مطلوب 250 لفل 2 بكون مطلوب 450 زاد 200
    Layer_XPSYSTEM[message.author.id].userLVL += 1;

    let newlvl = Layer_XPSYSTEM[message.author.id].userLVL;

    message.reply(`Congratulations You leveld up Level **${newlvl}**! 🎉`)// رسالة التقدم بالفل

    fs.writeFile('Layer_XPSYSTEM.json',JSON.stringify(Layer_XPSYSTEM,null,5),err=>{
      console.log(err)
    })
  }

})
client.on('message',message=>{
  if(message.content.startsWith(prefix+'rank')){
    if(!message.channel.guild) return;
    let member = message.mentions.users.first() || message.author;
    if (!Layer_XPSYSTEM[member.id]) {
      Layer_XPSYSTEM[member.id] = {
        userXP: 0,
        userTOTAL: 0,
        reqXP: 200,
        userLVL: 0,
      }
      fs.writeFile('Layer_XPSYSTEM.json',JSON.stringify(Layer_XPSYSTEM,null,5),err=>{
        console.log(err)
      })
    }

let embed = new MessageEmbed()

.setTitle('XP SYSTEM')
.setAuthor(member.username,member.avatarURL({dynamic:true}))
.addField('Level',`${Layer_XPSYSTEM[member.id].userLVL}`,true)
.addField('_ _','_ _',true)
.addField('Total XP',`${Layer_XPSYSTEM[member.id].userTOTAL}`,true)
.addField('User XP',`${Layer_XPSYSTEM[member.id].userXP}/${Layer_XPSYSTEM[member.id].reqXP}`,true)
.addField('_ _','_ _',true)
.addField('Require XP',`${Layer_XPSYSTEM[member.id].reqXP-Layer_XPSYSTEM[member.id].userXP}`,true)

.setFooter(`Requested by ${message.author.username}`,message.author.avatarURL({dynamic:true}))
.setURL(message.author.avatarURL({dynamic:true}))
.setTimestamp()
message.channel.send(embed)
  }
})

//layer copyrights


