import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";

import BackHeader from "../components/headers/BackHeader";
import useJob from "../hooks/useJob";
import { useUser } from "../hooks/useUser";

const DescriptionContainer = styled.div`
  background-color: #eeeeee;
  padding: 16px 32px;

  min-height: 640px;
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  background-color: #00988d;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const DescriptionContent = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
  flex-grow: 1;
`;

const OperationsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const PairContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Label = styled.div`
  color: white;
  opacity: 0.6;
  font-weight: 400;
`;

const Value = styled.div`
  color: white;
`;

function Description({ role }) {
  const { id } = useParams();

  const [job, { acceptJob, rejectJob, updateJob, deleteJob }] = useJob(id);
  const loading = !job;

  // todo: when job is accepted, then show options to go to chat

  return (
    <DescriptionContainer>
      {!loading ? (
        <CardContainer>
          <Label>Oferta</Label>
          <h2>S/. {job.amount}</h2>
          <PairContainer>
            <Label>Puesto</Label>
            <Value>{job.title}</Value>
          </PairContainer>
          <PairContainer>
            <Label>Lugar</Label>
            <Value>{job.address}</Value>
          </PairContainer>
          <PairContainer>
            <Label>Fecha</Label>
            <Value>
              {new Date(job.endDate.toString()).toLocaleDateString()}
            </Value>
          </PairContainer>
        </CardContainer>
      ) : (
        <CardContainer className="text-light">
          <Spinner animation="border" />
        </CardContainer>
      )}

      <DescriptionContent>
        <h4>Descripción:</h4>
        <p style={{ fontSize: 14 }}>{job.description}</p>
      </DescriptionContent>

      <OperationsContainer>
        {role === "collaborator" && (
          <>
            <Button
              variant="primary"
              style={{ color: "white", width: "100%" }}
              onClick={acceptJob}
            >
              Aceptar
            </Button>
            <Button
              variant="danger"
              style={{ width: "100%" }}
              onClick={rejectJob}
            >
              Rechazar
            </Button>
          </>
        )}

        {role === "employer" && (
          <>
            <Button
              variant="primary"
              style={{ color: "white", width: "100%" }}
              onClick={updateJob}
            >
              Editar
            </Button>
            <Button
              variant="danger"
              style={{ width: "100%" }}
              onClick={deleteJob}
            >
              Eliminar
            </Button>
          </>
        )}
      </OperationsContainer>
    </DescriptionContainer>
  );
}

const Container = styled.div`
  height: 100%;
`;

function JobDescription() {
  const user = useUser();

  return (
    <Container>
      <BackHeader title="Trabajo" href="/" />
      <Description role={user.role} />
    </Container>
  );
}

export default JobDescription;
