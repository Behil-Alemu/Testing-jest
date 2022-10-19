/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
  }

function makeText(path){
    fs.readFile(path, "utf8", function(err, file) {
      if (err) {
        console.error("You done messed up",err);
        process.exit(1);
      }else{
        generateText(file);  
      }
    });
    }

async function webUrl(url){
        try {
        let result = await axios.get(url) 
        console.log(result.data)
        }catch (error) {
            console.error(`You done messed up, URL ${url} not found`,error);
            process.exit(1);
        }
    
    }
let path = process.argv[2]
if (path.slice(0,4) === "http"){
    webUrl(process.argv[2])
}else{
    makeText(process.argv[2])
}