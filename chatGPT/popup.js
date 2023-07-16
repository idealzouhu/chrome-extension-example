document.getElementById("loginButton").addEventListener("click", function() {
  // 登录ChatGPT
  chrome.storage.sync.set({ "username": "your_username", "password": "your_password" }, function() {
    chrome.tabs.create({ url: "https://chat.openai.com" });
  });
});