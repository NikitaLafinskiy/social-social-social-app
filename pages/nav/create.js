import Create from '../../components/Create';
import styles from '../../styles/index.module.css';
import Nav from '../../components/Nav';
import getUser from '../../hooks/getUser';

export default function CreatePost() {
  getUser();
  return (
    <div id={styles.flex}>
      <Nav />
      <Create />
      <div id={styles.moreNav}></div>
    </div>
  );
}
