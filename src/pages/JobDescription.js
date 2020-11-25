import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";

import JobService from "../services/JobService";
import BackHeader from "../components/BackHeader";
import { useAuth } from "../hooks/useAuth";
import {sleep} from "../helpers/VarHelper";
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

  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState({
    amount: "loading",
    title: "loading",
    address: "loading",
    endDate: "loading",
    description: "loading",
  });

  useEffect(() => {
    const getOneJob = async () => {
      const result = await JobService.getJob(id);
      setLoading(false);
      if (result.status === 200) {
        const job = result.response.job || {};
        setJob(job);
      }
    };

    getOneJob();
  }, []);

  return (
    <DescriptionContainer>

      {!loading?<CardContainer>
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
          <Value>{new Date(job.endDate.toString()).toLocaleDateString()}</Value>
        </PairContainer>
      </CardContainer>:<CardContainer className="text-light"><Spinner animation="border" /></CardContainer>}

      <DescriptionContent>
        <h4>Descripción:</h4>
        <p style={{ fontSize: 14 }}>{job.description}</p>
      </DescriptionContent>

      <OperationsContainer>
        {role === "collaborator" && (
          <>
            <Button variant="primary" style={{ color: "white", width: "100%" }}>
              Aceptar
            </Button>
            <Button variant="danger" style={{ width: "100%" }}>
              Rechazar
            </Button>
          </>
        )}

        {role === "employer" && (
          <>
            <Button variant="primary" style={{ color: "white", width: "100%" }}>
              Editar
            </Button>
            <Button variant="danger" style={{ width: "100%" }}>
              Rechazar
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
  const [user] = useAuth();

  return (
    <Container>
      <BackHeader title="Trabajo" href="/" />
      <Description role={user.role} />
    </Container>
  );
}

export default JobDescription;
