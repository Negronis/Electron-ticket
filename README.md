#### 插件的集成：

包括但不限于：

1. React
2. React-router
3. Electron
4. Electron-builder

Electron启动项目：

```javascript
//第一个窗口：
npm start
//第二个窗口：
npm run dev
```

运行简单，打包难，下面细数打包的坑和技巧：

##### 技巧：

1.将main.js放在build文件夹下，改名为electron.js，因为builder-effective-config.yaml中会出现此文件的引用，如果不加会导致报错build/electron.js is undefined。

2.将preload.js也放进build文件夹。

3.注意修改main.js中index.html的路径和preload引用的路径。

##### 坑：

1.一堆乱七八糟的错误 

解决方案：删除node_modules重新npm install

2.显示build/electron.js不存在

解决方案：复制main.js改名为electron.js放入build中

3.打开一片空白

4.无法引入preload.js

解决方案：重写mainWindow.loadURL和preload的路径为：

```javascript
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: `${__dirname}/preload.js`
    }
  })
  mainWindow.loadURL(`file://${__dirname}/index.html`);
}
```

5.react离线白屏，资源加载失败：

将BrowserRouter改为HashRouter

6.打包显示access

解决方案：检查dist文件夹是否被占用了

7.devDependencies问题

解决方案：将两个electron放入devDependencies中，从dependencies中删去

```javascript
  "devDependencies": {
    "electron": "^10.1.1",
    "electron-builder": "^22.8.0"
  },
```

8.图片引入

图片直接放在src/assets下，引入直接按照绝对路径即可：

```css
body {
    background-image: url('./assets/background.png');
}
```

```javascript
import jzk from '../assets/jzk.png';
import sbk from '../assets/sbk.png'; 
      <div>
            <img  src={jzk} width="100%"/>
            <img  src={sbk} width="100%"/>
      </div>
```

