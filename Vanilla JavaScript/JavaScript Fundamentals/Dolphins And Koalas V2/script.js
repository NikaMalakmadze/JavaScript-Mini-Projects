
//create a arrow function that will return average points of each team
//  it needs 3 scores as an arguments
//
//     name           parameters of function
const averageCalculator = (a, b, c) => (a+b+c) / 3         //   <---    value it will return

//calculate average points of each team using that arrow function 
const DolphinsTeamAverage = averageCalculator(85, 54, 41);
const KoalasTeamAverage = averageCalculator(23, 34, 27);

//function that determinates winner team
//team is winner if it has at least 2 times more score then another team
//  it needs average points of two teams as an arguments
//
//       name                 parameters of function
const checkWinner = function (TeamDolpins, TeamKoalas) {
    //statement that checks if dolphins are winners
    if (TeamDolpins >= TeamKoalas * 2) {
        console.log(`Dolphins win (${TeamDolpins} vs. ${TeamKoalas})`);
    } 
    //statement that checks if koalas are winners
    else if (TeamKoalas >= TeamDolpins * 2) {
        console.log(`Koalas win (${TeamKoalas} vs. ${TeamDolpins})`);
    }
    //else no team wins
    else {
        console.log('No Winner!');
    }
}

//call function to find out the winner
checkWinner(DolphinsTeamAverage, KoalasTeamAverage);