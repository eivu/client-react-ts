import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, FC, FormEvent } from 'react';
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { AlertError } from '@src/components/AlertError';
import DefaultLayout, { ContentHeader, ContentContainer } from '@src/layout/DefaultLayout';
import { login, getCurrentUser } from '@src/services/auth.service';

export const Login: FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [credentials, setCredentials] = useState<{ email: string, password: string }>(
    {
      email: '',
      password: ''
    }
  );

  useEffect(() => {
    if (getCurrentUser())
      navigate("/files");
  },[])



  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (credentials.email !== "" && credentials.password !== "") {
      login(credentials.email, credentials.password).then(
        () => {
          navigate("/files");
          window.location.reload();
        }).catch((error) => {
          console.log(error);
          setError(error.response.data.error);
        });
    } else {
      setError("please provide a valid input");
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <DefaultLayout>
      <ContentHeader>
        ::Login
      </ContentHeader>
      <ContentContainer>
        { error && <AlertError message={error} />}
        <div className="no-scrollbar overflow-y-auto pb-20">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Welcome
              </h2>

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={handleInput}
                   />
                    <span className="absolute right-4 top-4">
                      <MdOutlineMailOutline size="22" className="login-field-icon" />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={handleInput}
                    />

                    <span className="absolute right-4 top-4">
                      <MdLockOutline size="22" className="login-field-icon" />
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Don't have any account?{' '}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ContentContainer>
    </DefaultLayout>
  );
};