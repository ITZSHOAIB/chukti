import kleur from "kleur";

type LogType = "success" | "error" | "warning" | "info";

export const log = (type: LogType, message: string) => {
  const formattedMessage = message.replace(/(https?:\/\/[^\s]+)/g, (url) =>
    makeUrlClickable(url)
  );

  switch (type) {
    case "success":
      console.log(kleur.green(formattedMessage));
      break;
    case "error":
      console.error(kleur.red(formattedMessage));
      break;
    case "warning":
      console.warn(kleur.yellow(formattedMessage));
      break;
    case "info":
      console.info(kleur.cyan(formattedMessage));
      break;
    default:
      console.log(formattedMessage);
  }
};

const makeUrlClickable = (url: string) => {
  return `\u001b]8;;${url}\u001b\\${url}\u001b]8;;\u001b\\`;
};
