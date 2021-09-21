import axios from 'axios';
import useSWR from 'swr';

const fetcher = url => axios.get(url).then(({ data }) => data?.data);

export function usePosts({ page = 1, sort = -1 }) {
  const url = `/api/post?page=${page}&sort=${sort}`;
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    error,
    loading: !data && !error
  }
}
