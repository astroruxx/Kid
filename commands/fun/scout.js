const Discord = require("discord.js");

let ips = [
  'Russia',
  'Usa',
  'Canada',
  'Africa',
  'United Kingdom',
  'India',
  'Brazil',
  'Ecuador',
  'China',
	'North Korea'
];

let passwords = [
'Oil',
'Lumber',
'SixNine',
'Diamond',
'Keyboard weebs',
'Anime weebs',
'Joe mama',
'Discord.js',
'Banana',
'imposter',
'sussyimposter541'
];


let emails = [
	`sucks@gmail.com`,
	`isdumbdumb@gmail.com`,
	`@yahoo.com`,
  `@isdumb.io`,
	`@noob.com`,
	`idiot@noob.net`,
  `gae@wannabe.com`,
	`hacked@noob.com`,
	`artifical.intelegance@bot.com`,
	`getgood@ha.xyz`,
	`nub.nub@nub.nub`,
	`yes.no@yesnt.exe`,
	`obama@prism.old`,
	`joe@bidome.new`,
	`badpickup@line.tinder`,
  `dogwater@yes.com`
];


let ccis = [
	'5430112115445621',
	'9283109176382620',
	'1384378743864386',
	'2473897583563753',
	'3978564875648756',
	'4878567578565787',
	'8573647365736573',
	'7756542654265426',
	'6789768976789878',
	'6942021360420699',
	'9874899483648346',
	'0876578976374634',
	'7374826537265742',
	'942i758265487562',
	'1432874628746328',
	'9876546789098765',
	'8765678908765467',
	'6784932483724232',
	'7867524725278527',
	'8765456789876545',
	'3647284257425423',
];


let names = [
'Josh',
'Ronald',
'Joe',
'Liam',
'Noah',
'Oliver',
'Henry',
'James',
'Alexander',
'Hugh jass',
'Mike croch',
'Liam',
'Aria',
'Daniel',
'Sebastian',
'Gabriel',
'Jacob',
'Elias',
'Matthew',
'Diamond',
'Peter'
]


module.exports = {
  name: "scout",
  description: "hack a user",
  run: async (client, message, args) => {

 const email = emails[Math.floor(Math.random() * emails.length)];


 const password = passwords[Math.floor(Math.random() * passwords.length)];


 const ip = ips[Math.floor(Math.random() * ips.length)];


const cci = ccis[Math.floor(Math.random() * ccis.length)];


const name = names[Math.floor(Math.random() * names.length)];

  let user = message.mentions.users.first() || message.author;
  if (!user) {
  return message.channel.send("Please mention a user to hack!");
    }


    let text = [

      `**Getting \`${user.username}'s\` real name**`,
      
      `**\`${user.username}'s\` real name : ${name}**`,

		 `**Downloading MONKEY HACKS** `,

      `**Checking \`${user.username}'s\` Discord Account**`,

      `**\`${user.username}'s\` Email : ${user.username}${email}**`,

			`**\`${user.username}'s\` password : ${password}**`,

      ` **\`${user.username}'s\` Ip : ${ip}**`,

			` **Checking \`${user.username}'s\` bank account **`,

      `**\`${user.username}'s\` credit card number : ${cci}**`,

    ];

    let current = 0;
    let count = text.length;
    let editTime = 2000;

    message.channel.send(`**Hacking \`${user.username}\`**`).then ((msg) => {

      let interval = setInterval(() => {

        if (current === count) {
          msg.edit(`**The hack is complete** `);
          clearInterval(interval);
          return;
        }

        let hackMsg = text[current];
        msg.edit(hackMsg);
        current++
 
      }, editTime);
    })
  }
}