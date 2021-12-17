import { useState, useContext } from 'react';
import Btn from './Reusable/Btn';
import TextArea from './Reusable/TextArea';
import styles from '../styles/index.module.css';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import router from 'next/router';
import Error from './Reusable/Error';
import ProfileImage from './Reusable/ProfileImage';

export default function Create() {
  const { user } = useContext(UserContext);
  const [state, setState] = useState({
    body: '',
    file: '',
    err: '',
  });
  const upload = (e) => {
    setState((prev) => {
      return {
        ...prev,
        file: e.target.files[0],
      };
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
  const handleClick = () => {
    const fd = new FormData();
    fd.append('body', state.body);
    fd.append('file', state.file);
    fd.append('postedBy', user.username);
    if (state.body) {
      axios
        .post('http://localhost:6969/create', fd)
        .then((doc) => {
          router.push('/');
        })
        .catch((err) => {
          setState((prev) => {
            return {
              ...prev,
              err: 'Unable to create a post',
            };
          });
        });
    } else if (!state.body) {
      setState((prev) => {
        return {
          ...prev,
          err: 'The body has to be present',
        };
      });
    }
  };
  return (
    <div id={styles.main}>
      <div id='flex'>
        <ProfileImage />
        <h1>{user.username}</h1>
        <style jsx>{`
          #flex {
            display: flex;
            width: 100%;
            justify-context: flex-start;
            align-items: center;
          }
        `}</style>
      </div>
      <TextArea
        name='body'
        placeholder='Body of the post...'
        change={handleChange}
        val={state.body}
      />
      <input
        style={{ display: 'none' }}
        id='file'
        type='file'
        onChange={upload}
      />
      <div id={styles.btnsCenter}>
        <Btn>
          <label htmlFor='file'>
            <p>Upload a file</p>
          </label>
          <style jsx>{`
            cursor: pointer;
            width: 100%;
            display: inline-block;
            text-align: center;
          `}</style>
        </Btn>
        <Btn click={handleClick}>Post</Btn>
      </div>
      {state.err === '' ? (
        ''
      ) : (
        <Error
          style={{
            position: 'relative',
            left: '50%',
            top: '2%',
            transform: 'translateX(-50%)',
          }}>
          {state.err}
        </Error>
      )}
    </div>
  );
}
