import QList from 'components/QList';
import { useIntl } from 'react-intl';
import { MainLayout } from 'layouts';
import { usePosts } from 'hooks/usePosts';

export default function Home() {
  const { formatMessage } = useIntl();
  const { data } = usePosts({});

  return (
    <MainLayout>
      <QList questions={data?.items || []}/>
    </MainLayout>
  )
}
