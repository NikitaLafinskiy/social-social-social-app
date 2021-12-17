import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styles from '../../styles/singlePost.module.css';
import router from 'next/router';
import ProfileImage from './ProfileImage';
import Link from 'next/link';
import { UserContext } from '../../contexts/UserContext';

export default function Posts(props) {
  const { user } = useContext(UserContext);
  const heartedByCurrentUser = props.heartedBy
    ? props.heartedBy.includes(user.username)
    : false;
  const [hearted, setHeart] = useState(heartedByCurrentUser);
  useEffect(() => {
    const heartedByCurrentUser = props.heartedBy
      ? props.heartedBy.includes(user.username)
      : false;
    console.log(user.username);
    setHeart(heartedByCurrentUser);
  }, [user]);

  const handleClick = () => {
    router.push('/posts/' + props.id);
  };
  const handleHeart = () => {
    console.log('hearted');
    setHeart(!hearted);
    axios
      .post('http://localhost:6969/heart', {
        postId: props.id,
        heartedBy: user.username,
      })
      .then((doc) => {
        if (doc) {
          setHeart(!hearted);
        } else if (!doc) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const heartSrc = hearted
    ? '/images/heartFilled.png'
    : '/images/heartEmpty.png';
  return (
    <div className={styles.flex}>
      <div style={{ paddingBottom: '4vh' }} className={styles.main}>
        <Link href={'/nav/profile/view?id=' + props.publishedById}>
          <a>
            <div id='flex'>
              <ProfileImage src={props.pp} />
              <h3 className={styles.user}>{props.postedBy}</h3>
              <style jsx>{`
                #flex {
                  display: flex;
                  width: 100%;
                  justify-context: flex-start;
                  align-items: center;
                  position: relative;
                  left: -2%;
                }
              `}</style>
            </div>
          </a>
        </Link>
        <p className={styles.body}>{props.body}</p>
        {props.file === null ? (
          ''
        ) : (
          <img
            style={{ borderRadius: '10px', border: '1px solid grey' }}
            src={props.file}
            alt='image'
          />
        )}
        <div id='flex'>
          <img className='iconHeart' src={heartSrc} onClick={handleHeart} />
          <img
            className='icon'
            src='/images/comment.svg'
            onClick={handleClick}
          />{' '}
          <p>Liked by {props.heartedByAmount} users</p>
          <style jsx>{`
            #flex {
              width: 100%;
              height: 20%;
              display: flex;
              align-items: center;
              margin-top: 2%;
            }
            .icon {
              filter: invert(1);
              width: 2vw;
              cursor: pointer;
              border-radius: 50%;
              transition: 0.1s;
              padding: 0.2%;
              margin-right: 0.5vw;
            }
            .icon:hover {
              filter: none;
              background-color: white;
              transition: 0.1s;
            }
            .iconHeart {
              filter: invert(1);
              width: 2vw;
              cursor: pointer;
              border-radius: 50%;
              transition: 0.1s;
              padding: 0.2%;
              margin-right: 0.5vw;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
