import Btn from '../../components/Reusable/Btn';
import Input from '../../components/Reusable/Input';
import { useState } from 'react';
import styles from '../../styles/signup.module.css';
import axios from 'axios';
import Link from 'next/link';
import useRouter from 'next/router';
import Error from '../../components/Reusable/Error';

export default function SignUp() {
  const [state, setState] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [err, setErr] = useState(null);
  const handleClick = () => {
    axios
      .post('http://localhost:6969/signup', state)
      .then((doc) => {
        useRouter.push('/auth/login');
      })
      .catch((err, doc) => {
        setErr('Unable to register');
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
        <h1 id={styles.header}>Sign Up</h1>
        <Input
          placeholder='Username...'
          name={'username'}
          change={handleChange}
          val={state.username}
        />
        <Input
          placeholder='Email...'
          name={'email'}
          change={handleChange}
          val={state.email}
        />
        <Input
          placeholder='Password...'
          name={'password'}
          change={handleChange}
          val={state.password}
        />
        <Btn style={{ width: '13vw', height: '5vh' }} click={handleClick}>
          Sign Up
        </Btn>
        <Link href='/auth/login'>
          <a id={styles.footer}>Already have an account? Log In!</a>
        </Link>
        <Error
          style={{
            width: '23vw',
            position: 'absolute',
            top: '-22%',
          }}>
          {err}
        </Error>
      </div>
    </div>
  );
}
