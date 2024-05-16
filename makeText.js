/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const process = require('process')
const markov = require('./markov');

function generateText(text) {
    let newMarkov = new markov.MarkovMachine(text);
    console.log(newMarkov.makeText());
}
//Read from a file
function makeText(path) {
    fs.readFile(path, 'utf8', function cb(err, data) {
        if(err) {
            console.log(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

//read from url
async function makeUrlText(url) {
    let res;

    try {
        res = await axios.get(url);
    } catch(err) {
        console.log(`Cannot read Url: ${url}: ${err}`)
    }
    generateText(res.data)
}

//read inputs from the command line
let [method, path] = process.argv.slice(2);

if(method === 'file') {
    makeText(path);
}
else if(method === 'url') {
    makeUrlText(path);
} else {
    console.log(`Unknown method: ${method}`);
    process.exit(1);
}