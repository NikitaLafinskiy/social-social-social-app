import { useState, useContext, useEffect } from 'react';
import Btn from './Reusable/Btn';
import TextArea from './Reusable/TextArea';
import stylesIndex from '../styles/index.module.css';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import router from 'next/router';
import styles from '../styles/profile.module.css';
import ProfileImage from './Reusable/ProfileImage';
import Input from './Reusable/Input';
import Error from './Reusable/Error';

export default function Profile() {
  const { user } = useContext(UserContext);
  const [state, setState] = useState({
    profilePic: '',
    username: '',
    about: '',
    id: '',
    prevUser: '',
    shownPP: '',
  });

  const [error, setError] = useState('');
  useEffect(() => {
    if (!user) return;
    setState((prev) => {
      return {
        ...prev,
        profilePic: user.pp,
        username: user.username,
        about: user.about,
        id: user.id,
        prevUser: user.username,
        shownPP: user.pp,
      };
    });
  }, [user]);

  const handleChange = (e) => {
    console.log(state.profilePic, state.shownPP);
    if (e.target.value.length < 319) {
      setState((prev) => {
        return {
          ...prev,
          id: user.id,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const upload = (e) => {
    const fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);
    fr.onload = () => {
      setState((prev) => {
        return {
          ...prev,
          shownPP: fr.result,
          profilePic: e.target.files[0],
        };
      });
    };
  };

  const handleClick = () => {
    const fd = new FormData();
    fd.append('pp', state.profilePic);
    fd.append('username', state.username);
    fd.append('about', state.about);
    fd.append('id', state.id);
    fd.append('prevUser', state.prevUser);

    axios
      .post(`https://${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/profile/edit`, fd)
      .then((doc) => {
        router.push('/');
      })
      .catch((err) => {
        setError('Unable to edit the profile');
      });
  };

  return (
    <div id={stylesIndex.main}>
      <div id={styles.editProfile}>
        <div id={styles.flex}>
          <label htmlFor='file'>
            <ProfileImage
              style={{
                width: '6vw',
                height: '6vw',
                cursor: 'pointer',
                margin: '1vw',
              }}
              src={state.shownPP}
            />
          </label>
          <Input
            placeholder='Name...'
            change={handleChange}
            style={{ fontSize: '2vw' }}
            val={state.user}
            name='username'
          />
        </div>
        <h2>About me: </h2>
        <TextArea
          style={{ borderBottom: 'none', height: '26%' }}
          placeholder='Tell us about yourself...'
          name='about'
          val={state.about}
          change={handleChange}
        />
      </div>
      <input
        style={{ display: 'none' }}
        id='file'
        type='file'
        onChange={upload}
      />
      <Btn
        click={handleClick}
        style={{
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
        Save
      </Btn>
      {error === '' ? (
        ''
      ) : (
        <Error
          style={{
            position: 'relative',
            left: '50%',
            top: '2%',
            transform: 'translateX(-50%)',
          }}>
          {error}
        </Error>
      )}
    </div>
  );
}
