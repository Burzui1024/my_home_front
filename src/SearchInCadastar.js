import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {customAxios} from "./utilit/customAxios";
import {useState} from "react";
import {SearchInCadastarRoute} from "./config/APIRoute";
import {enqueueSnackbar} from "notistack";
import {SimpleTreeView} from '@mui/x-tree-view/SimpleTreeView';
import {TreeItem} from "@mui/x-tree-view";

const defaultTheme = createTheme();

export default function SearchInCadastar({token}) {

    const [dataFromCadastar, setDataFroCadastar] = useState([])
    const getDataFromBackend = (number) => {
        customAxios('POST', SearchInCadastarRoute + '/' + number, token, null, false, (res) => {
            setDataFroCadastar(res.data.data)
        }, (err) => {
            enqueueSnackbar('Ошибка получения данных, проверьте кадастровый номер')
        })
    }
    const handleSubmit = (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            getDataFromBackend(data.get('number'))
        }
    ;

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Получение данных из кадастра
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="number"
                            label="Кадастровый номер"
                            name="number"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Получить
                        </Button>
                    </Box>
                </Box>
                {dataFromCadastar.length ?
                    <Box sx={{minHeight: 352, minWidth: 250}}>
                        <Typography component="h1" variant="h5">
                            Данные
                        </Typography>
                        <SimpleTreeView>
                            {dataFromCadastar.map(item =>
                                <TreeItem key={"grid" + item.group_name} itemId={"grid" + item.group_name} label={item.group_name}>
                                    {item.data.map(childrenElement => <TreeItem key={"grid-children" + childrenElement.name}
                                        itemId={"grid-children" + childrenElement.name} label={childrenElement.name + ' '+ childrenElement.value}/>)}
                                </TreeItem>
                            )}

                        </SimpleTreeView>
                    </Box>
                    : null
                }

            </Container>
        </ThemeProvider>
    );
}