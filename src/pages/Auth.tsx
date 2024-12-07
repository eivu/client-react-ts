import { FC, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertError } from '../components/AlertError';
import { ACTIVE_DEBUGGING } from '../constants';
import { submit2Fa, getSecureAccessExpiresAt } from '../services/auth.service';
import DefaultLayout, { ContentHeader, ContentContainer } from '../layout/DefaultLayout';


export const AuthPage: FC = () => {
  const navigate = useNavigate();
  const [codeArray, setCodeArray] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState<string>('');
  const [formSubmittedAt, setFormSubmittedAt] = useState<number>(0);
  const inputRefsArray = useRef<(HTMLInputElement[] | null)>([])

  useEffect(() => {
    if (inputRefsArray.current) {
      inputRefsArray.current[0]?.focus();
    }
  },[])

  useEffect(() => {
    formSubmittedAt !== 0 &&
      submit2Fa(
        codeArray.join('')
      ).then(() => {
        console.log("verified");
        console.log('expires at', getSecureAccessExpiresAt());
      }
      ).catch((error) => {
        setError(error.response.data.error);
        ACTIVE_DEBUGGING && console.log(error);
      })
  }, [formSubmittedAt])
  

  function set2faInputs(index:number, newValue:string):void {
    // Make a copy of the current array but with the updated value
    const updatedInputs = codeArray.map((origValue, i) => {
      if (i === index) {
        // Increment the clicked counter
        return newValue;
      } else {
        // The rest haven't changed
        return origValue;
      }
    });
    setCodeArray(updatedInputs);
  }

  return (
    <DefaultLayout>
      <ContentHeader>
        ::Auth
      </ContentHeader>

      <ContentContainer>
        { error && <AlertError message={error} />}
        <div className="no-scrollbar overflow-y-auto py-20">
          <div className="mx-auto w-full max-w-[480px]">
            <div className="text-center">
              <div className="rounded-xl bg-white p-4 shadow-14 dark:bg-boxdark lg:p-7.5 xl:p-12.5">
                <h1 className="mb-2.5 text-3xl font-black leading-[48px] text-black dark:text-white">
                  Verify Your Account
                </h1>

                <p className="mb-7.5 font-medium">
                  Enter the 6 digit 2FA code.
                </p>

                <form onSubmit={() => setFormSubmittedAt(Date.now())}>
                  <div className="flex items-center gap-4.5">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <input
                        key={index}
                        ref={(element) => {
                          if (element && inputRefsArray.current) {
                            inputRefsArray.current[index] = element;
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const clipboard = e.clipboardData.getData('text/plain');
                          const snippetArray = clipboard.substring(0, 6).split('');
                          setCodeArray(snippetArray);
                          setFormSubmittedAt(Date.now())
                        }}
                        maxLength={1}
                        value={codeArray[index]}
                        onChange={(element) => {
                          set2faInputs(index, element.target.value)
                          // verify the useRef is not null
                          if (inputRefsArray.current) {
                            // skip to the next input field if the index is less than 5
                            if (index < 5 ) {
                              inputRefsArray.current[index + 1 ].value = '';
                              inputRefsArray.current[index + 1 ]?.focus();
                            }
                            // if the index is 5, submit the form
                            else
                              setFormSubmittedAt(Date.now())
                          }
                        }
                        }
                        type="text"
                        className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-3 text-center text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    ))}
                  </div>

                  <button className="mt-10 flex w-full justify-center rounded-md bg-primary p-[13px] font-bold text-gray hover:bg-opacity-90">
                    Verify
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </DefaultLayout>
  );
};