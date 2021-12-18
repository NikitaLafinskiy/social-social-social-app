import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Btn from './Reusable/Btn';
import TextArea from './Reusable/TextArea';
import ProfileImage from './Reusable/ProfileImage';
import { UserContext } from '../contexts/UserContext';

export default function CreateComment() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [state, setState] = useState({
    comments: '',
    newComment: '',
    publishedBy: '',
  });
  useEffect(() => {
    if (router.isReady) {
      setState((prev) => {
        return {
          ...prev,
          publishedBy: user.id,
          publishedUnder: router.query.post,
        };
      });
    }
  }, [router.isReady]);
  const handleChange = (e) => {
    if (state.newComment.length <= 3199) {
      setState((prev) => {
        return {
          ...prev,
          newComment: e.target.value,
        };
      });
    }
  };

  const handleClick = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/createComment`, {
        body: state.newComment,
        publishedBy: state.publishedBy,
        publishedUnder: state.publishedUnder,
      })
      .then((doc) => {
        router.reload();
      });
  };
  return (
    <div id='create'>
      <div id='pp'>
        <ProfileImage />
      </div>

      <TextArea
        style={{ border: 'none', width: '70%' }}
        placeholder='What do you think?'
        change={handleChange}
        name='newComment'
        val={state.newComment}
      />
      <Btn
        click={handleClick}
        style={{
          position: 'relative',
          top: '-10%',
          right: '0%',
          width: '9vw',
          height: '4vh',
        }}>
        Publish
      </Btn>
      <style jsx>{`
        #pp {
          width: 100%;
          display: flex;
          justify-content: flex-start;
        }
        #create {
          width: 100%;
          height: 13%;
          border-bottom: 1px solid grey;
        }
      `}</style>
    </div>
  );
}
