import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import BootstrapButton from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

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

function JobCard({ role, item, ...props }) {
  const href = `/job-description/${item._id}`;
  const [, { acceptJob, rejectJob }] = useJob(item._id, { skipRequest: true });

  return (
    <JobCardContainer {...props}>
      <JobCardDescription>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <a href={href} style={{ color: "black" }}>
            <h5>{item.title}</h5>
          </a>
          <div style={{ fontSize: 12, marginLeft: 12 }}>
            {" "}
            {toDDMMYYYY(new Date(item.endDate))}
          </div>
        </div>
        <div>
          <p>{item.description}</p>
        </div>

        <JobCardButtons>
          {role === "collaborator" && (
            <>
              <Button variant="primary" onClick={acceptJob}>
                Aceptar
              </Button>
              <Button variant="outline-danger" onClick={rejectJob}>
                Rechazar
              </Button>
            </>
          )}

          {role === "employer" && (
            <Button variant="outline-danger" href={href}>
              Cancelar
            </Button>
          )}
        </JobCardButtons>
      </JobCardDescription>

      <JobCardMoney>
        <div>
          <MoneyIcon />
        </div>
        <div style={{ marginTop: 8 }}>
          <h6>S/. {item.amount}</h6>
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
      <a
        href="/create-job"
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
          <FontAwesomeIcon icon={faPlus} style={{ fontSize: 30 }} />
        </span>
      </a>
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

const getFilteredJobs = (jobs, role, filter) => {
  if (role === "employer") {
    if (filter === "active") {
      return jobs.filter((job) => new Date(job.endDate) < new Date());
    } else if (filter === "expired") {
      return jobs.filter((job) => new Date(job.endDate) > new Date());
    }
  } else if (role === "collaborator") {
    if (filter === "announcements") {
      return jobs; // todo: waiting for backend
      // return jobs.filter((job) => job.state === "pending");
    } else if (filter === "accepted") {
      return jobs.filter((job) => job.state === "accepted");
    } else if (filter === "rejected") {
      return jobs.filter((job) => job.state === "rejected");
    }
  }
};

function Announcements({ role, filter }) {
  const [jobs, { getJobs }] = useJobs();

  useEffect(() => {
    getJobs(role);
    // eslint-disable-next-line
  }, [role]);

  const filteredJobs = getFilteredJobs(jobs, role, filter);

  return (
    <AnnouncementsContainer>
      <Scrollable>
        {filteredJobs.map((item) => (
          <JobCard key={item._id} item={item} role={role} />
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
