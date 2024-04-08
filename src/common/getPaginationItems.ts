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


// function getPaginationItems(currentPage: number, lastPage: number, maxLength: number): (number | NaN)[] {
//     // If the total number of pages is less than or equal to maxLength, return the complete range
//     if (lastPage <= maxLength) {
//         return Array.from({ length: lastPage }, (_, i) => i + 1);
//     }

//     // Calculate half length used for distributing numbers before and after the current page
//     const halfLength = Math.floor((maxLength - 3) / 2);
//     let pages: (number | NaN)[] = [];

//     if (currentPage <= halfLength + 2) {
//         // Current page is near the start
//         pages = [...Array.from({ length: maxLength - 3 }, (_, i) => i + 1), NaN, lastPage - 1, lastPage];
//     } else if (currentPage >= lastPage - halfLength - 1) {
//         // Current page is near the end
//         pages = [1, 2, NaN, ...Array.from({ length: maxLength - 3 }, (_, i) => lastPage - (maxLength - 3) + i)];
//     } else {
//         // Current page is somewhere in the middle
//         pages = [1, 2, NaN, 
//                  ...Array.from({ length: maxLength - 6 }, (_, i) => currentPage - halfLength + 1 + i),
//                  NaN, lastPage - 1, lastPage];
//     }

//     // Adjust for cases where currentPage is directly next to the NaNs, to avoid having NaNs unnecessarily
//     if (pages[pages.indexOf(NaN) - 1] === pages[pages.indexOf(NaN) + 1] - 2) {
//         pages[pages.indexOf(NaN)] = currentPage - 1;
//     }
//     if (pages.lastIndexOf(NaN) !== pages.indexOf(NaN) && pages[pages.lastIndexOf(NaN) + 1] === pages[pages.lastIndexOf(NaN) - 1] + 2) {
//         pages[pages.lastIndexOf(NaN)] = currentPage + 1;
//     }

//     return pages;
// }


// function getPaginationItems(currentPage: number, lastPage: number, maxLength: number): (number | NaN)[] {
//     // Calculate half of the maxLength around the current page
//     const halfMax = Math.floor(maxLength / 2);

//     let startPage = Math.max(currentPage - halfMax, 1);
//     let endPage = Math.min(currentPage + halfMax, lastPage);

//     // Adjust start and end if near the beginning or end
//     if (currentPage - halfMax < 1) {
//         endPage = Math.min(endPage + (1 - (currentPage - halfMax)), lastPage);
//     } else if (currentPage + halfMax > lastPage) {
//         startPage = Math.max(startPage - (currentPage + halfMax - lastPage), 1);
//     }

//     const paginationItems: (number | NaN)[] = [];

//     if (lastPage <= maxLength) {
//         // If all pages fit within maxLength, just list them all
//         for (let i = 1; i <= lastPage; i++) {
//             paginationItems.push(i);
//         }
//     } else {
//         // Handle case where we need to insert NaN to represent skipped sections
//         if (startPage > 1) paginationItems.push(NaN); // Before startPage
//         for (let i = startPage; i <= endPage; i++) {
//             paginationItems.push(i);
//         }
//         if (endPage < lastPage) paginationItems.push(NaN); // After endPage
//     }

//     // Adjust the array to ensure its length does not exceed maxLength
//     // This is a simplification, for more complex scenarios, you might need to insert NaNs intelligently
//     return paginationItems.slice(0, maxLength);
// }


// function getPaginationItems(currentPage: number, lastPage: number, maxLength: number): (number | string)[] {
//   // If the total number of pages is less than or equal to maxLength, return the full range
//   if (lastPage <= maxLength) {
//     return Array.from({ length: lastPage }, (_, i) => i + 1);
//   }

//   const sideItems = Math.floor(maxLength / 2);
//   let pages: (number | string)[] = [];

//   if (currentPage <= sideItems + 1) {
//     // If the current page is among the first pages
//     pages = [...Array.from({ length: maxLength - 2 }, (_, i) => i + 1), '...', lastPage];
//   } else if (currentPage >= lastPage - sideItems) {
//     // If the current page is among the last pages
//     pages = [1, '...', ...Array.from({ length: maxLength - 2 }, (_, i) => lastPage - maxLength + i + 2)];
//   } else {
//     // For pages in the middle
//     pages = [1, '...', ...Array.from({ length: maxLength - 4 }, (_, i) => currentPage - sideItems + i + 2), '...', lastPage];
//   }

//   // Ensure the current page is always shown when it's supposed to replace an ellipsis
//   if (pages.includes('...')) {
//     const currentIndex = pages.indexOf(currentPage);
//     if (currentIndex > -1 && pages[currentIndex - 1] === '...' && pages[currentIndex + 1] === '...') {
//       pages[currentIndex - 1] = currentPage - 1;
//       pages[currentIndex + 1] = currentPage + 1;
//     }
//   }

//   return pages;
// }

export default getPaginationItems;