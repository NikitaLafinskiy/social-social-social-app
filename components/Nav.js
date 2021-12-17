import styles from '../styles/index.module.css';
import NavLink from './Reusable/NavLink';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function Nav(props) {
  const { user } = useContext(UserContext);
  return (
    <div id={styles.nav}>
      <div id={styles.actualLinks}>
        <NavLink src='profilePage.png' link={`/nav/profile/view?id=${user.id}`}>
          Profile
        </NavLink>
        <NavLink src='homePage.png' link='/'>
          Home
        </NavLink>
        <NavLink src='createPage.png' link='/nav/create'>
          Create a post
        </NavLink>
        <NavLink src='logOutPage.png' link='/auth/logout'>
          Log Out
        </NavLink>
      </div>
    </div>
  );
}
