import { Alert } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../redux/slice/alertSlice";

export default function AlertMessage() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert.message) {
      setTimeout(() => {
        dispatch(hideAlert());
      }, 3000);
    }
  }, [alert.message]);

  return (
    Boolean(alert.message) && (
      <Alert
        severity={alert.type}
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "20px",
          mx: "20px",
        }}
      >
        {alert.message}
      </Alert>
    )
  );
}
