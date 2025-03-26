import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { socket } from "../socket";

const ButtonTrueFalse = ({ tag, socketVariavel, textTrue, textFalse }) => {
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    setIsTrue(socketVariavel);
  }, [socketVariavel]);

  const handleClick = () => {
    const newState = !isTrue;
    setIsTrue(newState);
    const data = { [tag]: newState };
    socket.emit("mensagem", data);
    console.log("Estado enviado:", data);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          width: "100px",
          height: "37px",
          fontSize: "14px",
          fontWeight: "arial",
          padding: "1px",
          backgroundColor: isTrue ? "#4caf50" : "#9e9e9e",
          color: "#fff",
          "&:hover": {
            backgroundColor: isTrue ? "#388e3c" : "#616161",
          },
        }}
      >
        {isTrue ? textTrue : textFalse}
      </Button>
    </Box>
  );
};

ButtonTrueFalse.defaultProps = {
  textTrue: "Automático",
  textFalse: "Manual",
};

export default ButtonTrueFalse;
