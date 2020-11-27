import { apiUrl } from "../helpers/VarHelper";
import AuthService from "./AuthService";
const headers = {
  "Content-Type": "application/json",
};

export async function getMessages(jobId) {
  const urlData = apiUrl + "/messages/" + jobId + AuthService.tokenToParam();
  try {
    let response = await fetch(urlData, {
      method: "GET",
      headers: headers,
    });
    const status = response.status;
    const responseJson = await response.json();
    return {
      status: status,
      data: responseJson,
    };
  } catch (error) {
    return {
      status: 404,
      data: null,
    };
  }
}

export async function storeMessage(jobId, message) {
  const urlData = apiUrl + "/messages/" + jobId + AuthService.tokenToParam();
  try {
    let response = await fetch(urlData, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        jobId: jobId,
        content: message,
      }),
    });
    const status = response.status;
    const responseJson = await response.json();
    return {
      status: status,
      data: responseJson,
    };
  } catch (error) {
    return {
      status: 404,
      data: null,
    };
  }
}
