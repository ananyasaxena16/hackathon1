/*  import all the requirements
  - 1. puppeteer for Automation
  - 2. cheerio and request to extract Data
  - 3. To manipulate in File System */

  const puppeteer = require("puppeteer");
  const request = require("request");
  const cheerio = require("cheerio");
  const fs = require("fs");
  const { makeFiles } = require("./makeFiles");
  const { get_movie_details } = require("./get_movie_details");
 const { mailFunctn } = require("./mailFunctn");
  
  let streaming_platform = ["PRIME VIDEO", "NETFLIX", "HOTSTAR", "MX PLAYER", "JIO CINEMA", "SONY LIV", "EROS NOW", "VOOT"];
  
  const link = "https://www.imdb.com/";
  
  
  (async function() {
    try {
  
      const browserInstance = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
      });
  
      let newPage = await browserInstance.newPage();
      await newPage.goto(link);
      await newPage.waitForSelector(".ipc-shoveler", { visible: true });
  
  
      /* Loop Around the Topic Array And run the makeFiles 
      which will make excel files function 
      to get the question name, Link, Level of Difficulty */
      for(let i = 0; i<streaming_platform.length; i++){
       await get_movie_details(".ipc-shoveler",streaming_platform[i], newPage );
      }
  
      mailFunctn(streaming_platform);
      browserInstance.close();
  
    } catch (err) {
      console.log(err);
    }
  })();