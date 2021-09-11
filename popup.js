document.querySelector('#open').addEventListener('click', () => {
  document.querySelector('.addZoom').style.display = 'block';
  document.querySelector('#open').style.display = 'none';
  document.querySelector('#close').style.display = 'inline';
});

document.querySelector('#close').addEventListener('click', () => {
  clearInputs();
  document.querySelector('.addZoom').style.display = 'none';
  document.querySelector('#close').style.display = 'none';
  document.querySelector('#open').style.display = 'inline';
});

document.querySelector('#saveZoom').addEventListener('click', (e) => {
  e.preventDefault();
  let link = document.getElementById('save-link').value;
  let text = document.getElementById('save-name').value;
  let date = document.getElementById('save-date').value;
  let password = document.getElementById('save-password').value;
  if (
    link.length !== 0 &&
    text.length !== 0 &&
    date.length !== 0 &&
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
    });
    clearInputs();
    document.querySelector('.addZoom').style.display = 'none';
    document.querySelector('#open').style.display = 'inline';
    document.querySelector('#close').style.display = 'none';
    window.location.reload();
  } else {
    alert('데이터를 전부 입력해주세요!');
  }
});

const clearInputs = () => {
  document.getElementById('save-link').value = '';
  document.getElementById('save-name').value = '';
  document.getElementById('save-date').value = '';
  document.getElementById('save-password').value = '';
};

const addZoomark = () => {
  const area = document.getElementById('area');
  chrome.storage.sync.get('zoomark', (items) => {
    if (items.zoomark === undefined) {
      return;
    }
    for (let item of items.zoomark) {
      const { id, text, date, link, password } = item;
      let div = document.createElement('div');
      div.id = id;
      div.innerHTML = createZoomark(id, text, date, password);
      div.childNodes[0].childNodes[3].childNodes[3].addEventListener(
        'click',
        () => {
          deleteZoomark(id);
        }
      );
      div.childNodes[0].childNodes[3].childNodes[1].addEventListener(
        'click',
        () => {
          openLink(link);
        }
      );
      area.appendChild(div);
    }
  });
};

const openLink = (url) => {
  chrome.tabs.create({ url });
};

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

const createZoomark = (id, text, date, password) => {
  return `<div
    id="${id}"
    class="input-group"
    style="
                  width: 95%;
                  margin-left: 2.5%;
                  margin-right: 2.5%;
                  margin-bottom: 10px
                "
  >
    <div class="input-group-prepend">
      <span
        class="input-group-text"
        style="
                      width: 220px;
                      justify-content: center;
                      white-space: nowrap;
                      display: block;
                      overflow-y: auto;
                      border:0px;
                    "
      >
        <b>${text}</b><br>
        ${date}<br>
        암호 : ${password}
      </span>

    </div>
    <div class="input-group-append">
      <button
        id="aopen2"
        class="btn"
        type="button"
        style="background-color: #af272f"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-box-arrow-up-right"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
          ></path>
          <path
            fill-rule="evenodd"
            d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
          ></path>
        </svg>
      </button>
      <button
        id="delete2"
        class="btn"
        type="button"
        style="background-color: #9e2b2f"

      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-trash"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>`;
};

addZoomark();
