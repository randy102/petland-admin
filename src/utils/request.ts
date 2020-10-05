import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { getToken } from './auth';

interface UseAxiosProps {
  method?: 'get' | 'post' | 'put' | 'delete';
  api: string
  data?: any
}

export function useAxios(props: UseAxiosProps) {
  const { method, api, data } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [res, setRes] = useState<any>();

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(undefined);
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/${api}`,
      method,
      data,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((response) => {
      setRes(response);
    })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false);
      })
  }, [method, api, data]);

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [res, { loading, error, refetch: fetchData }]
}