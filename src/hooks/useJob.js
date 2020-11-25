import { useEffect, useState } from "react";
import JobService from "../services/JobService";

export default function useJob(id, options = {}) {
  const [job, setJob] = useState({
    amount: "loading",
    title: "loading",
    address: "loading",
    endDate: "loading",
    description: "loading",
  });

  const { skipRequest = false } = options;

  useEffect(() => {
    const getOneJob = async () => {
      const result = await JobService.getJob(id);

      if (result.status === 200) {
        const job = result.response.job || {};
        setJob(job);
      }
    };

    if (!skipRequest) {
      getOneJob();
    }
  }, [id, skipRequest]);

  const acceptJob = async () => {
    await JobService.acceptJob(job);
    alert("trabajo aceptado");
  };

  const rejectJob = async () => {
    await JobService.rejectJob(job);
    alert("trabajo rechazado");
  };

  const updateJob = async () => {
    // todo: go to create job page
    alert("Yendo a editar trabajo...");
  };

  const deleteJob = async () => {
    await JobService.deleteJob(job);
    alert("trabajo eliminado");
  };

  return [job, { acceptJob, rejectJob, updateJob, deleteJob }];
}
