import React from 'react';
import styles from '../../styles/profileImg.module.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const ProfileImage = (props) => {
  const { user } = useContext(UserContext);
  const profileSrc =
    user?.pp === null || user?.pp === undefined
      ? '/images/profile.jpg'
      : user?.pp;
  const finalSrc = props.src ? props.src : profileSrc;
  return (
    <img
      style={props.style}
      className={styles.img}
      src={finalSrc}
      alt='profile pic'
    />
  );
};

export default ProfileImage;
