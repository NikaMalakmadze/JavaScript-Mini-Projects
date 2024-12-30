
//find out average score of each team
const DolphinsTeamAverage = (97 + 112 + 101) / 3
const KoalasTeamAverage = (109 + 95 + 123) / 3

//minimum score to win is 100 points
// so check if any of team has at least this amount of points
// || means OR
if (DolphinsTeamAverage >= 100 || KoalasTeamAverage >= 100){                //if any team have at least 100 points

    if (DolphinsTeamAverage > KoalasTeamAverage){                               //if dolphins have more
        console.log('Dolphins Team wins a Trophy!')                                 //they win!
    }
    else if (KoalasTeamAverage > DolphinsTeamAverage){                          //if koalas have more
        console.log('Koalas Team wins a Trophy!')                                   //they win!
    }
    else{                                                                       //else
        console.log('Draw!')                                                        //it's draw!
    }
}
else{                                                                       //if no team have at least 100 points
    console.log('No Teams Win Trophy!')                                         // no team wins trophy!
}
