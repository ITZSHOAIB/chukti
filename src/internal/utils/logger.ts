import { log as promptLog } from "@clack/prompts";
import color from "picocolors";

type LogType = "success" | "error" | "warning" | "info";

export const log = (type: LogType, message: string) => {
  const formattedMessage = message.replace(/(https?:\/\/[^\s]+)/g, (url) =>
    makeUrlClickable(url),
  );

  switch (type) {
    case "success":
      promptLog.success(color.green(formattedMessage));
      break;
    case "error":
      promptLog.error(color.red(formattedMessage));
      break;
    case "warning":
      promptLog.warn(color.yellow(formattedMessage));
      break;
    case "info":
      promptLog.info(color.cyan(formattedMessage));
      break;
    default:
      promptLog.message(formattedMessage);
  }
};

const makeUrlClickable = (url: string) => {
  return `\u001b]8;;${url}\u001b\\${url}\u001b]8;;\u001b\\`;
};
