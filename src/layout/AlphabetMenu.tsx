import { Link } from 'react-router-dom';


const alphabet:string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export type AlphabetMenuProps = {
  activeLetter: string;
  collection: string;
  handleLetterChange: (letter: string) => void;
};




export function AlphabetMenuVertical({
  collection,
  activeLetter,
  handleLetterChange,
}:AlphabetMenuProps): JSX.Element {

  function handleLetterSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const letter = e.target.value;
    handleLetterChange(letter);
  }

  return(
    <div id="alphabet-menu-vertical">
      Letter:
      <select onChange={handleLetterSelect} defaultValue={activeLetter}>
        <option value="">All</option>
        <option value="#">#</option>
        { alphabet.map((letter, index) => (
          <option key={`vert-${index}`} value={letter}>{letter}</option>
        ))}
      </select>
    </div>
  )
}

export function AlphabetMenuHorizontal({
  collection,
  activeLetter,
  handleLetterChange,
}:AlphabetMenuProps): JSX.Element {
  return (
    <table id="alphabet-menu-horizontal" className="w-full align-middle">
      <tbody>
        <tr>
           <td className="px-2 py-1">
            {
              activeLetter === '' ? (
                <div className='text-xl'>
                  All
                </div>
              ) : (
                <Link to="#" onClick={()=>{handleLetterChange('')}} className="text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary-dark">
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
                <Link to="#" onClick={()=>{handleLetterChange('#')}} className="text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary-dark">
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
                // <Link to={{ pathname: '/my-route', hash: { param1: 'value1', param2: 'value2' } }} onClick={()=>{handleLetterChange(letter)}} className="text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary-dark">

                <Link to="#" onClick={()=>{handleLetterChange(letter)}} className="text-sm text-black dark:text-white hover:text-primary dark:hover:text-primary-dark">
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


export function AlphabetMenu({
  collection,
  activeLetter,
  handleLetterChange,
}:AlphabetMenuProps): JSX.Element {
  return(
    <>
      <AlphabetMenuVertical activeLetter={activeLetter} collection="files" handleLetterChange={handleLetterChange} />
      <AlphabetMenuHorizontal activeLetter={activeLetter} collection="files" handleLetterChange={handleLetterChange} />
    </>
  )
}