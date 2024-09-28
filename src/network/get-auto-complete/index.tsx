import {useState} from 'react';
import {apiEndPoints, apiKey} from '@network/constant';
import axios from 'axios';

export default function useAutocomplete() {
  const [resp, setResp] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSearch = async (props: string) => {
    const endPoint = `${apiEndPoints?.getAutocomplete}key=${apiKey}&q=${props}`;
    setLoading(true);
    setError(null);

    console.log(endPoint);
    try {
      const {data} = await axios?.get(endPoint);

      setResp(data);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {data: resp, fetchSearch, loading, error};
}
