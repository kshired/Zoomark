chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.query(
    { active: true, lastFocusedWindow: true, currentWindow: true },
    function (tabs) {
      let url = tabs[0].url;
      if (url.includes('zoom_view_form.acl')) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: addButton,
        });
      }
    }
  );
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  let url = tab.url;
  if (url.includes('zoom_view_form.acl')) {
    chrome.scripting.executeScript({
      target: { tabId },
      func: addButton,
    });
  }
});

const addButton = () => {
  if (document.getElementById('zoom')) {
    return;
  }
  if (document.querySelector('.zoom_start_info > td') === null) {
    return;
  }
  let btn = document.createElement('div');
  btn.innerText = 'Zoomark에 추가';
  btn.className = 'site_button';
  btn.id = 'zoom';
  btn.addEventListener('click', async () => {
    const link = document.querySelector(
      '.zoom_start_info > td >  a.site-link'
    ).innerText;
    const id =
      document.getElementsByClassName('zoom_start_info')[1].childNodes[3]
        .innerText;
    const password = document.querySelector(
      '.bbsview >  tbody > tr:nth-child(6)'
    ).childNodes[3].innerText;
    const text = document
      .getElementById('subject-span')
      .innerText.split('(')[0];
    const date = document
      .querySelector('.bbsview >  tbody > tr:nth-child(2)')
      .childNodes[3].innerText.slice(0, 18);
    chrome.storage.sync.get('zoomark', (items) => {
      let new_items = items.zoomark;
      if (new_items === undefined) {
        new_items = [];
      }
      for (let items of new_items) {
        if (items.id === id) {
          alert('이미 존재하는 수업입니다!');
          return;
        }
      }
      new_items.push({
        link,
        id,
        password,
        text,
        date,
      });
      chrome.storage.sync.set({ zoomark: new_items });
      alert('추가되었습니다!');
    });
  });
  document.querySelector('.zoom_start_info > td').appendChild(btn);
};
