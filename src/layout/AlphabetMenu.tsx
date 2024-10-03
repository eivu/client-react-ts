import { Link } from 'react-router-dom';





export type AlphabetMenuProps = {
  collection: String;
  handleLetterChange: (letter: string) => void;
};

// export function PaginationMenu({
//   pageNum,
//   totalPages,
//   handlePageChange,
//   size,
//   // previousPage,
//   // nextPage,
//   // canPreviousPage,
//   // canNextPage,
// }:PaginationMenuProps): JSX.Element {


export function AlphabetMenu({
  collection,
  handleLetterChange,
}:AlphabetMenuProps): JSX.Element {
  const alphabet:string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  return (
    <table id="alphabet-menu" className="w-full">
      <tbody>
        <tr>
           <td className="px-2 py-1">
            <Link to="#" onClick={()=>{handleLetterChange('')}} className="text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary-dark">
              All
            </Link>
          </td>
          <td className="px-2 py-1">
            <Link to={`/${collection}?letter=#`} className="text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary-dark">
              #
            </Link>
          </td>
          {alphabet.map((letter, index) => (
            <td key={index} className="px-2 py-1">
              <Link to="#" onClick={()=>{handleLetterChange(letter)}} className="text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary-dark">
                {letter}
              </Link>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}