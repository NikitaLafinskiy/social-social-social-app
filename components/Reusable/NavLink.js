import Link from 'next/link';
import styles from '../../styles/navLink.module.css';

export default function NavLink(props) {
  return (
    <Link href={props.link}>
      <a className={styles.link} id={styles.profile}>
        <img
          className={styles.img}
          src={'/images/' + props.src}
          alt='nav image'
        />
        <p className={styles.linkText}> {props.children} </p>
      </a>
    </Link>
  );
}
