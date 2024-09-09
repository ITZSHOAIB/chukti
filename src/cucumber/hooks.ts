import { spawn } from "child_process";
import commandExists from "command-exists";

let anvilProcess: any;

export const beforeAll = async () => {
  console.log("Starting test environment...");

  const isAnvilExist = commandExists.sync("anvil");
  if (!isAnvilExist) {
    console.error("Anvil is not installed. Please install it first.");
    process.exit(1);
  }

  const startAnvil = async (
    retries: number = 5,
    delay: number = 1000
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      anvilProcess = spawn("anvil", { stdio: "pipe" });

      let stdio = "";
      let stderr = "";

      const onData = (data: any) => {
        stdio += data.toString();
        if (stdio.includes("Listening on")) {
          cleanup();
          resolve();
        }
      };

      const onError = (data: any) => {
        stderr += data.toString();
        console.error(`Error while starting Local blockchain anvil:
          stdout: ${stdio}
          stderr: ${stderr}`);
        if (retries > 0) {
          console.log(`Retrying to start anvil... (${retries} retries left)`);
          setTimeout(
            () =>
              startAnvil(retries - 1, delay * 2)
                .then(resolve)
                .catch(reject),
            delay
          );
        } else {
          cleanup();
          reject(new Error("Failed to start anvil after multiple attempts"));
        }
      };

      const onClose = () => {
        console.log(`Local blockchain exited`);
      };

      const cleanup = () => {
        anvilProcess.stdout.off("data", onData);
        anvilProcess.stderr.off("data", onError);
        anvilProcess.off("close", onClose);
      };

      anvilProcess.stdout.on("data", onData);
      anvilProcess.stderr.on("data", onError);
      anvilProcess.on("close", onClose);
    });
  };

  await startAnvil();
};

export const afterAll = () => {
  anvilProcess.kill();
  console.log("Local blockchain stopped");
};
