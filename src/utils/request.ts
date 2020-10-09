import { message } from 'antd';
import axios, { AxiosPromise } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { getToken } from './auth';

interface UseAxiosProps {
  method?: 'get' | 'post' | 'put' | 'delete';
  api?: string
  data?: any
}

interface RequestInfo {
  loading: boolean
  error: any
  refetch: (data?: any) => void
}

export function useFetch(props: UseAxiosProps): [any, RequestInfo] {
  const { method, api = "", data } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [res, setRes] = useState<any>();

  const fetchData = useCallback((fetchData?: any) => {
    setLoading(true);
    setError(undefined);
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL + api}`,
      method,
      data: fetchData || data,
      headers: {
        token: `Bearer ${getToken()}`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [res, { loading, error, refetch: fetchData }]
}

export function useLazyFetch(props: UseAxiosProps): [any, RequestInfo] {
  const { method, api="", data } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [res, setRes] = useState<any>();

  const fetchData = (fetchData: any) => {
    setLoading(true);
    setError(undefined);
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL + api}`,
      method,
      data: fetchData || data,
      headers: {
        token: `Bearer ${getToken()}`,
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
  }

  return [res, { loading, error, refetch: fetchData }]
}

export function useMutation(props: UseAxiosProps): (data: UseAxiosProps) => AxiosPromise{
  const { method, api, data } = props;

  const fetchData = (fetchProps: UseAxiosProps = {}) => {
    const fetchApi = fetchProps.api || api || "";
    return axios({
      url: `${process.env.REACT_APP_BACKEND_URL + fetchApi}`,
      method,
      data: fetchProps.data || data,
      headers: {
        token: `Bearer ${getToken()}`,
      },
    })
  };

  return fetchData
}

export function handleRequestError(error: any){
  message.error(`Error: ${error?.response?.data}`)
}