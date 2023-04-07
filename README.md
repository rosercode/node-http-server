[简体中文](README-ZH.md)

## Node HTTP Server

Node HTTP Server is a simple HTTP server based on Node.js. It provides a lightweight web server that can handle HTTP requests and serve static files.

### Features

- `node-http-server` can easily host static files on a local machine, including HTML, CSS, JavaScript, images, videos (which can be played directly), and other common static resources.
- `node-http-server` implements video on-demand and playback starting from any position in the video by supporting HTTP Range Requests.
- `node-http-server` supports logging request information to the console, making it easy to debug and monitor.
- `node-http-server` allows changing the server's port number and the directory being hosted by modifying the `app.js` file.

## Installation

Since the `node-http-server` project has not been published on npm, you need to clone the project first.

1. Clone the repository from GitHub to your local computer:

```bash
git clone https://github.com/rosercode/node-http-server.git
```

1. Go to the `node-http-server` directory and install dependencies:

```bash
cd node-http-server
npm install
```

If you need to install it globally:

```bash
npm install . -g
```

## Usage

1. In the `node-http-server` directory, use the following command to start the server:

```bash
node app.js
```

1. Enter the following address in the browser to access the hosted static files:

```bash
http://localhost:3000
```

### Command-line arguments

`node-http-server` supports the following command-line arguments:

- `-p, --port <port>`: Specify the port number of the server, the default is `3000`.
- `-d, --dir <directory>`: Specify the directory to host, the default is `.` (current directory).
- `-debug`: Enable request logging, disabled by default.

To use command-line arguments, pass them to the `app.js` script when starting the server. For example:

```bash
node app.js --dir=G:\video --port=30001 --debug=true
```

## Contribution

Contributions and improvements to the `node-http-server` server are welcome. If you find any bugs or have any improvement suggestions, please submit an issue or pull request on GitHub.

## License

`node-http-server` is open-sourced under the MIT license.

## Related links

- [Node.js Official Website](https://nodejs.org/)
- [Express.js Framework](https://expressjs.com/)