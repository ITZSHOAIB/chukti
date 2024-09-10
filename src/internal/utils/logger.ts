import kleur from "kleur";

type LogType = "sucess" | "error" | "warning" | "info";

export const log = (type: LogType, message: string) => {
  switch (type) {
    case "sucess":
      console.log(kleur.green(message));
      break;
    case "error":
      console.error(kleur.red(message));
      break;
    case "warning":
      console.warn(kleur.yellow(message));
      break;
    case "info":
      console.info(kleur.cyan(message));
      break;
    default:
      console.log(message);
  }
};
