import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Comment from './Reusable/Comment';
import stylesIndex from '../styles/index.module.css';
import axios from 'axios';
import CreateComment from './CreateComment';

export default function Comments(props) {
  const router = useRouter();

  const [state, setState] = useState({
    comments: '',
    mappedComments: '',
  });

  useEffect(() => {
    if (!router.isReady) return;
    const path =
      `${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/viewComments/` +
      router.query.post;
    axios.get(path).then((doc) => {
      console.log(doc.data.comments);
      const data = doc.data.comments;
      if (data) {
        const val = data.map((obj) => {
          return (
            <Comment
              id={obj.id}
              key={obj.id}
              publishedBy={obj.publishedBy}
              publishedUnder={obj.publishedUnder}
              body={obj.body}
              username={obj.username}
              pp={obj.pp}
            />
          );
        });
        setState((prev) => {
          return {
            ...prev,
            comments: val,
          };
        });
      } else if (!data) {
        setState((prev) => {
          return {
            ...prev,
            comments: 'No comments published were under the post yet',
          };
        });
      }
    });
  }, [router.isReady]);
  console.log(state.comments);
  return (
    <div id={stylesIndex.main}>
      <CreateComment />
      <div>{state.comments}</div>
    </div>
  );
}
