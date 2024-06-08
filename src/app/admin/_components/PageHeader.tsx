import { Typography } from "@mui/material";
import { ReactNode } from "react";

export const PageHeader = ({ children}: {children: ReactNode}) => {
  return (
    <Typography variant="h2">
      {children}
    </Typography>
  )
}