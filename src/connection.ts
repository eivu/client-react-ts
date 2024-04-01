export const filesUrl = () => {
  const url = import.meta.env.VITE_EIVU_SERVER_HOST + '/api/v1/files';
  console.log('url', url);
  return url;
}

export const headers = (params:object) => {
  return {
    params,
    headers: {
      'Authorization': 'Bearer ' + import.meta.env.VITE_EIVU_USER_TOKEN
    },
  }
}