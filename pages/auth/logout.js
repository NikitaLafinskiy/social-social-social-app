import { useEffect } from 'react';
import axios from 'axios';
import router from 'next/router';

export default function Logout() {
  console.log('logot');
  const num = 1;
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/logout`,
      withCredentials: true,
    }).then(() => {
      router.push('/auth/login');
    });
  }, [num]);
  return <div></div>;
}
