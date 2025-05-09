import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout, { ContentHeader, ContentContainer } from '@src/layout/DefaultLayout';
import { logout } from '@src/services/auth.service';

export const LogoutPage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/home');
  }, []);
  return (
    <DefaultLayout>
      <ContentHeader>
        ::Logging out
      </ContentHeader>

      <ContentContainer>
        bye bye now
      </ContentContainer>
    </DefaultLayout>
  );
};