import styles from '../../../styles/index.module.css';
import Nav from '../../../components/Nav';
import getUser from '../../../hooks/getUser';
import ProfileEdit from '../../../components/ProfileEdit';

export default function CreatePost() {
  getUser();
  return (
    <div id={styles.flex}>
      <Nav />
      <ProfileEdit />
      <div id={styles.moreNav}></div>
    </div>
  );
}
