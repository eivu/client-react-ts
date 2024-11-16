import api from './api';


export const login = (email: string, password: string) => {
  return api
    .post('sessions',
      { email, password }
    ).then((response) => {
      console.log(response);
      // if (response.data.accessToken) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }
      return response
    });
}