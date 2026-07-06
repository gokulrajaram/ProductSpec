import { mkdir, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("npm", ["--prefix", "parsers/ts", "install"]);
run("npm", ["--prefix", "parsers/ts", "run", "build"]);

await mkdir("dist", { recursive: true });
await writeFile("dist/cli.js", 'import "../parsers/ts/dist/cli.js";\n');
