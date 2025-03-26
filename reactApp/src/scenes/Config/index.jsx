import React, { useEffect, useState } from "react";
import { Box, useTheme, useMediaQuery, Typography, Button } from "@mui/material";
import Legend from "components/Legend";
import InfoCard from "components/Cards";
import StatBox from "components/StatBox";
import Pressao from "components/Pressao";
import ModelViewerWrapper from "components/Modelo";
import ButtonTrueFalse from "components/ButtonTrueFalse";
import NumericInput from "components/NumericInput";
import NumericInputVirgula from "components/NumericInputVirgula";
import { socket } from "../../socket";
import { Diversity3, Bolt } from "@mui/icons-material";
import StatBoxMotores from "components/StatBoxMotores";
import InfoIcon from '@mui/icons-material/Info';
import CardConfig from "components/CardConfig";

const Config = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1000px)");
  const [messageReceived, setMessageReceived] = useState({});

  // Configuração do socket.io
  useEffect(() => {
    socket.on("read", (data) => {
      try {
        const parsedData = JSON.parse(data);
        setMessageReceived(parsedData);
        console.log("Dados recebidos e atualizados:", parsedData);
      } catch (error) {
        console.error("Erro ao processar dados do socket:", error);
      }
    });
    return () => {
      socket.off("read");
    };
  }, []);

  return (
<Box m="0rem 0.5rem">
    {/* GRID PRINCIPAL */}
    <Box
    mt="2px"
    display="grid"
    gridTemplateColumns="repeat(12, 1fr)"
    gridAutoRows="150px"
    gap="5px"
    sx={{
        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 1" },
    }}
    >

        {/* COLUNA 1 */}
        <Box
            gridColumn="span 4"
            gridRow="span 4"
            backgroundColor={theme.palette.background.alt}
            p="0.5rem"
            borderRadius="0.55rem"
            >
            {/* Cabeçalho com título centralizado */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                p="0.5rem"
                backgroundColor={theme.palette.background.alt} 
                borderBottom={`1px solid ${theme.palette.divider}`} 
                mb="0.5rem" 
            >
                <Typography
                variant="h4" 
                sx={{
                    fontWeight: "bold", 
                    color: theme.palette.text.primary, 
                }}
                >
                Título do Container
                </Typography>
            </Box>

            {/* Conteúdo existente */}
            <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" rowGap="0.28rem">
            <CardConfig
              title="Teste"
              programmedValue={messageReceived?.hz?.alimFreqIhm || "N/A"}
              unit="kg/h"
              inputValidation={{
                maxLength: 6, // 2 dígitos + vírgula + 2 dígitos
                pattern: /^\d{1,3},\d{2}$/,
                errorMessage: "O formato deve ser 00,00!"
              }}
            />
            <CardConfig
              title="Extrusora"
              programmedValue={messageReceived?.hz?.alimFreqIhm || "N/A"}
              unit="kg/h"
            />
                        <CardConfig
              title="Extrusora"
              programmedValue={messageReceived?.hz?.alimFreqIhm || "N/A"}
              unit="kg/h"
            />
                        <CardConfig
              title="Extrusora"
              programmedValue={messageReceived?.hz?.alimFreqIhm || "N/A"}
              unit="kg/h"
            />
                        <CardConfig
              title="Extrusora"
              programmedValue={messageReceived?.hz?.alimFreqIhm || "N/A"}
              unit="kg/h"
            />
                        <CardConfig
              title="Extrusora"
              programmedValue={messageReceived?.hz?.alimFreqIhm || "N/A"}
              unit="kg/h"
            />
                        <CardConfig
              title="Extrusora"
              programmedValue={messageReceived?.hz?.alimFreqIhm || "N/A"}
              unit="kg/h"
            />

            
               
            </Box>
        </Box>


        {/* COLUNA2  – Inputs e Botões */}
        <Box
            gridColumn="span 4"
            gridRow="span 4"
            backgroundColor={theme.palette.background.alt}
            p="1.5rem"
            borderRadius="0.55rem"
            sx={{ position: "relative" }}
        >
            <NumericInputVirgula />
            
            <Box

            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            sx={{
                width: "100%",
                maxWidth: "800px",
                margin: "0 auto",
            }}
            >
            <Typography></Typography>
            <NumericInput />
            <NumericInput />
            
            </Box>
        </Box>


        {/* COLUNA 3 */}
        <Box
        gridColumn="span 4"
        gridRow="span 4"
        backgroundColor={theme.palette.background.alt}
        p="0.5rem"
        borderRadius="0.55rem"
        >
            <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" rowGap="0.5rem">
                

            </Box>
        </Box>






      </Box>
    </Box>
  );
};

export default Config;
