import { spawn } from 'node:child_process';
import fs from 'node:fs';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9222;

const chrome = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--window-size=1280,1000',
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-background-networking',
  '--disable-gpu',
  'about:blank'
], { stdio: 'ignore' });

// Wait for Chrome to open debugging port
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

  // Create new target for index.html
  const { targetId } = await send('Target.createTarget', { url: 'http://127.0.0.1:8765/index.html' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

  function sendSession(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
    });
  }

  await sendSession('Page.enable');
  await sendSession('DOM.enable');

  // Wait for load
  await new Promise(r => setTimeout(r, 1500));

  // Dismiss cookie banner and scroll to #creator-outliers
  await sendSession('Runtime.evaluate', {
    expression: `
      document.querySelector('.cookie-banner')?.remove();
      document.querySelector('#cookie-consent')?.remove();
      document.querySelectorAll('[class*="cookie"]').forEach(e => e.remove());
      const el = document.getElementById('creator-outliers');
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.scrollBy(0, -70);
      document.querySelectorAll('.reveal').forEach(r => r.classList.add('visible'));
    `
  });

  await new Promise(r => setTimeout(r, 600));

  // Capture Desktop Card 1 (Instagram Outliers)
  const snap1 = await sendSession('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/Users/bhavishyasingla/.gemini/antigravity-ide/brain/52182d57-0194-4e83-bf80-1fc4d9c908cb/deck-desktop-instagram.png', Buffer.from(snap1.data, 'base64'));
  console.log('Saved deck-desktop-instagram.png');

  // Click next button to swap to YouTube card
  await sendSession('Runtime.evaluate', {
    expression: `
      document.getElementById('deck-next-btn')?.click();
    `
  });
  await new Promise(r => setTimeout(r, 500));

  // Capture Desktop Card 2 (YouTube Outliers)
  const snap2 = await sendSession('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/Users/bhavishyasingla/.gemini/antigravity-ide/brain/52182d57-0194-4e83-bf80-1fc4d9c908cb/deck-desktop-youtube.png', Buffer.from(snap2.data, 'base64'));
  console.log('Saved deck-desktop-youtube.png');

  // Click [▶ Live Video] on YouTube Card
  await sendSession('Runtime.evaluate', {
    expression: `
      const ytCard = document.getElementById('card-youtube');
      ytCard.querySelector('.deck-video-btn')?.click();
    `
  });
  await new Promise(r => setTimeout(r, 600));

  const snapVideo = await sendSession('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/Users/bhavishyasingla/.gemini/antigravity-ide/brain/52182d57-0194-4e83-bf80-1fc4d9c908cb/deck-desktop-video.png', Buffer.from(snapVideo.data, 'base64'));
  console.log('Saved deck-desktop-video.png');

  // Now emulate mobile (390x844)
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sendSession('Runtime.evaluate', {
    expression: `
      // Switch back to Instagram card
      document.getElementById('deck-next-btn-mobile')?.click();
      const el = document.getElementById('creator-outliers');
      if (el) {
        window.scrollTo(0, el.offsetTop - 20);
      }
    `
  });
  await new Promise(r => setTimeout(r, 600));

  const snapMobile = await sendSession('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/Users/bhavishyasingla/.gemini/antigravity-ide/brain/52182d57-0194-4e83-bf80-1fc4d9c908cb/deck-mobile.png', Buffer.from(snapMobile.data, 'base64'));
  console.log('Saved deck-mobile.png');

  ws.close();
} finally {
  chrome.kill();
}
