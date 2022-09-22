import {useEffect} from 'react';
import axios, {CancelToken} from 'axios';
interface functionProps {
  cancelToken: CancelToken;
}
export const useCancelRequest = (
  handleFunction: (headers: functionProps) => void,
  callBackCancel?: () => void,
) => {
  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    const newHeaders: functionProps = {
      cancelToken: ourRequest.token,
    };
    const fetchPost = async () => handleFunction(newHeaders);
    fetchPost();

    return () => {
      ourRequest.cancel();
      callBackCancel?.();
    };
  }, [handleFunction]);
};
