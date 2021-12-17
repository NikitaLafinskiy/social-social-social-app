import pp from '../../styles/profileImg.module.css';
import Link from 'next/link';

export default function Comment(props) {
  const path = props.pp === null ? '/images/profile.jpg' : props.pp;
  return (
    <div id='main'>
      <Link href={`/nav/profile/view?id=${props.publishedBy}`}>
        <a>
          <div id='flex'>
            <img
              style={{ width: '2vw', height: '2vw' }}
              className={pp.img}
              alt='pp'
              src={path}
            />

            <h3>{props.username}</h3>
          </div>
        </a>
      </Link>
      <p>{props.body}</p>
      <style jsx>{`
        #main {
          width: 100%;
          border-bottom: 1px grey solid;
          overflow-x:hidden;
        }
        #main p {
          font-size: 1vw;
          margin-left:8.2%;
          max-width:85%;
          margin-top:-1%;
          word-wrap: break-word;
          }
          #flex{
            width:100%;
            display:flex;
            align-items:center;
            justify-content:flex-start;
          }
        }
      `}</style>
    </div>
  );
}
