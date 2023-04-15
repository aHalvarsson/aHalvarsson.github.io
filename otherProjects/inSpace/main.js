
const spaceAdjectives = [
    "celestial",
    "interstellar",
    "extraterrestrial",
    "cosmic",
    "astronomical",
    "galactic",
    "stellar",
    "planetary",
    "lunar",
    "solar",
    "nebulous",
    "cometary",
    "meteoric",
    "orbital",
    "gravitational",
    "telescopic",
    "radioactive",
    "infinite",
    "expansive",
    "vast",
    "distant",
    "alien",
    "unexplored",
    "mysterious",
    "supernatural",
    "boundless",
    "enigmatic",
    "ethereal",
    "otherworldly",
    "weightless"
];

const adjectives = [
    'good',
    'new',
    'first',
    'last',
    'long',
    'great',
    'little',
    'own',
    'other',
    'old',
    'right',
    'big',
    'high',
    'different',
    'small',
    'large',
    'next',
    'early',
    'young',
    'important',
    'few',
    'public',
    'bad',
    'same',
    'able',
    'happy',
    'brave',
    'calm',
    'eager',
    'jolly'
];

  const spaceVerbs = [
    "orbit",
    "explore",
    "launch",
    "land",
    "observe",
    "discover",
    "navigate",
    "transmit",
    "rotate",
    "revolve",
    "gravitate",
    "collide",
    "accelerate",
    "propel",
    "ascend",
    "descend",
    "float",
    "gaze",
    "calculate",
    "measure",
    "investigate",
    "analyze",
    "survey",
    "hypothesize",
    "experiment",
    "simulate",
    "synthesize",
    "determine",
    "classify",
    "document"
];

const spaceNouns = [
    "universe",
    "galaxy",
    "star",
    "planet",
    "moon",
    "asteroid",
    "comet",
    "meteor",
    "nebula",
    "black hole",
    "supernova",
    "constellation",
    "pulsar",
    "quasar",
    "white dwarf",
    "gravity",
    "spacecraft",
    "telescope",
    "satellite",
    "orbit",
    "eclipse",
    "solar system",
    "cosmic rays",
    "dark matter",
    "dark energy",
    "exoplanet",
    "light-year",
    "astronaut",
    "space station",
    "milky way"
];

const prepositions = [
    "aboard",
    "about",
    "above",
    "across",
    "after",
    "against",
    "along",
    "amid",
    "among",
    "around",
    "as",
    "at",
    "before",
    "behind",
    "below",
    "beneath",
    "beside",
    "between",
    "beyond",
    "by",
    "down",
    "during",
    "except",
    "for",
    "from",
    "in",
    "inside",
    "into",
    "like",
    "near"
];

const modalVerbs = [
    'can',
    'could',
    'may',
    'might',
    'must',
    'mustnt',
    'should',
    'ought to',
    'shall',
    'will',
    'gonna'
];

const verbs = [
    'be',
    'have',
    'do',
    'say',
    'go',
    'get',
    'make',
    'know',
    'think',
    'take',
    'see',
    'come',
    'hear',
    'look',
    'use',
    'find',
    'give',
    'tell',
    'work',
    'call',
    'try',
    'ask',
    'need',
    'feel',
    'become',
    'leave',
    'put',
    'mean',
    'keep',
    'let'
];

const inSpace = [
    'Obi One Kenobi',
    'Bender',
    'Darth Vader',
    'anybody',
    'anyone',
    'anything',
    'both',
    'each',
    'either',
    'everybody',
    'everyone',
    'everything',
    'few',
    'many',
    'neither',
    'nobody',
    'none',
    'no one',
    'one',
    'other',
    'several',
    'some',
    'somebody',
    'someone',
    'something',
    'such',
    'Steve',
    'monkeys',
    'Spacepigs',
    'Aliens'];

const aThe = [
    'a',
    'the'
];
    
        
const nestedSpaceArray = [
    inSpace,
    modalVerbs,
    spaceVerbs,
    aThe,
    spaceAdjectives,
    spaceNouns,
    prepositions,
    aThe,
    adjectives,
    spaceNouns, 
];


const spaceMessage = () => {

    let randomSpace = ['In space'];
    for(let i = 0; i < 10; i++){
        let activeArray = nestedSpaceArray[i].length;
        let radomNum = Math.floor(Math.random() * activeArray);
        randomSpace.push(nestedSpaceArray[i][radomNum]);
    }
    let spaceString = randomSpace.join(' ');
    console.log(spaceString);

}

spaceMessage();