import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import BootstrapButton from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import MenuHeader from "../components/headers/MenuHeader";
import useJob from "../hooks/useJob";
import useJobs from "../hooks/useJobs";
import Scrollable from "../components/Scrollable";
import { useUser } from "../hooks/useUser";

import { ReactComponent as MoneyIcon } from "../assets/money.svg";

const JobCardContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  padding: 16px;
  border-radius: 10px;
  width: 100%;
`;

const JobCardDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const JobCardMoney = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
`;

const JobCardButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const Button = styled(BootstrapButton)`
  padding: 4px 16px;
  font-size: 12px;
  border-radius: 16px;
`;

const toDDMMYYYY = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10) {
    return `${day}-0${month}-${year}`;
  } else {
    return `${day}-${month}-${year}`;
  }
};

function JobCard({ role, data, ...props }) {
  const [, { acceptJob, rejectJob }] = useJob(data._id, { skipRequest: true });

  const jobDescriptionHref = `/job-description/${data._id}`;
  const chatHref = `/chat/${data._id}`;

  const hasWorker = !!data.worker;

  return (
    <JobCardContainer {...props}>
      <JobCardDescription>
        <Link
          className="text-secondary"
          to={jobDescriptionHref}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <h5>{data.title}</h5>
          <div style={{ fontSize: 12, marginLeft: 12 }}>
            {" "}
            {toDDMMYYYY(new Date(data.endDate))}
          </div>
        </Link>
        <div>
          <p>{data.description}</p>
        </div>

        <JobCardButtons>
          {role === "collaborator" && (
            <>
              <Link variant="primary" to={chatHref}>
                <Button variant="primary" onClick={acceptJob}>
                  Aceptar
                </Button>
              </Link>

              <Link variant="primary" to={chatHref}>
                <Button variant="outline-danger" onClick={rejectJob}>
                  Rechazar
                </Button>
              </Link>
            </>
          )}

          {role === "employer" ? (
            hasWorker ? (
              <Link variant="primary" to={chatHref}>
                <Button variant="primary">Ir a Chat</Button>
              </Link>
            ) : (
              <Button variant="outline-danger">Cancelar</Button>
            )
          ) : (
            <></>
          )}
        </JobCardButtons>
      </JobCardDescription>

      <JobCardMoney as={Link} to={jobDescriptionHref}>
        <div>
          <MoneyIcon />
        </div>
        <div className="text-dark" style={{ marginTop: 8 }}>
          <h6>S/. {data.amount}</h6>
        </div>
      </JobCardMoney>
    </JobCardContainer>
  );
}

const ButtonAddJob = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 5,
        right: 10,
      }}
    >
      <Link
        to={"/create-job"}
        style={{
          backgroundColor: "#00988D",
          height: 60,
          width: 60,
          borderRadius: 30,
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>
          <i style={{ fontSize: 30 }} className="fas fa-plus"></i>
        </span>
      </Link>
    </div>
  );
};

const AnnouncementsContainer = styled.div`
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 16px;

  padding: 24px 6% 10% 6%;
  min-height: 100%;
`;

function Announcements({ role, filter }) {
  const [jobs] = useJobs({ role, filter });

  return (
    <AnnouncementsContainer>
      <Scrollable>
        {jobs.map((item) => (
          <JobCard key={item._id} data={item} role={role} />
        ))}
      </Scrollable>

      {role === "employer" && <ButtonAddJob />}
    </AnnouncementsContainer>
  );
}

const Searcher = styled.div`
  background-color: white;
  border-radius: 50px;
`;

function HomeHeader({ role, filter, onChangeFilter }) {
  const handleSelect = (newFilter) => {
    if (newFilter !== filter) {
      onChangeFilter(newFilter);
    }
  };

  return (
    <MenuHeader
      title={role === "collaborator" ? "Mis Trabajos" : "Mis Propuestas"}
    >
      {role === "collaborator" && (
        <Searcher>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text
                style={{
                  background: "transparent",
                  border: "1px solid transparent",
                }}
              >
                <FontAwesomeIcon icon={faSearch} color="#53C9BD" size="lg" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              style={{
                display: "flex",
                flexGrow: 1,
                border: 0,
                borderRadius: 50,
              }}
              type="text"
              placeholder="Buscar siguiente empleo"
              name="search"
            />
          </InputGroup>
        </Searcher>
      )}

      <Nav
        className="justify-content-center"
        variant="tabs"
        defaultActiveKey={role === "collaborator" ? "announcements" : "active"}
        style={{ marginTop: 32 }}
        onSelect={handleSelect}
      >
        {role === "collaborator" && (
          <>
            <Nav.Item>
              <Nav.Link href="#" eventKey="announcements">
                Anuncios
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" eventKey="accepted">
                Aceptados
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" eventKey="rejected">
                Rechazados
              </Nav.Link>
            </Nav.Item>
          </>
        )}
        {role === "employer" && (
          <>
            <Nav.Item>
              <Nav.Link href="#" eventKey="active">
                Activos
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" eventKey="expired">
                Vencidos
              </Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
    </MenuHeader>
  );
}

const Container = styled.div`
  min-height: 640px;
`;

function Home() {
  const user = useUser();
  const [filter, setFilter] = useState(
    user.role === "employer" ? "active" : "announcements"
  );

  return (
    <Container>
      <HomeHeader
        role={user.role}
        filter={filter}
        onChangeFilter={(newFilter) => setFilter(newFilter)}
      />
      <Announcements role={user.role} filter={filter} />
    </Container>
  );
}

export default Home;
