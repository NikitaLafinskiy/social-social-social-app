import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import router from 'next/router';

const getUser = () => {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/getUser`,
      withCredentials: true,
    }).then((doc) => {
      const val = doc.data.user?.username;
      if (val) {
        const user = {
          username: doc.data.user.username,
          email: doc.data.user.email,
          pp: doc.data.user.pp,
          about: doc.data.user.about,
          id: doc.data.user.id,
        };
        setUser(user);
        console.log(user);
      } else if (!val) {
        router.push('/auth/signup');
      }
    });
  }, [null]);
};

export default getUser;
