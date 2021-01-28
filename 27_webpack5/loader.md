## webpack 常用的loader

### css-loader
#### 编写案例代码
- 我们创建一个component.js
  + 通过JavaScript创建了一个元素，并且希望给它设置一些样式；
  ```js
    import "../css/index.css";

    function component() {
      const element = document.createElement("div");
      element.innerHTML = ["hello", "webpack"].join(" ");
      element.className = "content";
      return element;
    }

    document.body.appendChild(component());
  ```
  ```css
    .content {
      color: pink;
    }
  ```
- 继续编译命令npm run build，会发现代码报错了。因为webpack默认只能打包js文件，无法打包css文件，这时候就需要使用 css-loader 。

#### css-loader的使用
- 上面的错误信息告诉我们需要一个loader来加载这个css文件，但是loader是什么呢
  + loader 可以用于对模块的源代码进行转换；
  + 我们可以将css文件也看成是一个模块，我们是通过import来加载这个模块的；
  + 在加载这个模块时，webpack其实并不知道如何对其进行加载，我们必须制定对应的loader来完成这个功能；
- 那么我们需要一个什么样的loader呢？
  + 对于加载css文件来说，我们需要一个可以读取css文件的loader；
  + 这个loader最常用的是css-loader
- css-loader的安装：`npm install css-loader -D`

#### css-loader的使用方案
- 如何使用这个loader来加载css文件呢？有三种方式：
  + 内联方式；
  + CLI方式（webpack5中不再使用）；
  + 配置方式；

- 内联方式：内联方式使用较少，因为不方便管理；
  + 在引入的样式前加上使用的loader，并且使用!分割；
    ```js
      import "css-loader!../css/style.css";
    ```
- CLI方式
  + 在webpack5的文档中已经没有了--module-bind；
  + 实际应用中也比较少使用，因为不方便管理；

- 配置方式
  + 配置方式表示的意思是在我们的webpack.config.js文件中写明配置信息：
    - module.rules中允许我们配置多个loader（因为我们也会继续使用其他的loader，来完成其他文件的加载）；
    - 这种方式可以更好的表示loader的配置，也方便后期的维护，同时也让你对各个Loader有一个全局的概览；

  + module.rules的配置如下：
  + rules属性对应的值是一个数组：[Rule]
  + 数组中存放的是一个个的Rule，Rule是一个对象，对象中可以设置多个属性：
    - **test属性：**用于对 resource（资源）进行匹配的，通常会设置成正则表达式；
    - **use属性：**对应的值是一个数组：[UseEntry]
      + UseEntry是一个对象，可以通过对象的属性来设置一些其他属性
        - <font color="red">loader：</font>必须有一个 loader属性，对应的值是一个字符串；
        - <font color="red">options</font>可选的属性，值是一个字符串或者对象，值会被传入到loader中；
        - <font color="red">query：</font>目前已经使用options来替代；
      + **传递字符串（如：use: [ 'style-loader' ]）是 loader 属性的简写方式（如：use: [ { loader: 'style-loader'} ]）；**
    - **loader属性：** Rule.use: [ { loader } ] 的简写。

- Loader的配置代码
```js
  module.exports = {
    mode: "development",
    entry: "./scr/main.js",
    output: {
      path: path.resolve(__dirname, "./build"),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          // loader: "css-loader"     // 写法一
          // use: ["css-loader"]      // 写法二

          // 写法三
          use: [
            { loader: "css-loader" }  
          ]
        }
      ]
    }
  }
```

### style-loader
- 我们已经可以通过css-loader来加载css文件了
  + p但是你会发现这个css在我们的代码中并<font color="red">没有生效（页面没有效果）。</font>
- 这是为什么呢？
  + 因为css-loader只是**负责将.css文件进行解析**，并不会将解析之后的css**插入到页面中；**
  + 如果我们希望再完成**插入style的操作**，那么我们还需要另外一个loader，就是**style-loader；**
- 安装style-loader：`npm install style-loader -D`

#### 配置style-loader
- 那么我们应该如何使用style-loader：
  + 在配置文件中，添加style-loader；
  + **注意：**因为loader的执行顺序是从右向左（或者说从下到上，或者说从后到前的），所以我们需要将style-loader写到css-loader的前面；
  ```js
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            // 将 style-loader 写在 css-loader 前面
            { loader: "style-loader" },
            { loader: "css-loader" }
          ]
        }
      ]
    }
  ```
