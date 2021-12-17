import styles from '../../../styles/index.module.css';
import Nav from '../../../components/Nav';
import getUser from '../../../hooks/getUser';
import ProfileView from '../../../components/ProfileView';

export default function CreatePost() {
  getUser();
  return (
    <div id={styles.flex}>
      <Nav />
      <ProfileView />
      <div id={styles.moreNav}></div>
    </div>
  );
}
