import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0].split('#')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = '/Users/bhavishyasingla/Projects/Rankkiwi website' + reqPath;
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = filePath.split('.').pop();
    const mimeMap = {
      html: 'text/html',
      css: 'text/css',
      js: 'text/javascript',
      png: 'image/png',
      webp: 'image/webp',
      svg: 'image/svg+xml'
    };
    res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(8992);

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9230;

const chrome = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--window-size=390,844',
  'about:blank'
], { stdio: 'ignore' });

await new Promise(r => setTimeout(r, 1200));

try {
  const versionRes = await fetch(`http://127.0.0.1:${port}/json/version`);
  const versionData = await versionRes.json();
  const wsUrl = versionData.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const pending = new Map();
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  const { targetId } = await send('Target.createTarget', { url: 'http://127.0.0.1:8992/index.html' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

  function sendSession(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
    });
  }

  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  await sendSession('Page.enable');
  await new Promise(r => setTimeout(r, 1500));

  await sendSession('Runtime.evaluate', {
    expression: `
      (() => {
        document.querySelectorAll('[class*="cookie"]').forEach(e => e.remove());
        document.querySelectorAll('.reveal').forEach(r => r.classList.add('visible'));
        const el = document.getElementById('outlier-score');
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
        const card = document.querySelector('.score-card');
        if (card) {
          card.classList.add('is-animated');
          document.querySelectorAll('.histogram-bar').forEach(b => {
            b.style.height = b.dataset.height || '0%';
          });
        }
      })()
    `
  });

  await new Promise(r => setTimeout(r, 1200));

  const snapMobile = await sendSession('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/Users/bhavishyasingla/.gemini/antigravity-ide/brain/52182d57-0194-4e83-bf80-1fc4d9c908cb/outlier-score-mobile.png', Buffer.from(snapMobile.data, 'base64'));
  console.log('Saved outlier-score-mobile.png successfully');

  ws.close();
} finally {
  chrome.kill();
  server.close();
}
