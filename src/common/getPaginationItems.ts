function getPaginationItems(currentPage: number, lastPage: number, maxLength: number): (number | NaN)[] {
  if (lastPage <= maxLength) {
    return Array.from({length: lastPage}, (_, i) => i + 1);
  }

  const halfRange = Math.floor(maxLength / 2);
  let pages = [];

  if (currentPage <= halfRange + 1) {
    pages = Array.from({length: maxLength - 3}, (_, i) => i + 1);
    pages.push(NaN, lastPage - 1, lastPage);
  } else if (currentPage >= lastPage - halfRange) {
    pages = [1, 2, NaN];
    pages.push(...Array.from({length: maxLength - 3}, (_, i) => lastPage - (maxLength - 4) + i));
  } else {
    const sides = Math.floor((maxLength - 5) / 2);
    pages = [1, 2, NaN];
    pages.push(...Array.from({length: sides * 2 + 1}, (_, i) => currentPage - sides + i));
    pages.push(NaN, lastPage - 1, lastPage);
  }

  return pages;
}


export default getPaginationItems;

// some of the test cases are incorrect. the true examples are the ones
// that have 12 entries, and those are examples copied from willpaginate
// console.log('[1,5,7] =>',getPaginationItems(1, 5, 7)); // [1, 2, 3, 4, 5]
// console.log('[5,7,7] =>',getPaginationItems(5, 7, 7)); // [1, 2, 3, 4, 5, 6, 7]
// console.log('[1,10,7] =>',getPaginationItems(1, 10, 7)); // [1, 2, 3, NaN, 8, 9, 10]
// console.log('[9,10,7] =>',getPaginationItems(9, 10, 7)); // [1, 2, 3, NaN, 8, 9, 10]
// console.log('[5,10,7] =>',getPaginationItems(5, 10, 7)); // [1, NaN, 4, 5, 6, NaN, 10]
// console.log('[6,10,7] =>',getPaginationItems(6, 10, 7)); // [1, NaN, 5, 6, 7, NaN, 10]
// console.log('[3,10,7] =>',getPaginationItems(3, 10, 7)); // [1, 2, 3, 4, NaN, 9, 10]
// console.log('[4,10,7] =>',getPaginationItems(4, 10, 7)); // [1, 2, 3, 4, 5, NaN, 10]
// console.log('[7,10,7] =>',getPaginationItems(7, 10, 7)); // [1, NaN, 6, 7, 8, 9, 10]
// console.log('[8,10,7] =>',getPaginationItems(8, 10, 7)); // [1, 2, NaN, 7, 8, 9, 10]
// console.log('[8,55,7] =>',getPaginationItems(8, 55, 7)); // [1, 2, NaN, 7, 8, 9, 10]
// console.log('[1,55,7] =>',getPaginationItems(1, 55, 7)); // [1, 2, NaN, 7, 8, 9, 10]
// console.log('[1,100,7] =>',getPaginationItems(1, 100, 7)); // Possible output: [1, 2, NaN, 100]
// console.log('[1,807,12] =>',getPaginationItems(1, 807,12)); // [1,2,3,4,5,6,7,8,9,NaN,806,807]
// console.log('[9,807,12] =>',getPaginationItems(9, 807,12)); // [1,2,5,6,7,8,9,10,11,12,13,NaN,806,807]
// console.log('[109,807,12] =>',getPaginationItems(109, 807,12)); // [1,2,NaN,103,104,105,106,107,108,109,110,111,NaN,806,807]
// console.log('[109,709,12] =>',getPaginationItems(109, 709,12)); // [1,2,NaN,103,104,105,106,107,108,109,110,111,NaN,708,709]
// console.log('[1,2,12] =>',getPaginationItems(1,2,12)); // [1,2]
// console.log('[1,71,12] =>',getPaginationItems(1,71,12)); // [1,2,3,4,5,6,7,8,9,NaN,70,71]
// console.log('[31,71,12] =>',getPaginationItems(31,71,12)); // [1,2,27,28,29,30,31,32,33,34,35,70,71]
// console.log('[1,22,12] =>',getPaginationItems(1,22,12)); //[1,2,3,4,5,6,7,8,9,NaN,21,22]
// console.log('[8,22,12] =>',getPaginationItems(8,22,12)); //[1,2,3,4,5,6,7,8,9,10,11,12,NaN,21,22]
