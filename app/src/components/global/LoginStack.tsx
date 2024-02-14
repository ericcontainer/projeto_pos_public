import {
  AlertColor,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import { app } from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { tokens } from "../../theme";
import { useState } from "react";
import Message from "./Message";
import {
  getUsuarioService,
  setUsuarioService,
} from "../../services/commonServices";

const LoginStack = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<AlertColor>("success");
  const [message, setMessage] = useState("");

  const handleClick = (type: AlertColor, message: string) => {
    setOpen(true);
    setType(type);
    setMessage(message);
    setTimeout(() => setOpen(false), 6000);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
  //   setEmail(event.target.value);
  // };

  const handleRegister = () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        try {
          getUsuarioService(user.email || undefined).then((r) => {
            r.json().then((data) => {
              console.log(data["email"]);
              if (data["data"]["email"] != user.email) {
                setUsuarioService({
                  id: user.email || "",
                  nome: user.email || "",
                  descricao: "Login Email",
                  email: user.email || "",
                  status: "ativo",
                  grupo: "user",
                  foto: user.photoURL || "",
                });
              }
            });
          });
        } catch (error) {
          console.log("Erro para registrar usuário no StackMedia!");
        }
        handleClick("success", "Usuário Criado com Sucesso!");
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/weak-password") {
          handleClick(
            "error",
            "Error! Senha deve conter mais de 6 caracteres!"
          );
        }
        if (errorCode === "auth/email-already-in-use") {
          handleClick("error", "Error! Usuário já cadastrado!");
        }
        if (errorCode === "auth/invalid-email") {
          handleClick("error", "Email inválido!");
        }
        if (errorCode === "auth/missing-email") {
          handleClick("error", "Informe um Email!");
        }
      });
  };

  const handleLogin = () => {
    // Lógica de autenticação aqui
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // const user = userCredential.user;
        handleClick("success", "Usuário Logado com Sucesso!");
      })
      .catch(() => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        handleClick("error", "Falha na autenticação! Email ou Senha inválido!");
      });
  };

  const handleLoginGoogle = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential ? credential.accessToken : null;
        const user = result.user;
        // const nameUser = result.user.displayName;
        // const emailUser = result.user.email;
        // const photoUser = result.user.photoURL;

        try {
          getUsuarioService(user.email!).then((r) => {
            r.json().then((data) => {
              if (data["data"]["email"] != user.email) {
                setUsuarioService({
                  id: user.email || "",
                  nome: user.displayName || "",
                  descricao: "Login Google",
                  email: user.email || "",
                  status: "ativo",
                  grupo: "user",
                  foto: user.photoURL || "",
                });
              }
            });
          });
        } catch (error) {
          console.log("Erro para registrar usuário no StackMedia!");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(
          "ErrorCode ",
          errorCode,
          "ErrorMessage ",
          errorMessage,
          "Email ",
          email,
          "Credential ",
          credential
        );
      });
  };
  return (
    <Container sx={{ mt: "100px", width: 350 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "5px",
          color: colors.grey[100],
          backgroundColor: colors.primary[400],
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            mt: "20px",
          }}
          gutterBottom
        >
          Log In
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ m: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 1, backgroundColor: colors.blueAccent[300] }}
            onClick={handleLogin}
            startIcon={<LoginIcon />}
          >
            Entrar
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{ mb: 2, p: 1 }}
            startIcon={<GoogleIcon />}
            onClick={handleLoginGoogle}
          >
            Login Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ p: 1 }}
            onClick={handleRegister}
            startIcon={<AssignmentIndIcon />}
          >
            Registrar
          </Button>
          <Message type={type} message={message} open={open} />
        </Box>
      </Box>
    </Container>
  );
};

export default LoginStack;
