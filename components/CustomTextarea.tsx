import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { TextField } from "@mui/material";

const CustomTextarea = (props: any) => {
  return (
    <TextField
      {...props}
      multiline
      minRows={4} // Adjust the number of rows as needed
      fullWidth
    />
  );
};

export default withJsonFormsControlProps(CustomTextarea);