- 重新执行编译npm run build，可以发现打包后的css已经生效了：
  + 当前目前我们的css是通过页内样式的方式添加进来的；
  + 后续我们也会讲如何将css抽取到单独的文件中，并且进行压缩等操作；

### less-loader
#### 如何处理less文件？
- 在我们开发中，我们可能会使用less、sass、stylus的预处理器来编写css样式，效率会更高
- 那么，如何可以让我们的环境支持这些预处理器呢？
  + 首先我们需要确定，less、sass等编写的css需要通过工具转换成普通的css；
- 比如我们编写如下的less样式：
  ```less
    @fontSize: 30px;
    @fontWeight: 700;

    .content {
      font-size: @fontSize;
      font-weight: @fontWeight;
    }
  ```
- 我们可以使用less工具来完成它的编译转换：`npm install less -D`;
- 执行如下命令：`npx less ./src/css/title.less > title.css`
- 但是在项目中我们会编写大量的css，它们如何可以自动转换呢？
  + 这个时候我们就可以使用less-loader，来自动使用less工具转换less到css；
  + `npm install less-loader -D`
- 配置webpack.config.js
  ```js
    {
      test: /\.less$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "less-loader" },
      ]
    }
  ```
- 执行npm run build, less就可以自动转换成css，并且页面也会生效了


### file-loader
#### 案例准备
- 为了演示我们项目中可以加载图片，我们需要在项目中使用图片，比较常见的使用图片的方式是两种：
  + img元素，设置src属性
  + 其他元素（比如div），设置background-image的css属性
  ```js
    // img 元素
    const zznhImg = require('../img/zznh.png');
    const zznhImage = new Image();
    zznhImage.src = zznhImg;
    element.appendChild(zznhImage);

    // 增加一个div，用于存图片
    const bgDiv = document.createElement('div');
    div.style.width = '200px';
    div.style.height = '200px';
    div.style.display = 'inline-block';
    div.className = 'bg-image';
    div.style.backgroundColor = 'red';
    element.appendChild(bgDiv);
  ```
  ```css
    .bg-image {
      background-image: url("../img/nhlt.png");
      background-size: contain;
    }
  ```
- 这个时候，打包会报错

#### file-loader
- 要处理jpg、png等格式的图片，我们也需要有对应的loader：file-loader
  + file-loader的作用就是帮助我们处理**import/require()方式**引入的一个文件资源，并且会将它放到我们**输出的文件夹**中；
  + 当然我们待会儿可以学习如何修改它的名字和所在文件夹；
- 安装file-loader：`npm install file-loader -D`
- 配置处理图片的 rule：
  ```js
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: {
        loader: "file-loader"
      }
    }
  ```

#### 文件的名称规则
- 有时候我们处理后的文件名称按照一定的规则进行显示：
  + 比如保留原来的文件名、扩展名，同时为了防止重复，包含一个hash值等；
