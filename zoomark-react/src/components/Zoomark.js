/*global chrome*/
function Zoomark({ data }) {
  const { id, text, date, link, password } = data;

  const deleteZoomark = (id) => {
    chrome.storage.sync.get('zoomark', (items) => {
      if (items.zoomark === undefined) {
        return;
      }
      const new_items = items.zoomark.filter((item) => item.id !== id);
      chrome.storage.sync.set({ zoomark: new_items });
      window.location.reload();
    });
  };

  const openLink = () => {
    chrome.tabs.create({ link });
  };

  return (
    <div
      id={id}
      className="input-group"
      style={{
        width: '95%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: '10px',
      }}
    >
      <div className="input-group-prepend">
        <span
          className="input-group-text"
          style={{
            width: '220px',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            display: 'block',
            overflowY: 'auto',
            border: '0px',
          }}
        >
          <b>{text}</b>
          <br />
          {date}
          <br />
          암호 : {password}
        </span>
      </div>
      <div className="input-group-append">
        <button
          id="aopen2"
          className="btn"
          type="button"
          style={{ backgroundColor: '#af272f' }}
          onClick={(e) => {
            e.preventDefault();
            openLink();
          }}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-box-arrow-up-right"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
            ></path>
            <path
              fillRule="evenodd"
              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
            ></path>
          </svg>
        </button>
        <button
          id="delete2"
          className="btn"
          type="button"
          style={{ backgroundColor: '#9e2b2f' }}
          onClick={(e) => {
            e.preventDefault();
            deleteZoomark(id);
          }}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-trash"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Zoomark;
