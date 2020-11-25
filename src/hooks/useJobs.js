import JobService from "../services/JobService";
import { useState } from "react";

export default function useJobs() {
  const [jobs, setJobs] = useState([]);

  const createJob = async (job) => {
    const result = await JobService.createJob(job);
    const { status } = result;
    if (status !== 200) {
      throw new Error("Error al crear el anuncio");
    }
  };

  const getJobs = async (role) => {
    const result =
      role === "employer"
        ? await JobService.getMyPublishJobs()
        : await JobService.getAllJobs();

    if (result.status === 200) {
      const jobs = result.response || [];
      setJobs(jobs);
    } else {
      throw new Error("Error al pedir trabajos");
    }
  };

  return [jobs, { createJob, getJobs }];
}
