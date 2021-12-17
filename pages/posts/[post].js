import styles from '../../styles/index.module.css';
import Nav from '../../components/Nav';
import getUser from '../../hooks/getUser';
import Comments from '../../components/Comments';

export default function CommentSection() {
  getUser();
  return (
    <div id={styles.flex}>
      <Nav />
      <Comments />
      <div id={styles.moreNav}></div>
    </div>
  );
}