- 这个时候我们可以使用PlaceHolders来完成，webpack给我们提供了大量的PlaceHolders来显示不同的内容：
  + [https://webpack.js.org/loaders/file-loader/#placeholders](https://webpack.js.org/loaders/file-loader/#placeholders)
  + 我们可以在文档中查阅自己需要的placeholder；
- 我们这里介绍几个最常用的placeholder：
  + [ext]： 处理文件的扩展名；
  + [name]：处理文件的名称；
  + [hash]：文件的内容，使用MD4的散列函数处理，生成的一个128位的hash值（32个十六进制）；
  + [contentHash]：在file-loader中和[hash]结果是一致的（在webpack的一些其他地方不一样，后面会讲到）；
  + [hash:<length>]：截图hash的长度，默认32个字符太长了；
  + [path]：文件相对于webpack配置文件的路径；

#### 设置文件名称
- 那么我们可以按照如下的格式编写：
  + 这个也是vue的写法；
```js
  {
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: {
      loader: "file-loader",
      options: {
        name: "img/[name].[hash:8].[ext]"
      }
    }
  }
```

#### 设置文件的存放路径
- 当然，我们刚才通过 img/ 已经设置了文件夹，这个也是vue、react脚手架中常见的设置方式：
  + 其实按照这种设置方式就可以了；
  + 当然我们也可以通过outputPath来设置输出的文件夹；
  ```js
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[hash:8].[ext]",
          outputPath: "img"
        }
      }
    }
  ```

### url-loader
- url-loader和file-loader的工作方式是相似的，但是可以将较小的文件，转成**base64的URI。**
- 安装url-loader：`npm install url-loader -D`
- 使用
  ```js
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: {
        loader: "url-loader",
        options: {
          name: "[name].[hash:8].[ext]",
          outputPath: "img"
        }
      }
    }
  ```
- 显示结果是一样的，并且图片可以正常显示；
- 但是在dist文件夹中，我们会看不到图片文件：
  + 这是因为我的两张图片的大小分别是38kb和295kb；
  + 默认情况下url-loader会将所有的图片文件转成base64编码

#### url-loader的limit
- 但是开发中我们往往是**小的图片需要转换**，但是**大的图片直接使用图片**即可
  + 这是因为小的图片转换base64之后可以和页面一起被请求，减少不必要的请求过程；
  + 而大的图片也进行转换，反而会影响页面的请求速度；
- 那么，我们如何可以限制哪些大小的图片转换和不转换呢？
  + url-loader有一个options属性**limit**，可以用于设置转换的限制；
  + 下面的代码38kb的图片会进行base64编码，而295kb的不会；
  ```js
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: {
        loader: "url-loader",
        options: {
          name: "img/[name].[hash:8].[ext]",
          limit: 100 * 1024
        }
      }
    }
  ```

### asset module type
#### asset module type的介绍
- 我们当前使用的webpack版本是webpack5：
  + 在webpack5之前，加载这些资源我们需要使用一些loader，比如raw-loader 、url-loader、file-loader；
  + 在webpack5之后，我们可以直接使用**资源模块类型（asset module type）**，来替代上面的这些loader；
- **资源模块类型(asset module type)**，通过添加 4 种新的模块类型，来替换所有这些 loader：
  + **asset/resource** 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现；
  + **asset/inline** 导出一个资源的 data URI。之前通过使用 url-loader 实现；
  + **asset/source** 导出资源的源代码。之前通过使用 raw-loader 实现；
  + **asset** 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源
体积限制实现；

#### Asset module type的使用
- 比如加载图片，我们可以使用下面的方式：
```js
  {
    test: /\.(png|jpe?g|gif|svg)$/i,
    type: "asset/resource"
  }
```
- 但是，如何可以自定义文件的输出路径和文件名呢？
  + 方式一：修改output，添加assetModuleFilename属性；
  ```js
    output: {
      filename: "js/bundle.js",
      path: path.resolve(__dirname, "./dist"),
      assetModuleFilename: "img/[name].[hash:8].[ext]"
    }
  ```
  + 方式二：在Rule中，添加一个generator属性，并且设置filename；
  ```js
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: "asset/resource",
      generator: {
        filename: "img/[name].[hash:8].[ext]"
      }
    }
  ```

#### url-loader的limit效果
- 我们需要两个步骤来实现：
  + 步骤一：将type修改为asset；
  + 步骤二：添加一个parser属性，并且制定dataUrl的条件，添加maxSize属性；
  ```js
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        generator: {
          filename: "img/[name].[hash:8].[ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      }
    ]
  ```

#### 加载字体文件
- 如果我们需要使用某些**特殊的字体或者字体图标**，那么我们会引入**很多字体相关的文件**，这些文件的处理也是一样
的
- 首先，我从阿里图标库中下载了几个字体图标，放在 font 目录下
- 在component中引入，并且添加一个i元素用于显示字体图标：
```js
  const iEl = document.createElement('i');
  iEl.className = 'iconfont icon-ashbin';
  element.appendChild(iEl);
```
#### 字体的打包
- 这个时候打包会报错，因为无法正确的处理eot、ttf、woff等文件：
  + 我们可以选择使用file-loader来处理，也可以选择直接使用webpack5的资源模块类型来处理；
  ```js
    {
      test: /\.(ttf|woff2?|eot)$/i,
      type: "asset/resource",
      generator: {
        filename: "font/[name].[hash:6].[ext]"
      }
    }
  ```