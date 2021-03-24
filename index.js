const config = require("./config.json");

const Channel = ""; // Your channel's username

const Vimm = require("vimm-chat-lib");
const tmi = require('tmi.js');
const chalk = require('chalk');
const clear = require('clear');

const ttvclient = new tmi.Client({
    options: {
        debug: false
    },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: config.twitch.username,
        password: config.twitch.oauth
    },
    channels: config.twitch.channel
});

const chat = new Vimm.VimmChat({
	
	debug: false // Outputs heartbeat logs if true.
	
})

console.log(`
${chalk.grey('--------------------------------------------------')}
${chalk.yellow('              Welcome to VimmTV to Twitch BOT ')}
${chalk.green('          This where Relay from VimmTV to Discord')}
${chalk.green('       BOT is Open source but not allowed steal CODES')}
${chalk.green(' All codes been made Copyrighted and Writen by ChisdealHDYT')}
${chalk.green('       Make sure Like this Project and Fork it if want.')}
${chalk.green('       Check BOT Creaotr Socials Below for Updates')}
${chalk.grey('--------------------------------------------------')}
`);

    console.log(`
${chalk.grey('--------------------------------------------------')}
${chalk.yellow('                   Creator Of BOT ')}
${chalk.green('            Username: ') + 'ChisdealHDYT#7172'}
${chalk.green('         Discord Link: ') + 'discord.gg/RYscPHc'}
${chalk.green('          Twitch: ') + 'twitch.tv/chisdealhdyt'}
${chalk.green('           VimmTV: ') + 'vimm.tv/chisdealhd'}
${chalk.green('         YouTube: ') + 'youtube.com/chisdealhd'}
${chalk.green('         Twitter: ') + 'twitter.com/chisdealhd'}
${chalk.grey('--------------------------------------------------')}
`);

ttvclient.connect();
 
ttvclient.on('connected', (address, port) => {
 
	console.log("Connected to Twitch IRC");
  
	function Connect(){
		
		chat.connect(config.vimmtv.connect).then(meta => {
		
			chat.on("message", msg => {
			
				//console.log(msg)
			
				ttvclient.say(config.twitch.channelusername, `[VIMM] ${msg.chatter}: ${msg.message}`);
			
			
					/*if(msg.message == "!close"){
						chat.close() // This !close command will turn the bot off
					}*/
			     
      
			})
				
			chat.on("close", event => {
				
				console.log(event)
				
				//if(event == 1005){ // Uncomment these lines if you want to test out the reconnect function with !close command.
				
					//	chat.connect(Channel) 
					
				//}
				
				if(event == 1006){
					
					chat.connect(config.vimmtv.connect) // If Abnormal disconnect (1006), Glimesh Bot reconnects.
					
				}
			})
   
			ttvclient.on('message', (channel, tags, message, self) => {
        
				if (self) return;
            
				//chat.sendMessage(`[TWITCH] ${tags.username}: ${message}`);
        
			});
		
		})
  
	}

	Connect();
	
});