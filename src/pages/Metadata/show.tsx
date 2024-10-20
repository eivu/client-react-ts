import { FC, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../../layout/DefaultLayout';
import api from '../../configs/api';
import { Metadatum } from '../../types/metadatum';

const MetadatumPage: FC = () => {
  const medatatumId = useLoaderData();
  const [loading, setLoading] = useState<boolean>(true);
  const [metadatum, setMetadatum] = useState<Metadatum>();
  const [responseError, setResponseError] = useState<string>('');

  useEffect(() => {
    api.get(`/metadata/${medatatumId}/cloud_files`, {
      params: { category: null, delicate: false }}
    ).then((response) => {
      console.log(response.data)
      setMetadatum(response.data.metadatum);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setResponseError(error.message);
      console.log(responseError)
    })
  },[])
  return (
    <DefaultLayout>
      Trash goes here
    </DefaultLayout>
  );
};

export default MetadatumPage;
