const nodemailer = require("nodemailer");
const {email, password} = require("/Users/ananyasaxena/Hackathon_1(leetcode project)/mailconfig.js");
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");


var message;
let streaming_platform = ["PRIME VIDEO", "NETFLIX", "HOTSTAR", "MX PLAYER", "JIO CINEMA", "SONY LIV", "EROS NOW", "VOOT"];
  
mailFunctn(streaming_platform);


function mailFunctn(streaming_platform){
    
    let count = 0;
    cron.schedule("1-10 * * * * *", () => {

        if( count < 10 ){
            message = [];
            streaming_platform.forEach(streaming_platformname => {
        
                let data = fs.readFileSync(path.join(__dirname,streaming_platformname, streaming_platformname +".json"));
                let dataJSON = JSON.parse(data);
                
                message.push({
                    rating: dataJSON[count].rating,
                    Movie_name : dataJSON[count].Movie_name,
                    watch_link : dataJSON[count].watch_link,
                    trailerlink : dataJSON[count].trailerlink
                })
            });
            let mailMessage = "";
            for(let i = 0 ; i < message.length ; i++){
                mailMessage += `
                IMDB rating of the movie : ${message[i].rating}
                MOVIE_NAME : ${message[i].Movie_name}
                Link of the Movie : ${ message[i].watch_link}
                Link of the Trailer : ${message[i].trailerlink}
                `
            }
            console.log(count);
            console.log(mailMessage);
            console.log("```````````````````````````````````````````````````````````"); 
            /* 
                Set Mail Options
            */
            const mailOptions = {
                from : "ayasaxe16@gmail.com",
                to : "siaananyasaxena16@gmail.com",
                subject : `Get ready for the Movie Night`,
                text : `HOLA AMIGOS!!! Time for you to pick one of the best-rated imdb movies`+ 
                mailMessage +
                `
                Thanks & Regards,
                creativeIMDB
                `
            };

            /* 
                Set Transport configuartion
            */

            const transporter = nodemailer.createTransport(
                {
                    service : "gmail",
                    auth : {
                        user : email,
                        pass : password
                    }
                }
            );
            
            transporter.sendMail(mailOptions, (err, info) => {
                if( err ){
                    console.log(err);
                }else{
                    console.log("Email Send : " + info.response);
                }
            });
            count++;
        }

     });
    
}

module.exports = {
    mailFunctn : mailFunctn
}