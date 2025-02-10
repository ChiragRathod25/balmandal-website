import { useCallback, useEffect, useState } from 'react';

function customReactQuery(apiCall) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await apiCall();
        setData(response.data);
        console.log('Received Data: ', response.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [apiCall]);

  return {
    error,
    data,
    loading,
  };
}

export default customReactQuery;
