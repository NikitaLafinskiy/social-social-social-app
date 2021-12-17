import styles from '../styles/index.module.css';
import getUser from '../hooks/getUser';
import Posts from '../components/Posts';
import Nav from '../components/Nav';

export default function Home() {
  getUser();

  return (
    <div>
      <div id={styles.flex}>
        <Nav />
        <Posts />
        <div id={styles.moreNav}></div>
      </div>
    </div>
  );
}
