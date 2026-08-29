function makeAcro(str) {

    let split = str.split(' ');

    let myAcronym = [];

    split.forEach(word => {
        
        myAcronym.push(word[0]);
        
    });

    const finalAcronym = myAcronym.join("");

    return finalAcronym;

}

module.exports = { makeAcro };