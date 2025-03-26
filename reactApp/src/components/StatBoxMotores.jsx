import React, { useState, useRef } from "react";
import { Box, Typography, useTheme, Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import FlexBetween from "./FlexBetween";
import GaugeComponent from "./Gauger";
import DialogWrapper from "./DialogWrapper";
import InfoIcon from '@mui/icons-material/Info';
import ButtonTrueFalse from "./ButtonTrueFalse";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const StatBoxMotores = ({
  title,
  value,
  unit,
  icon,
  ligado,
  minValue,
  maxValue,
  dialogTitle,
  dialogContent,
  dialogActions,
  inputValidation = {
    maxLength: 5, 
    pattern: /^\d{1,2},\d{2}$/,
    errorMessage: "O formato deve ser 00,00!"
  }
}) => {
  const theme = useTheme();

  // Estados para o teclado virtual
  const [openKeyboard, setOpenKeyboard] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const keyboardRef = useRef(null);

  // Abre o modal do teclado
  const openModal = () => {
    setInputValue("");
    setErrorMessage("");
    setOpenKeyboard(true);
  };

  // Fecha o modal do teclado
  const closeModal = () => {
    setOpenKeyboard(false);
    setErrorMessage("");
  };

  // Atualiza o valor digitado com base na regra de entrada
  const handleChange = (input) => {
    if (input.length > inputValidation.maxLength) {
      setErrorMessage(inputValidation.errorMessage);
      setInputValue("");
      keyboardRef.current.setInput("");
    } else {
      setInputValue(input);
      setErrorMessage("");
    }
  };

  // Valida a entrada e envia o objeto com o número inteiro (removendo a vírgula)
  const sendData = () => {
    if (inputValidation.pattern.test(inputValue)) {
      const numericValue = parseInt(inputValue.replace(/,/g, ''), 10);
      const payload = { tag: title, value: numericValue };
      console.log("Objeto enviado:", payload);
      closeModal();
    } else {
      setErrorMessage("Entrada Inválida");
    }
  };

  return (
    <>
      <Box
        gridColumn="span 3"
        gridRow="span 2"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p="1rem 1rem"
        flex="1 1 100%"
        backgroundColor={
          ligado ? theme.palette.secondary[900] : theme.palette.background.alt
        }
        borderRadius="0.55rem"
        sx={{
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          "&:hover": {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          },
          position: "relative",
        }}
        onClick={openModal}
      >
        <FlexBetween>
          <Typography variant="h4" sx={{ color: theme.palette.secondary[100] }}>
            {title}
          </Typography>
          {/* Impede que o clique no ícone se propague para o container pai */}
          <Box onClick={(e) => e.stopPropagation()}>
            <DialogWrapper
              triggerComponent={icon || <InfoIcon fontSize="large" />}
              title={dialogTitle}
              content={dialogContent}
              actions={dialogActions}
            />
          </Box>
        </FlexBetween>
        <Box>
          <GaugeComponent
            gaugeValue={value}
            minValue={minValue}
            maxValue={maxValue}
            unit={unit}
          />
        </Box>
        {/* Envolve os botões em um container que impede a propagação do clique */}
        <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
              position: "relative",
              top: "5px",
              left: "0px",
              zIndex: 10,
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
          <Box sx={{ flex: 1 }}>
            <ButtonTrueFalse tag={title} socketVariavel={true} textFalse={"Ligado"} textTrue={"Desligado"} />
          </Box>
          <Box sx={{ flex: 0.4 }}>
            <ButtonTrueFalse tag={title} socketVariavel={true} textFalse={"Manual"} textTrue={"Automatico"} />
          </Box>
</Box>

      </Box>

      {/* Diálogo para o teclado virtual */}
      <Dialog open={openKeyboard} onClose={closeModal}>
        <DialogContent>
          <div
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontSize: "22px",
              textAlign: "center",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {errorMessage || inputValue || title}
          </div>
          <Keyboard
            keyboardRef={(r) => (keyboardRef.current = r)}
            layout={{
              default: ["1 2 3", "4 5 6", "7 8 9", "0 , {bksp}"],
            }}
            display={{
              "{bksp}": "⌫",
            }}
            inputName="mainInput"
            onChange={handleChange}
            initialValue={inputValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={sendData} sx={{ color: "green" }}>
            Enviar
          </Button>
          <Button onClick={closeModal} color="secondary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StatBoxMotores;
