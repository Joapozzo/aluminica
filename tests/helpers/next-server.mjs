import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../..", import.meta.url));

export async function withNextServer(port, run) {
  const child = spawn(
    process.execPath,
    [fileURLToPath(new URL("../../node_modules/next/dist/bin/next", import.meta.url)), "start", "--hostname", "127.0.0.1", "--port", String(port)],
    {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env },
    },
  );

  let stderr = "";
  child.stderr?.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  const baseUrl = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let attempt = 0; attempt < 90; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`Next server exited early (${child.exitCode}): ${stderr || "no stderr"}`);
    }
    try {
      const response = await fetch(baseUrl, { redirect: "manual" });
      if (response.status > 0) {
        ready = true;
        break;
      }
    } catch {
      // Server still booting.
    }
    await sleep(500);
  }

  if (!ready) {
    child.kill("SIGTERM");
    throw new Error(`Next server did not become ready on ${baseUrl}. ${stderr}`);
  }

  try {
    return await run(baseUrl);
  } finally {
    child.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => child.once("exit", resolve)),
      sleep(3000),
    ]);
  }
}
