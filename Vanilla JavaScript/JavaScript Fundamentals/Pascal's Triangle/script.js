
// get size of Pascal's triangle from user (length of rows)

const size = parseInt(prompt("Please Enter size of Pascal's triange (length of rows): "));

// arrow function that generates pascal's triangle as a 2D array
//  it needs length of rows of trianlge as an argumnet
const pascalTriangleGenerator = (n) => {
    // create starting array with a 'top' of triangle
    const triange = [[1]]

    // start looping from second row until it reaches max length of rows
    for (let i = 1; i < n; i++) {
        // create rows array
        const row = []

        // loop through elements of row, from 0 element to rows 'Nomer'
        for (let j = 0; j <= i; j++) {

            // if its first or last element in row, add 1 in row array
            if ( j === 0 || j === i ) {
                row.push(1);
            }
            else {
                // else add sum of element's two upper nearby neighbours
                row.push(triange[i - 1][j - 1] + triange[i - 1][j]);
            }
        }
        // add row to the 2D array
        triange.push(row);
    }

    // return 2D array
    return triange
}

// generate and save Pascal's triangle in variable
const pascalTriangle = pascalTriangleGenerator(size);

// iterate through each row of triangle
pascalTriangle.forEach((row) => {
    // log row's elements on console
    console.log(row.join(' ')); 
})