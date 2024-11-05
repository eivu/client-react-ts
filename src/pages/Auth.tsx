import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../layout/DefaultLayout';


export const AuthPage: React.FC = () => {
  return (
    <DefaultLayout>
      <ContentHeader>
        ::Auth
      </ContentHeader>

      <ContentContainer>
<div className="no-scrollbar overflow-y-auto py-20">
          <div className="mx-auto w-full max-w-[480px]">
            <div className="text-center">


              <div className="rounded-xl bg-white p-4 shadow-14 dark:bg-boxdark lg:p-7.5 xl:p-12.5">
                <h1 className="mb-2.5 text-3xl font-black leading-[48px] text-black dark:text-white">
                  Verify Your Account
                </h1>

                <p className="mb-7.5 font-medium">
                  Enter the 6 digit code sent to the registered email id.
                </p>

                <form>
                  <div className="flex items-center gap-4.5">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-3 text-center text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    ))}
                  </div>

                  <p className="mb-5 mt-4 text-left font-medium text-black dark:text-white">
                    Did not receive a code?
                    <button className="text-primary">Resend</button>
                  </p>

                  <button className="flex w-full justify-center rounded-md bg-primary p-[13px] font-bold text-gray hover:bg-opacity-90">
                    Verify
                  </button>

                  <span className="mt-5 block text-red">
                    Don’t share the verification code with anyone!
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </DefaultLayout>
  );
};