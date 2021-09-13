/*global chrome*/
import './bootstrap.min.css';
import './index.css';
import FormRow from './components/FormRow';
import Zoomark from './components/Zoomark';
import { useEffect, useState } from 'react';

function App() {
  const [zooMarks, setZoomarks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [password, setPassword] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    chrome.storage.sync.get('zoomark', (items) => {
      if (items.zoomark === undefined) {
        return;
      }
      setZoomarks(items.zoomark);
    });
  }, []);

  const clearInputs = () => {
    setPassword('');
    setText('');
    setDate('');
    setLink('');
  };

  const saveZoomark = () => {
    if (
      text.length !== 0 &&
      date.length !== 0 &&
      link.length !== 0 &&
      password.length !== 0
    ) {
      chrome.storage.sync.get('zoomark', (items) => {
        let new_items = items.zoomark;
        if (new_items === undefined) {
          new_items = [];
        }
        for (let items of new_items) {
          if (items.id === link) {
            alert('이미 존재하는 수업입니다!');
            return;
          }
        }
        new_items.push({
          link,
          id: link,
          password,
          text,
          date,
        });
        chrome.storage.sync.set({ zoomark: new_items });
        alert('추가되었습니다!');
        window.location.reload();
      });
      clearInputs();
    }
  };

  return (
    <>
      <div
        className="features-boxed"
        style={{
          height: '130px',
          width: 'none',
          minWidth: 'none',
          borderRadius: '0px',
        }}
      >
        <div
          className="container"
          style={{
            textAlign: 'center',
            width: '350px',
            paddingRight: 0,
            paddingLeft: 0,
          }}
        >
          <div
            className="intro"
            style={{
              textAlign: 'center',
              marginRight: 0,
              marginLeft: 0,
              width: '350px',
              minWidth: '350px',
              maxWidth: '350px',
              marginBottom: '20px',
            }}
          >
            <h2
              className="text-center"
              style={{
                marginBottom: '8px',
                width: '350px',
                minWidth: '350px',
                paddingTop: '30px',
                fontSize: '32px',
                color: '#af272f',
              }}
            >
              Zoomark
            </h2>
            <p
              className="text-center"
              style={{
                paddingRight: '0px',
                paddingLeft: '0px',
                textAlign: 'center',
                width: '350px',
                minWidth: '350px',
                maxWidth: '350px',
                color: '#9e2b2f',
                fontWeight: 'bold',
              }}
            >
              당신의 줌을 북마크하세요!
            </p>
          </div>
        </div>
      </div>
      <br />
      <div
        className="features-boxed"
        style={{
          width: 'none',
          minWidth: 'none',
        }}
      >
        <div
          className="container"
          style={{
            textAlign: 'center',
            width: '350px',
            paddingRight: 0,
            paddingLeft: 0,
            paddingBottom: '15px',
          }}
        >
          <div style={{ width: '100%' }}>
            <h4
              className="text-center"
              style={{
                marginBottom: '25px',
                width: '350px',
                minWidth: '350px',
                paddingTop: '25px',
                fontSize: '22px',
              }}
            >
              BoomarkList
              <div
                id="open"
                style={{
                  color: '#0077b6',
                  paddingLeft: '10px',
                  fontSize: '16px',
                  display: isOpen ? 'none' : 'inline',
                }}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#9e2b2f"
                  viewBox="0 0 30 30"
                >
                  <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                </svg>
              </div>
              <div
                id="close"
                style={{
                  color: '#0077b6',
                  paddingLeft: '10px',
                  fontSize: '16px',
                  display: isOpen ? 'inline' : 'none',
                }}
                onClick={() => {
                  setIsOpen(false);
                  clearInputs();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#9e2b2f"
                  viewBox="0 0 30 30"
                >
                  <path d="M0 10h24v4h-24z" />
                </svg>
              </div>
            </h4>
          </div>
          <form
            className="addZoom"
            style={{ display: isOpen ? 'block' : 'none', marginBottom: '10px' }}
          >
            <FormRow title={'수업 이름'} value={text} onChange={setText} />
            <FormRow title={'줌 링크'} value={link} onChange={setLink} />
            <FormRow title={'암호'} value={password} onChange={setPassword} />
            <FormRow title={'날짜 및 시간'} value={date} onChange={setDate} />
            <button
              className="btn"
              id="saveZoom"
              type="submit"
              style={{
                textAlign: 'center',
                marginTop: '22.5px',
                color: 'white',
                backgroundColor: '#9e2b2f',
              }}
              onClick={() => {
                saveZoomark();
              }}
            >
              줌 링크 저장하기
            </button>
          </form>
          <div
            id="bookmarks"
            className="row"
            style={{
              marginLeft: 0,
              marginRight: 0,
            }}
          >
            <div id="area" className="col">
              {zooMarks.map((data) => (
                <Zoomark data={data} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
