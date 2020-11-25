import React, { useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Logo from "../assets/logo.svg";
import { useAuth } from "../hooks/useAuth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: linear-gradient(rgba(0, 152, 141, 0.68), rgba(0, 152, 141, 0.68)),
    url("/assets/login-register-background.jpg");
  background-size: cover;

  padding: 48px;
  width: 100%;

  margin-top: -32px;
  margin-bottom: 64px;

  @media screen and (max-width: 600px) {
    padding: 64px;
    margin: 0;
  }
`;

const FormLabel = styled(Form.Label)`
  color: white;
`;

function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const { register } = useAuth();

  const userRegister = async () => {
    if (password !== rePassword) {
      alert("La contraseña y la confirmación de contraseña no coinciden");
      return;
    }

    try {
      await register({
        firstName: name,
        lastName: lastName,
        email: email,
        password: password,
      });

      window.location.href = "/login";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <div style={{ marginTop: 50 }}>
        <img src={Logo} alt="" />
      </div>

      <h1>Chamba Si</h1>
      <h1>Hay</h1>

      <Form.Group style={{ width: "100%" }}>
        <Form.Group>
          <FormLabel>Nombre</FormLabel>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nombre"
            name="name"
          />
        </Form.Group>
        <Form.Group>
          <FormLabel>Apellido</FormLabel>
          <Form.Control
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Apellido"
            name="lastname"
          />
        </Form.Group>
        <Form.Group>
          <FormLabel>Email</FormLabel>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            name="email"
          />
        </Form.Group>
        <Form.Group>
          <FormLabel>Contraseña</FormLabel>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Contraseña"
            name="password"
          />
        </Form.Group>
        <Form.Group>
          <FormLabel>Confirmar Contraseña</FormLabel>
          <Form.Control
            onChange={(e) => setRePassword(e.target.value)}
            type="password"
            placeholder="Contraseña"
            name="confirmPassword"
          />
        </Form.Group>
        <Form.Group>
          <Button
            onClick={userRegister}
            variant="primary"
            block
            style={{ marginTop: 32 }}
          >
            Confirmar registro
          </Button>
        </Form.Group>
      </Form.Group>
    </Container>
  );
}

export default Register;
