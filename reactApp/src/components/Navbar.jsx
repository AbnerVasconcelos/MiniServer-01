import React, { useState, useEffect } from "react";
import {
  LightModeOutlined,
  Menu as MenuIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Collapse,
  Alert,
  Button,
  Typography,
  useTheme,
} from "@mui/material";

const initialAlarms = [
  { id: 1, message: "Queda de comunicação com o PLC !", active: true },
  { id: 2, message: "Falta de material no Funil A !", active: true },
  { id: 3, message: "Falta de material no Funil B !", active: true },
  { id: 4, message: "Falta de material no Funil C !", active: true },
  { id: 5, message: "Falta de material no Funil D !", active: true },
  { id: 6, message: "Célula da balança desconectada!", active: true },
  { id: 7, message: "Sem Material no Bag, Funis não conseguem se abastecer!", active: true },
  { id: 8, message: "Falha no motor do puxador", active: true },
  { id: 9, message: "Falha no motor da extrusora", active: true },
  { id: 10, message: "Falha na leitura do encoder", active: true },
];

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Estado dos alarmes (mock data)
  const [alarms, setAlarms] = useState(initialAlarms);

  // Atualiza a data e hora a cada segundo
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // (Opcional) Simula atualização dos alarmes a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setAlarms((prevAlarms) =>
        prevAlarms.map((alarm) => ({
          ...alarm,
          active: Math.random() < 0.3, // 30% de chance de estar ativo
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", position: "relative" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* CENTER: Data e Hora */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem", // letra aumentada
              color: theme.palette.text.secondary, // utiliza a cor base do tema
              fontWeight: 600,
            }}
          >
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </Typography>
        </Box>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            <LightModeOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>

        {/* Container de alertas – comentado para este exemplo */}
        {/*
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            left: isSidebarOpen ? "100px" : "50%",
            transform: isSidebarOpen ? "none" : "translateX(-50%)",
            width: isSidebarOpen ? "calc(100% - 200px)" : "100%",
            maxWidth: "800px",
            zIndex: 1300,
          }}
        >
          {alarms
            .filter((alarm) => alarm.active)
            .map((alarm, index) => (
              <Box
                key={alarm.id}
                sx={{
                  position: "absolute",
                  top: `${index * 10}px`,
                  left: 0,
                  right: 0,
                  zIndex: 1000 + index,
                }}
              >
                <Collapse in={alarm.active}>
                  <Alert
                    severity="error"
                    variant="outlined"
                    icon={<WarningIcon />}
                    action={
                      <>
                        <Button
                          color="inherit"
                          size="small"
                          onClick={() =>
                            setAlarms((prev) =>
                              prev.map((a) =>
                                a.id === alarm.id ? { ...a, active: false } : a
                              )
                            )
                          }
                        >
                          Undo
                        </Button>
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() =>
                            setAlarms((prev) =>
                              prev.map((a) =>
                                a.id === alarm.id ? { ...a, active: false } : a
                              )
                            )
                          }
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      </>
                    }
                    sx={{
                      backgroundColor: "#d32f2f",
                      color: "#fff",
                      "& .MuiAlert-icon": { color: "#fff" },
                    }}
                  >
                    {alarm.message}
                  </Alert>
                </Collapse>
              </Box>
            ))}
        </Box>
        */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
