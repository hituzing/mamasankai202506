
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycby2r7s7tguu13YICWkN9QYrNUnv_xUPNwQ_mK1n_We1RL4o4c3OwqUTI39-UEA55U0CWQ/exec';

async function fetchData(sheetName) {
  const response = await fetch(`${API_BASE_URL}?sheet=${sheetName}`);
  const data = await response.json();
  return data;
}

// メンバー一覧を読み込んで表示（例）
fetchData('members').then(members => {
  console.log('[members]', members);
  // ここでDOMに反映する処理を記述
});

// 活動報告を読み込んで表示（例）
fetchData('activities').then(activities => {
  console.log('[activities]', activities);
  // 表示処理をここに記述
});

// 今後の予定を読み込んで表示（例）
fetchData('schedule').then(schedule => {
  console.log('[schedule]', schedule);
  // 表示処理をここに記述
});
