import React from 'react';
import axios from 'axios';
import DefaultLayout from '../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';


const Auth: React.FC = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_EIVU_SERVER_HOST + '/api/frontend/v1/auth';
  const handleClick = () => {
    navigate('/files', { replace: true });

    // axios.get(url, {
    //   params: constructParams(sorting),
    //   headers: {
    //     'Authorization': 'Bearer ' + import.meta.env.VITE_EIVU_USER_TOKEN,
    //     'Device-Uuid': cookies.deviceUuid
    //   }})
    //   .then((response) => {
    //     setQueueItems(response.data.cloudFiles);
    //     setMeta(response.data.meta);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     setResponseError(error.message);
    //   });

  };

  return (
    <DefaultLayout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">Eivu::Auth</h2>
      </div>

      <div className="flex flex-col gap-7.5">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-4 sm:p-6 xl:p-9">
            <input
              name='otp_code'
              type="text"
              placeholder="2FA Code"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 my-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <button onClick={handleClick} className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Authorize
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Auth;
