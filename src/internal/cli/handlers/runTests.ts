import kleur from "kleur";
// import { execa } from "execa";

export const runTests = async () => {
  try {
    console.log(kleur.cyan("🚀 Running Cucumber tests..."));
    // console.log("🚀 Running Cucumber tests...");
    const execa = (await import("execa")).execa;
    await execa("npx", ["cucumber-js"], { stdio: "inherit" });
    // execSync("npx cucumber-js", { stdio: "inherit" });
    console.log(kleur.green("✅ Tests completed successfully"));
    // console.log("✅ Tests completed successfully");
  } catch (error) {
    console.error(
      kleur.red(`❌ Error during tests: ${(error as Error).message}`)
    );
    process.exit(1);
  }
};
