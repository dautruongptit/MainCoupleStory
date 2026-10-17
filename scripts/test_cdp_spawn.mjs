import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = join(tmpdir(), "chrome_cdp_" + Date.now());
const chrome = spawn(
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--remote-debugging-address=127.0.0.1",
    "--user-data-dir=" + dataDir,
    "--disable-gpu",
    "--no-first-run",
    "about:blank",
  ],
  { stdio: "ignore" }
);

console.log("Chrome spawned, PID:", chrome.pid);

// Wait 1.5s then check http://127.0.0.1:9222/json/version
setTimeout(async () => {
  try {
    const res = await fetch("http://127.0.0.1:9222/json/version");
    const json = await res.json();
    console.log("CDP Connected successfully:", json);
  } catch (err) {
    console.error("CDP Connect failed:", err.message);
  } finally {
    chrome.kill();
  }
}, 1500);
