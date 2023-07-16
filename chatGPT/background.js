// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.setBadgeText({
//     text: 'OFF'
//   });
// });

chrome.runtime.onInstalled.addListener(function() {
  // 清除Cookie
  chrome.cookies.getAll({}, function(cookies) {
    for (var i = 0; i < cookies.length; i++) {
      chrome.cookies.remove({
        url: "https://" + cookies[i].domain + cookies[i].path,
        name: cookies[i].name
      });
    }
  });

  // 重启浏览器
  chrome.runtime.reload();
});