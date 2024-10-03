import { Link } from 'react-router-dom';

export type AlphabetMenuProps = {
  activeLetter: string;
  collection: string;
  handleLetterChange: (letter: string) => void;
};

export function AlphabetMenu({
  collection,
  activeLetter,
  handleLetterChange,
}:AlphabetMenuProps): JSX.Element {
  const alphabet:string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  return (
    <table id="alphabet-menu" className="w-full">
      <tbody>
        <tr>
           <td className="px-2 py-1">
            {
              activeLetter === '' ? (
                <div className='text-xl'>
                  All
                </div>
              ) : (
                <Link to={`/${collection}`} onClick={()=>{handleLetterChange('')}} className="text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary-dark">
                  All
                </Link>
              )
            }
          </td>
          <td className="px-2 py-1">
            {
              activeLetter === '#' ? (
                <div className='text-xl'>
                  #
                </div>
              ) : (
                <Link to={`/${collection}?letter=#`} onClick={()=>{handleLetterChange('#')}} className="text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary-dark">
                  #
                </Link>
              )
            }
          </td>
          {alphabet.map((letter, index) => (
            <td key={index} className="px-2 py-1">
              {
              activeLetter === letter ? (
                <div className='text-xl'>
                  {letter}
                </div>
              ) : (
                <Link to={`/${collection}?letter=${letter}`} onClick={()=>{handleLetterChange(letter)}} className="text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary-dark">
                  {letter}
                </Link>
              )
            }
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}
