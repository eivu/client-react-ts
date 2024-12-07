import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '../layout/DefaultLayout';
import { useAppContext } from '../store/AppContext';
import { revokeAccess } from '../services/auth.service';

export const RevokePage: FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();

  useEffect(() => {
    revokeAccess();
    dispatch({ type: 'clearSecureExpiresAt' });
    navigate('/files');
  }, []);
  return (
    <DefaultLayout>
      <ContentHeader>
        ::Losing secure Access
      </ContentHeader>
      <ContentContainer>
        you know how to get it back
      </ContentContainer>
    </DefaultLayout>
  );
};