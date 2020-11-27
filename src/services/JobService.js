import { apiUrl } from "../helpers/VarHelper";
import AuthService from "./AuthService";
const headers = {
  "Content-Type": "application/json",
};

export default class JobService {
  static async getAllJobs() {
    const urlData = apiUrl + "/jobs/all" + AuthService.tokenToParam();
    try {
      let response = await fetch(urlData, {
        method: "GET",
      });
      const status = response.status;
      const responseJson = await response.json();
      return {
        status: status,
        response: responseJson,
      };
    } catch (error) {
      return {
        status: 404,
        response: null,
      };
    }
  }

  static async getAcceptedJobs() {
    const urlData = apiUrl + "/jobs/accepted" + AuthService.tokenToParam();
    try {
      let response = await fetch(urlData, {
        method: "GET",
      });
      const status = response.status;
      const responseJson = await response.json();
      return {
        status: status,
        response: responseJson,
      };
    } catch (error) {
      return {
        status: 404,
        response: null,
      };
    }
  }

  static async getRejectedJobs() {
    const urlData = apiUrl + "/jobs/rejected" + AuthService.tokenToParam();
    try {
      let response = await fetch(urlData, {
        method: "GET",
      });
      const status = response.status;
      const responseJson = await response.json();
      return {
        status: status,
        response: responseJson,
      };
    } catch (error) {
      return {
        status: 404,
        response: null,
      };
    }
  }

  static async getJob(id) {
    const urlData = apiUrl + "/jobs/info/" + id + AuthService.tokenToParam();
    try {
      let response = await fetch(urlData, {
        method: "GET",
      });
      const status = response.status;
      const responseJson = await response.json();
      return {
        status: status,
        response: responseJson,
      };
    } catch (error) {
      return {
        status: 404,
        response: null,
      };
    }
  }

  static async getMyPublishJobs() {
    const urlData = apiUrl + "/jobs/mine" + AuthService.tokenToParam();
    try {
      let response = await fetch(urlData, {
        method: "GET",
      });
      const status = response.status;
      const responseJson = await response.json();
      return {
        status: status,
        response: responseJson,
      };
    } catch (error) {
      return {
        status: 404,
        response: null,
      };
    }
  }

  static async createJob(job) {
    const urlData = apiUrl + "/jobs/create" + AuthService.tokenToParam();
    try {
      if (job === null) {
        throw new Error("Job is null");
      }
      let response = await fetch(urlData, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(job),
      });
      const status = response.status;
      const responseJson = await response.json();
      return {
        status: status,
        response: responseJson,
      };
    } catch (error) {
      return {
        status: 404,
        response: null,
      };
    }
  }

  static async updateJob(job) {
    const urlData = apiUrl + "/jobs/update" + AuthService.tokenToParam();
    try {
      let response = await fetch(urlData, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          data: job,
        }),
      });
      const status = response.status;
      const responseJson = await response.json();
      return {
        status: status,
        response: responseJson,
      };
    } catch (error) {
      return {
        status: 404,
        response: null,
      };
    }
  }

  static async deleteJob(id) {
    return {
      status: "we did it guys, job is no more!",
      response: "",
    };
  }

  static async acceptJob(id) {
    const urlData = apiUrl + "/jobs/accept/" + id + AuthService.tokenToParam();
    try {
      let response = await fetch(urlData, {
        method: "GET",
      });
      const status = response.status;
      const responseJson = await response.json();
      return {
        status: status,
        response: responseJson,
      };
    } catch (error) {
      return {
        status: 404,
        response: null,
      };
    }
  }

  static async rejectJob(id) {
    const urlData = apiUrl + "/jobs/reject/" + id + AuthService.tokenToParam();
    try {
      let response = await fetch(urlData, {
        method: "GET",
      });
      const status = response.status;
      const responseJson = await response.json();
      return {
        status: status,
        response: responseJson,
      };
    } catch (error) {
      return {
        status: 404,
        response: null,
      };
    }
  }
}
