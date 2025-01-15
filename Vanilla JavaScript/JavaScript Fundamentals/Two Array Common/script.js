
arrFirst = [1, 3, 5, 7];

arrSecond = [4, 6, 7, 2, 3];

//return elements that are in both arrays
// filter every element in arr1 with condition if it is in arr2
const CommonElement = function(arr1, arr2) {
    return arr1.filter(element => arr2.includes(element))
}

console.log(CommonElement(arrFirst, arrSecond));