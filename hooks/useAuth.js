import axios from 'axios';
import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

export const login = (params) => axios.post('/api/auth/login', params);

export const register = (params) => axios.post('/api/auth/register', params);

const logout = async (mutate) => {
  try {
    await axios.post('/api/auth/logout');
    mutate();
  } catch (error) {
    console.log(error);
  }
}

const fetcher = url => axios.get(url).then(({ data }) => data);

export default function useAuth ({redirectTo=false, redirectIfFound=false} = {}) {
  const { data: user, error, mutate } = useSWR('/api/auth/me', fetcher);

  useEffect(()=> {
    if (error && redirectTo && !redirectIfFound) {
      Router.push(redirectTo);
    }

    if (user && redirectIfFound) {
      Router.push(redirectTo);
    }
  }, [user, error, redirectTo]);

  return {
    user,
    loading: !user && !error,
    logout: () => logout(mutate)
  }
}