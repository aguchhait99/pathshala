import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Pagnition = ({count, onChange}) => {

  return (
    <>
      <Stack spacing={2} sx={{ mb: 4 }} alignItems={"center"}>
        <Pagination
          count={count}
          color="error"
          showFirstButton={true}
          showLastButton={true}
          defaultPage={1}
          onChange={onChange}
        />
      </Stack>
    </>
  );
};

export default Pagnition;
