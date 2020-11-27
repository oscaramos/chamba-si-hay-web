import { useState, useEffect } from "react";
import JobService from "../services/JobService";

const requestJobsWithFilter = (role, filter) => {
  switch (role) {
    case "employer":
      return JobService.getMyPublishJobs();

    case "collaborator":
      switch (filter) {
        case "announcements":
          return JobService.getAllJobs();
        case "accepted":
          return JobService.getAcceptedJobs();
        case "rejected":
          return JobService.getRejectedJobs();
        default:
          throw new Error("Filtro no identificado");
      }

    default:
      throw new Error("Rol no identificado");
  }
};

const filterLocallyEmployerJobs = (jobs, filter) => {
  switch (filter) {
    case "active":
      return jobs.filter((job) => new Date() < new Date(job.endDate));
    case "expired":
      return jobs.filter((job) => new Date() > new Date(job.endDate));
    default:
      throw new Error("Filtro no identificado");
  }
};

const createJob = async (job) => {
  const result = await JobService.createJob(job);
  const { status } = result;
  if (status !== 200) {
    throw new Error("Error al crear el anuncio");
  }
};

export default function useJobs(props = {}) {
  const { role = "", filter = "" } = props;
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      const result = await requestJobsWithFilter(role, filter);

      if (result.status === 200) {
        const jobs = result.response || [];

        switch (role) {
          case "employer":
            return filterLocallyEmployerJobs(jobs, filter);
          case "collaborator":
            return jobs;
          default:
            throw new Error("Rol no identificado");
        }
      } else {
        throw new Error("Error al pedir trabajos");
      }
    };

    // if not props then no request
    if (!role || !filter) return;

    getJobs().then((jobs) => setJobs(jobs));
  }, [role, filter]);

  return [jobs, { createJob }];
}
