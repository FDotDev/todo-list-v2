import { createContext, useState } from "react";
import type { ReactNode } from "react";

import { Alert, List, Snackbar, type AlertProps } from "@mui/material";

interface AlertContextModel {
  showAlert: (message: string, severity: AlertProps["severity"]) => void;
}

export const AlertContext = createContext({} as AlertContextModel);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] =
    useState<AlertProps["severity"]>("info");

  const showAlert = (message: string, severity: AlertProps["severity"]) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setOpenAlert(true);
  };

  const onCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      <List>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={onCloseAlert}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={alertSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </List>
      {children}
    </AlertContext.Provider>
  );
};
