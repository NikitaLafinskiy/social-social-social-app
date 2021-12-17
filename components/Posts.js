import { useEffect, useState } from 'react';
import axios from 'axios';
import SinglePost from './Reusable/SinglePost';
import styles from '../styles/index.module.css';

export default function Posts(props) {
  const [state, setState] = useState({
    posts: '',
  });
  const num = 1;
  useEffect(() => {
    axios.get('http://localhost:6969/find').then((doc) => {
      setState((prev) => {
        return {
          ...prev,
          posts: doc.data,
        };
      });
    });
  }, [num]);

  const postsMapped = state.posts
    ? state.posts.map((obj) => {
        return (
          <SinglePost
            key={obj.id}
            body={obj.body}
            postedBy={obj.postedBy}
            file={obj.file}
            id={obj.id}
            pp={obj.pp}
            publishedById={obj.publishedById}
            heartedBy={obj.heartedBy}
            heartedByAmount={obj.heartedByAmount}
          />
        );
      })
    : '';

  return <div id={styles.main}>{postsMapped}</div>;
}
