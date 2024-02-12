import {useMutation, useQuery} from 'react-query';
import {BASE_BACKEND_URL} from './base';

const fetchLogin = async (mobile: string, password: string) => {
  console.log(mobile, password);
  const headers = new Headers();
  headers.append('content-type', 'application/json');

  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify({mobile, password}),
  };

  const response = await fetch(`${BASE_BACKEND_URL}/api/user/auth/login`, init);
  console.log(`response status is ${response.status}`);

  const data = await response.json();

  console.log(data);
  return data;
};

const fetchLoginManual = async (body: any) => {
  const headers = new Headers();
  headers.append('content-type', 'application/json');

  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  const response = await fetch(`${BASE_BACKEND_URL}/api/user/auth/login`, init);

  const data = await response.json();

  console.log(data);
  return data;
};

const useLogin = (mobile: string, password: string) =>
  useQuery(['user-login', mobile, password], () =>
    fetchLogin(mobile, password),
  );

const useLoginManual = () => {
  return useMutation(fetchLoginManual);
};

export {useLogin, useLoginManual};
