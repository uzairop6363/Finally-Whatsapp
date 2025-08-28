import { useState } from "react";

export default function Home() {
  const [target, setTarget] = useState("");
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [otp, setOtp] = useState(null);
  const [progress, setProgress] = useState(0);

  function addLog(text) {
    setLogs((prev) => [...prev, { id: Date.now() + Math.random(), text }]);
  }

  function generateOtp() {
    return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  }

  async function runSimulation() {
    if (!/^\d{6,15}$/.test(target)) {
      alert("Enter a valid number (6–15 digits). Simulation only!");
      return;
    }

    setRunning(true);
    setLogs([]);
    setOtp(null);
    setProgress(0);

    addLog(`>> Target selected: ${target}`);
    addLog(">> Initializing hacking module...");

    const steps = [
      "Establishing secure tunnel",
      "Bypassing firewall (simulation)",
      "Decrypting packets",
      "Extracting OTP seed"
    ];

    for (let step of steps) {
      addLog(`- ${step}...`);
      await fakeProgress();
      addLog(`  ✓ ${step} complete`);
    }

    await sleep(1000);
    const generated = generateOtp();
    setOtp(generated);
    addLog("===== SIMULATION COMPLETE =====");
    addLog(`Your OTP: ${generated}`);
    setRunning(false);
  }

  function fakeProgress() {
    return new Promise((resolve) => {
      let prog = 0;
      const interval = setInterval(() => {
        prog += Math.random() * 20;
        if (prog >= 100) {
          prog = 100;
          clearInterval(interval);
          setTimeout(() => {
            setProgress(0);
            resolve();
          }, 300);
        } else {
          setProgress(Math.floor(prog));
        }
      }, 200);
    });
  }

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  return (
    <div className="page-root">
      {/* Top Banner */}
      <header className="banner">HACK MADE BY C9 UZAIR</header>

      {/* Center Input & Logs */}
      <div className="center-wrapper">
        <div className="card">
          <input
            className="input"
            type="text"
            placeholder="Enter target number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            disabled={running}
          />
          <div className="btns">
            <button className="btn primary" onClick={runSimulation} disabled={running}>
              {running ? "Running..." : "Start"}
            </button>
          </div>

          {running && (
            <div className="progress-wrap">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
          )}

          {otp && (
            <div className="otp-card">
              <div className="otp-title">Your OTP</div>
              <div className="otp-code">{otp}</div>
            </div>
          )}
        </div>

        <div className="logs">
          {logs.map((l) => (
            <div key={l.id} className="log-line">{l.text}</div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div style={{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "18px",
        marginBottom: "6px",
        color: "#00ff9d"
      }}>
        WHATSAPP HACK
      </div>
      <footer className="disclaimer">
        Use for legal purpose only. Do not use illegally.
      </footer>
    </div>
  );
        }
