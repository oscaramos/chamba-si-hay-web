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
        const job = result.response || {};
        setJob(job);
      } else {
        throw new Error("Error al pedir un trabajo");
      }
    };

    if (!skipRequest) {
      getOneJob();
    }
  }, [id, skipRequest]);

  const acceptJob = async () => {
    await JobService.acceptJob(id);
  };

  const rejectJob = async () => {
    await JobService.rejectJob(id);
  };

  const updateJob = async () => {
    // todo: go to create job page
  };

  const deleteJob = async () => {
    // todo: wait until backend is ready, this doesnt work
    await JobService.deleteJob(job);
  };

  return [job, { acceptJob, rejectJob, updateJob, deleteJob }];
}
