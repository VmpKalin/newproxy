const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const path = require('path')

const app = express();


const PORT = process.env.PORT || 5001

app.use(cors());

// Proxy endpoint
app.use('/api', createProxyMiddleware({
  target: 'http://37.27.3.73/', // The server you want to proxy to
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    // Optionally, add headers or modify the request
    proxyReq.setHeader('Origin', 'http://37.27.3.73/');
  },
}));

// Define the endpoint
app.get('/project-info', (req, res) => {
  res.json({
    url: "https://vmpkalin.github.io/RoboCrushSaga/", // site of your application, in non webgl build use any
    name: "RoboTON", // project name, will be displayed in wallet 
    iconUrl: "https://raw.githubusercontent.com/VmpKalin/newproxy/main/logo.png" // project logo, will be displayed in wallet 
  });
});

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
