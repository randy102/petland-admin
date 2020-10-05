import axios from 'axios';
import { useState, useEffect } from 'react';
import useIsMounted from 'ismounted';
import { getToken } from './auth';

interface UseRequestProps {
  onError?: Function
  onResponse?: Function
  onLoading?: Function 
}

export function useRequest(props: UseRequestProps) {
  const {
    onError = (error: any) => console.log('An error occurred:', error),
    onResponse = (response: any) => response,
    onLoading = () => null,
  } = props;

  const [loading, setLoading] = useState(false);
  const [configs, setConfigs] = useState();

  useEffect(() => {
    onLoading(loading);
  }, [loading, onLoading]);

  // Component is still mounted or not
  const isMounted = useIsMounted();

  async function fetch(fetchConfigs?: any) {
    if (fetchConfigs !== undefined) setConfigs(fetchConfigs);

    if (!fetchConfigs && !configs) {
      throw new Error(
        'Please call fetch for the first time with configs before using refetch.'
      );
    }

    const { method, api, data } = fetchConfigs || configs;

    setLoading(true);

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/${api}`,
        method,
        data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (isMounted.current) {
        onResponse(response);
      }
    } catch (error) {
      if (isMounted.current) {
        onError(error.response?.data || error);
      }
    }

    setLoading(false);
  }

  const refetch = () => fetch();

  return [fetch, { loading, refetch }];
}