import {Container, Box, Button} from '@material-ui/core';
import QList from 'components/Qlist';
import { useIntl, FormattedMessage } from 'react-intl';
import { MainLayout } from 'layouts';
import axios from 'axios';
import { usePosts } from 'hooks/usePosts';

export default function Home() {
  const { formatMessage } = useIntl();
  const { data, error, loading } = usePosts({});

  return (
    <MainLayout>
      <QList questions={data?.items || []}/>
    </MainLayout>
  )
}
