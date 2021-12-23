import Btn from '../../components/Reusable/Btn';
import Input from '../../components/Reusable/Input';
import { useState, useContext } from 'react';
import styles from '../../styles/login.module.css';
import axios from 'axios';
import Link from 'next/link';
import useRouter from 'next/router';
import Error from '../../components/Reusable/Error';
import getUser from '../../hooks/getUser';

export default function LogIn() {
  const [state, setState] = useState({
    username: '',
    password: '',
  });
  const [err, setErr] = useState(null);
  const handleClick = () => {
    console.log(state);
    axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/login`,
      withCredentials: true,
      data: state,
    })
      .then((doc) => {
        // console.log(doc);
        getUser();
        // useRouter.push('/');
      })
      .catch((err) => {
        setErr('Unable to login');
      });
  };
  const handleChange = (e) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div id={styles.main}>
      <img id={styles.img} src='/images/ahegao.png' alt='ahegao' />
      <div id={styles.flex}>
        <h1 id={styles.header}>Login</h1>
        <Input
          placeholder='Username...'
          name={'username'}
          change={handleChange}
          val={state.username}
        />
        <Input
          placeholder='Password...'
          name={'password'}
          change={handleChange}
          val={state.password}
        />
        <Btn style={{ width: '13vw', height: '5vh' }} click={handleClick}>
          Log In
        </Btn>
        <Link href='/auth/signup'>
          <a id={styles.footer}>Dont have an account yet? Sign up!</a>
        </Link>
        <Error style={{ top: '-27%' }}>{err}</Error>
      </div>
    </div>
  );
}
