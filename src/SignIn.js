import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {customAxios} from "./utilit/customAxios";
import {LoginRoute} from "./config/APIRoute";
import {enqueueSnackbar} from "notistack";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn({setIsAuth, setToken}) {

    const authorization = (dataFromForm) => {
        customAxios('POST', LoginRoute, null, dataFromForm, false, (res) => {
            setIsAuth(true)
            setToken(res.data.data.access_token)
        }, (err) => {
            if (err.response.status === 404) {
                enqueueSnackbar('Неверный логин или пароль')
            } else {
                err.response.data?.email?.map((item) => enqueueSnackbar(item))
                err.response.data?.password?.map((item) => enqueueSnackbar(item))
            }
        })
    }
    const handleSubmit = (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            authorization({
                email: data.get('email'),
                password: data.get('password')
            })
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
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Войти
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}