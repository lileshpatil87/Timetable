// src/pages/SettingsIntegrations.jsx
import React, { useEffect, useState } from "react";
import styles from "../styles/SettingsIntegrations.module.css";

function loadSettings() {
  const s = localStorage.getItem("settingsIntegrations");
  return s
    ? JSON.parse(s)
    : {
        policyPackVersion: "UGC-CCFUGP-2022",
        samarth: {
          enabled: true,
          baseUrl: "https://uohyd.samarth.edu.in",
          mode: "Read-only",
          modules: {
            programs: true,
            courses: true,
            students: true,
            faculty: true,
            rooms: true,
          },
          status: "Not tested",
        },
        abc: {
          readiness: true,
          policy: { requireABCId: false, allowEnrollWithoutABC: true },
          status: "Not tested",
        },
        sync: { nightly: true, time: "01:30" },
        logs: [],
      };
}

export default function SettingsIntegrations() {
  const [settings, setSettings] = useState(loadSettings());
  const [statusMsg, setStatusMsg] = useState("Ready");

  useEffect(() => {
    localStorage.setItem("settingsIntegrations", JSON.stringify(settings));
  }, [settings]);

  const testSamarth = async () => {
    setStatusMsg("Testing Samarth connection…");
    setSettings((s) => ({
      ...s,
      samarth: { ...s.samarth, status: "Testing…" },
    }));
    await new Promise((r) => setTimeout(r, 900));
    // Prototype: pretend healthy if URL looks like Samarth
    const ok = /^https:\/\/.+samarth\.edu\.in/.test(settings.samarth.baseUrl);
    setSettings((s) => ({
      ...s,
      samarth: { ...s.samarth, status: ok ? "Healthy" : "Unreachable" },
    }));
    setStatusMsg(
      ok ? "Samarth connection healthy." : "Samarth connection failed."
    );
  };

  const testABC = async () => {
    setStatusMsg("Testing ABC readiness…");
    setSettings((s) => ({ ...s, abc: { ...s.abc, status: "Testing…" } }));
    await new Promise((r) => setTimeout(r, 700));
    // Prototype: readiness only (no network)
    setSettings((s) => ({
      ...s,
      abc: { ...s.abc, status: s.abc.readiness ? "Ready" : "Disabled" },
    }));
    setStatusMsg(
      settings.abc.readiness ? "ABC marked as ready." : "ABC disabled."
    );
  };

  const addLog = (line) => {
    const row = { ts: new Date().toISOString(), line };
    setSettings((s) => ({ ...s, logs: [row, ...s.logs].slice(0, 50) }));
  };

  const save = () => {
    addLog("Saved settings and integration toggles");
    setStatusMsg("Settings saved.");
    alert("Settings saved.");
  };

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings & Integrations</h1>
        <p className={styles.subtitle}>
          Manage policy packs and external integrations with accessible, safe
          test connections.
        </p>
      </header>

      <main className={styles.main}>
        <section className={styles.card} aria-labelledby="policy-title">
          <h2 id="policy-title" className={styles.sectionTitle}>
            Policy pack
          </h2>
          <div className={styles.row3}>
            <label className={styles.label}>
              <span>Policy pack version</span>
              <input
                className={styles.input}
                value={settings.policyPackVersion}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    policyPackVersion: e.target.value,
                  }))
                }
              />
            </label>
            <div className={styles.help}>
              Versioning aligns institutional rules with FYUGP/ITEP updates for
              auditability and future‑proofing.
            </div>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="samarth-title">
          <h2 id="samarth-title" className={styles.sectionTitle}>
            Samarth eGov
          </h2>
          <p className={styles.help}>
            Enable read‑only sync of Programs, Courses, Students, Faculty, and
            Rooms from the Samarth suite; writebacks will be added server‑side
            in production.
          </p>
          <div className={styles.row3}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={settings.samarth.enabled}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    samarth: { ...s.samarth, enabled: e.target.checked },
                  }))
                }
              />
              <span>Enable Samarth integration</span>
            </label>
            <label className={styles.label}>
              <span>Base URL</span>
              <input
                className={styles.input}
                value={settings.samarth.baseUrl}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    samarth: { ...s.samarth, baseUrl: e.target.value },
                  }))
                }
                placeholder="https://{inst}.samarth.edu.in"
              />
            </label>
            <label className={styles.label}>
              <span>Mode</span>
              <select
                className={styles.input}
                value={settings.samarth.mode}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    samarth: { ...s.samarth, mode: e.target.value },
                  }))
                }
              >
                <option>Read-only</option>
                <option disabled>Read/Write (server)</option>
              </select>
            </label>
          </div>

          <fieldset className={styles.fieldset}>
            <legend>Modules</legend>
            <div className={styles.checks}>
              {Object.keys(settings.samarth.modules).map((k) => (
                <label key={k} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={settings.samarth.modules[k]}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        samarth: {
                          ...s.samarth,
                          modules: {
                            ...s.samarth.modules,
                            [k]: e.target.checked,
                          },
                        },
                      }))
                    }
                  />
                  <span>{k[0].toUpperCase() + k.slice(1)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={styles.actions}>
            <button className={styles.secondaryBtn} onClick={testSamarth}>
              Test connection
            </button>
            <span className={styles.badge}>
              Status: {settings.samarth.status}
            </span>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="abc-title">
          <h2 id="abc-title" className={styles.sectionTitle}>
            Academic Bank of Credits
          </h2>
          <p className={styles.help}>
            Mark ABC readiness, capture ABC ID policies, and prepare for future
            DigiLocker/ABC credit synchronization in production deployments.
          </p>
          <div className={styles.row3}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={settings.abc.readiness}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    abc: { ...s.abc, readiness: e.target.checked },
                  }))
                }
              />
              <span>Mark ABC integration as ready</span>
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={settings.abc.policy.requireABCId}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    abc: {
                      ...s.abc,
                      policy: {
                        ...s.abc.policy,
                        requireABCId: e.target.checked,
                      },
                    },
                  }))
                }
              />
              <span>Require ABC ID at enrollment</span>
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={settings.abc.policy.allowEnrollWithoutABC}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    abc: {
                      ...s.abc,
                      policy: {
                        ...s.abc.policy,
                        allowEnrollWithoutABC: e.target.checked,
                      },
                    },
                  }))
                }
              />
              <span>Allow temporary enrollment without ABC</span>
            </label>
          </div>

          <div className={styles.actions}>
            <button className={styles.secondaryBtn} onClick={testABC}>
              Test readiness
            </button>
            <span className={styles.badge}>Status: {settings.abc.status}</span>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="sync-title">
          <h2 id="sync-title" className={styles.sectionTitle}>
            Data sync
          </h2>
          <div className={styles.row3}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={settings.sync.nightly}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    sync: { ...s.sync, nightly: e.target.checked },
                  }))
                }
              />
              <span>Enable nightly sync</span>
            </label>
            <label className={styles.label}>
              <span>Nightly time (HH:MM)</span>
              <input
                className={styles.input}
                value={settings.sync.time}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    sync: { ...s.sync, time: e.target.value },
                  }))
                }
              />
            </label>
            <div className={styles.help}>
              Nightly sync will import Samarth entities and reconcile ABC IDs
              where applicable in the final build.
            </div>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="logs-title">
          <h2 id="logs-title" className={styles.sectionTitle}>
            Integration logs
          </h2>
          <table className={styles.table}>
            <caption className={styles.caption}>
              Recent integration status and actions
            </caption>
            <thead>
              <tr>
                <th scope="col">Timestamp</th>
                <th scope="col">Message</th>
              </tr>
            </thead>
            <tbody>
              {settings.logs.length === 0 && (
                <tr>
                  <td colSpan={2}>No log entries yet</td>
                </tr>
              )}
              {settings.logs.map((row, i) => (
                <tr key={i}>
                  <td>{row.ts}</td>
                  <td>{row.line}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className={styles.actionsBar}>
          <button className={styles.primaryBtn} onClick={save}>
            Save Settings
          </button>
          <div role="status" aria-live="polite" className={styles.statusLine}>
            {statusMsg}
          </div>
        </div>
      </main>
    </div>
  );
}
