

## Node HTTP Server

Node HTTP Server 是一个基于 Node.js 的简单 HTTP 服务器，它提供了一个轻量级的 Web 服务器，可用于处理 HTTP 请求并提供静态文件服务/托管静态文件。

### 功能特性

- `node-http-server` 可以轻松地在本地主机上托管静态文件，包括 HTML、CSS、JavaScript、图像、视频（可直接播放）和其他常见的静态资源。
- 服务器支持在控制台中输出请求日志，方便调试和监视。
- 可以通过修改 `app.js` 文件来更改服务器的端口号和托管目录。

## 安装

由于 `node-http-server` 项目并没有发布到 npm 上，因此您需要先克隆该项目

1. 从 GitHub 上克隆该仓库到您的本地计算机：

```bash
git clone https://github.com/rosercode/node-http-server.git
```

2. 进入 `node-http-server` 目录并安装依赖项：

```bash
cd node-http-server
npm install
```

如果你需要全局安装

```bash
npm install . -g
```

## 使用

1. 在 `node-http-server` 目录下，使用以下命令启动服务器：

```bash
node app.js
```

2. 在浏览器中输入以下地址来访问托管的静态文件：

```bash
http://localhost:3000
```

### 命令行参数

`node-http-server` 支持以下命令行参数：

- `-p, --port <port>`：指定服务器的端口号，默认为 `3000`。
- `-d, --dir <directory>`：指定要托管的目录，默认为 `.`（当前目录）。
- `-debug`：启用请求日志记录，默认禁用。

要使用命令行参数，请在启动服务器时将它们传递给 `app.js` 脚本。例如：

```bash
 node app.js --dir=G:\video --port=30001 --debug=true
```

## 贡献

欢迎大家贡献代码和改进 `node-http-server` 服务器。如果您发现了 bug，或者有任何改进意见，请通过 GitHub 提交 issue 或 pull request。

## 许可证

`node-http-server` 是基于 MIT 许可证开源的。

## 相关链接

- [Node.js 官方网站](https://nodejs.org/)
- [Express.js 框架](https://expressjs.com/)