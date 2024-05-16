/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    
    let chains = new Map();

    for(let i=0; i<this.words.length;++i){
      let word = this.words[i];
      let next = this.words[i+1];

      if(chains.has(word)) {
        chains.get(word).push(next);
      } else {
        chains.set(word, [next]);
      }
    }
    this.chains = chains

  }

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let markov = [];

    while(markov.length < numWords && key != null) {
      markov.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    return markov.join(" ");
  }
}


//export to be able to use in MakeText
module.exports = {MarkovMachine};