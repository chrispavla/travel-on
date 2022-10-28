import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Icon } from "semantic-ui-react";

function Signup() {
  let [user, setUser] = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);

  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    let user = {
      first_name: firstName,
      last_name: lastName,
      profile_image: profileImage,
      username: username,
      password: password,
    };

    setIsLoading(true);

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
        history.push("/");
      } else {
        r.json().then((error) => setError(error.errors));
      }
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                placeholder="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                placeholder="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                placeholder="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="profileImage"
                placeholder="Profile image"
                name="profileImage"
                autoComplete="profileImage"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 2 }}
            >
              {isLoading ? "Loading..." : "Sign up"}
            </Button>
            {error
              ? error.map((err) => (
                  <div className="errors">
                    <Icon name="warning circle"></Icon>
                    {err}
                  </div>
                ))
              : null}
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2" sx={{ ml: 2 }}>
                  {"Already have an account? Log in"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    // <div>
    //   <h3>Signup</h3>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <div>
    //         <label>
    //           First name
    //           <input
    //             type="text"
    //             name="firstname"
    //             value={firstName}
    //             onChange={(e) => setFirstName(e.target.value)}
    //           ></input>
    //         </label>
    //       </div>
    //       <label>
    //         Last name
    //         <input
    //           type="text"
    //           name="lastname"
    //           value={lastName}
    //           onChange={(e) => setLastName(e.target.value)}
    //         ></input>
    //       </label>
    //       <div>
    //         <label>
    //           Profile Image
    //           <input
    //             type="text"
    //             name="profileimage"
    //             value={profileImage}
    //             onChange={(e) => setProfileImage(e.target.value)}
    //           ></input>
    //         </label>
    //       </div>
    //       <div>
    //         <label>
    //           Username
    //           <input
    //             type="text"
    //             name="username"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //           ></input>
    //         </label>
    //       </div>
    //     </div>
    //     <div>
    //       <label>
    //         Password
    //         <input
    //           id="myInput"
    //           type="password"
    //           name="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         ></input>
    //       </label>
    //     </div>
    //     <div>
    //       <div>
    //         <div>
    //           <input type="checkbox" onClick={handleShowPassword} />
    //           <label>Show Password</label>
    //         </div>
    //       </div>
    //     </div>
    //     <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
    //   </form>
    //   {error ? error.map((err) => <div>{err}</div>) : null}
    //   <div>
    //     <p>Already registered?</p>
    //     <a href="/login">Log in</a>
    //   </div>
    // </div>
  );
}

export default Signup;
