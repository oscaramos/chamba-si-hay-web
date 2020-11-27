import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";

import { useUser } from "./hooks/useUser";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import JobDescription from "./pages/JobDescription";
import CreateJob from "./pages/CreateJob";
import Chat from "./pages/Chat";
import Map from "./pages/Map";
import NotFound from "./pages/NotFound";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  font-family: Roboto, sans-serif;
  background-color: #53c9bd;

  width: 100vw;
  min-height: 100vh;
`;

const AppInnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 400px;

  min-height: 640px;
  padding-top: 100px;

  @media screen and (max-width: 600px) {
    max-width: 100vw;
    min-height: 100vh;
    padding: 0;
  }
`;

function AuthenticatedApp() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/job-description/:id" component={JobDescription} />
      <Route path="/create-job" component={CreateJob} />
      <Route path="/chat/:jobId" component={Chat} />
      <Route path="/map" component={Map} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

function UnauthenticatedApp() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )}
      />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const user = useUser();

  return (
    <AppContainer>
      <AppInnerContainer>
        <Router>
          {user.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </Router>
      </AppInnerContainer>
    </AppContainer>
  );
}
