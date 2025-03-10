import { useEffect, useState } from 'react';

function useCustomReactQuery(apiCall) {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  
  const fetchData = async () => {
    // console.log('useCustomReactQuery API called');
    try {
      setLoading(true);
      setError('');
      const response = await apiCall();
      setData(response.data);
      console.log('Received Data: ', response.data);
    } catch (error) {
      setError(error.message);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [apiCall]);
  return {
    error,
    data,
    loading,
    refetch: ()=>fetchData(),
  };
}

export default useCustomReactQuery;
