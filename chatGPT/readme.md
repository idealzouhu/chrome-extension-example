# 一、chatGPT

**chatGPT**扩展实现功能主要为：

- 清除Cookie
- 无需输入账号和密码，自动登录ChatGPT网页

> 扩展无法实现重启浏览器，这是权限限制的问题



# 二、开发扩展chatGPT

## 2.1 添加扩展的基本信息

在项目的根目录中创建一个`manifest.json`文件并添加以下代码：

```
{
  "manifest_version": 3,
  "name": "ChatGPT Plugin",
  "version": "1.0",
  "description": "Log back into chatGPT",
   "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  },
  "permissions": [
    "cookies",
    "storage",
    "tabs"
  ],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "browser_action": {
    "default_popup": "popup.html"
  }
}
```

## 2.2 创建 background.js 文件

创建 `background.js `文件， 在 `background.js` 文件中添加以下代码，用于清除Cookie和重启浏览器

```javascript
chrome.action.onClicked.addListener(function(tab) {
  // 清除Cookie
  chrome.cookies.getAll({}, function(cookies) {
    for (var i = 0; i < cookies.length; i++) {
      chrome.cookies.remove({
        url: "https://" + cookies[i].domain + cookies[i].path,
        name: cookies[i].name
      });
    }
  });

});

```

在上述修改后的代码中，我们使用 `chrome.action.onClicked.addListener` 方法来监听扩展程序图标的点击事件。当用户点击扩展程序图标时，代码将执行清除Cookie的操作，并重新加载浏览器。





## 2.3 创建 popup.js 和 popup.html文件

创建 `popup.html `文件, 构建插件弹窗里面的内容

```
<!DOCTYPE html>
<html>
<head>
  <title>My Plugin</title>
  <script src="popup.js"></script>
</head>
<body>
  <button id="loginButton">登录ChatGPT</button>
</body>
</html>

```

创建 `popup.js `文件，添加用于处理点击登录按钮的事件和自动登录ChatGPT的代码

```
document.getElementById("loginButton").addEventListener("click", function() {
  // 登录ChatGPT
  chrome.storage.sync.set({ "username": "your_username", "password": "your_password" }, function() {
    chrome.tabs.create({ url: "https://chat.openai.com" });
  });
});
```

