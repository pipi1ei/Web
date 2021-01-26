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
