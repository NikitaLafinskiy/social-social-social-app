import { useState, useContext, useEffect } from 'react';
import stylesIndex from '../styles/index.module.css';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/profile.module.css';
import ProfileImage from './Reusable/ProfileImage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import SinglePost from './Reusable/SinglePost';

export default function Profile() {
  const router = useRouter();
  const { user: context } = useContext(UserContext);
  const [posts, setPosts] = useState('');
  const [user, setUser] = useState('');
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    axios
      .get(
        `https://${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/loadProfile?id=${router.query.id}`
      )
      .then((doc) => {
        const postsData = doc.data.data;

        const mapped = postsData.map((obj) => {
          return (
            <SinglePost
              title={obj.title}
              key={obj.id}
              body={obj.body}
              postedBy={obj.postedBy}
              file={obj.file}
              id={obj.id}
              pp={obj.pp}
            />
          );
        });
        setPosts(mapped);
        axios
          .get(
            `https://${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/loadUser?id=${router.query.id}`
          )
          .then((doc) => {
            if (doc.data.user.id === context.id) {
              setUser(context);
            } else if (doc.data.user.id !== context.id) {
              setUser(doc.data.user);
              console.log(doc.data.user);
            }
          });
      });
  }, [router.isReady]);
  return (
    <div id={stylesIndex.main}>
      <div
        style={{ position: 'relavtive', top: '-100%' }}
        id={styles.editProfile}>
        <div id={styles.flex}>
          <ProfileImage
            style={{
              width: '6vw',
              height: '6vw',
              margin: '1vw',
            }}
            src={user.pp}
          />

          <h1 style={{ fontSize: '2vw' }}> {user.username} </h1>
          <div>
            {user.id === context.id ? (
              <Link href='/nav/profile/edit'>
                <img
                  style={{
                    position: 'relative',
                    height: '2vw',
                    filter: 'invert(1)',
                    right: '-1100%',
                    display: 'inline',
                    cursor: 'pointer',
                  }}
                  src='/images/edit.svg'
                />
              </Link>
            ) : (
              ''
            )}
          </div>
        </div>
        <div>
          <p> {user.email} </p>
          <p>{user.about}</p>
          <style jsx>{`
            word-wrap: break-word;
            width: 95%;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
          `}</style>
        </div>
      </div>

      <div>{posts}</div>
    </div>
  );
}
