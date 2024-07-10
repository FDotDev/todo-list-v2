import { useContext } from "react";
import { AlertContext } from "../providers";

export const useAlert = () => {
  const alertContext = useContext(AlertContext);

  if (!alertContext) {
    throw new Error("useAlert must be used within an AlertProvider");
  }

  return { showAlert: alertContext.showAlert };
};
