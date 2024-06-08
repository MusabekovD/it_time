import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import security from "../assets/security-login.jpg";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Material UI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();
const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const apiAuth = "https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin";
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  });
  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${apiAuth}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: login,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          localStorage.setItem(
            "accessToken",
            data.data.tokens.accessToken.token
          );
          navigate("/home");
          toast.success("Muvafaqqiyatli kirildi!");
        } else {
          toast.error("Login yoki parol xato!");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${security})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",

              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Login"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => {
                    setLogin(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>

                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>

      {/*     <div className="flex justify-center items-center h-screen  ">
        <form
          action=""
          onSubmit={handleLogin}
          className="border  rounded-md border-cyan-800 p-8 flex flex-col "
        >
          <input
            type="text"
            className="border border-cyan-800 my-3 p-2 rounded-md"
            placeholder="Enter your Login"
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
          <input
            type="text"
            className="border border-cyan-800 my-3 p-2 rounded-md"
            placeholder="Enter your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </div> */}
    </>
  );
};

export default Login;
