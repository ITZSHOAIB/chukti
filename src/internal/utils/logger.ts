import color from "picocolors";

type LogType = "success" | "error" | "warning" | "info";

export const log = (type: LogType, message: string) => {
  const formattedMessage = message.replace(/(https?:\/\/[^\s]+)/g, (url) =>
    makeUrlClickable(url)
  );

  switch (type) {
    case "success":
      console.log(color.green(formattedMessage));
      break;
    case "error":
      console.error(color.red(formattedMessage));
      break;
    case "warning":
      console.warn(color.yellow(formattedMessage));
      break;
    case "info":
      console.info(color.cyan(formattedMessage));
      break;
    default:
      console.log(formattedMessage);
  }
};

const makeUrlClickable = (url: string) => {
  return `\u001b]8;;${url}\u001b\\${url}\u001b]8;;\u001b\\`;
};
