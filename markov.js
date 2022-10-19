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
    for (let i = 0; i < this.words.length; i += 1){
      let currWord = this.words[i];
      let nextWord = this.words[i + 1] || null;
      if(chains.has(currWord))
        chains.get(currWord).push(nextWord)
      else chains.set(currWord, [nextWord])
      }
      this.chains = chains
  
    }

  /** return random text from chains */
  static choice(list){
    let randIdx = Math.floor(Math.random() * list.length)
    return list[randIdx]
  }

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(" ");
  }
}

// let mm = new MarkovMachine("the cat in the hat");
// console.log(mm.makeText())

module.exports = {
  MarkovMachine,
};