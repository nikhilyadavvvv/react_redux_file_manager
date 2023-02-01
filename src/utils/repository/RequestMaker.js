import axios from "axios";
import Endpoints from "./Endpoints";

export function NoAuthPostRequest(raw, path) {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(Endpoints.api + path, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      error.json().then((val) => {
        console.log(val);
        alert(val.body[0]);
      });
    });
}

export function GetRequest(path) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(Endpoints.api + path, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      error.json().then((val) => {
        console.log(val);
        if (
          val.message === "Token mismatched or expired. Please check token!"
        ) {
          localStorage.clear();
          window.location.href = "./login";
          return;
        }
        alert(val.message);
      });
    });
}

export function PostRequest(raw, path) {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  };

  return fetch(Endpoints.api + path, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      error.json().then((val) => {
        console.log(val);
        alert(val.message);
      });
    });
}

export function PostRequestWithTextResponse(raw, path) {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  };

  return fetch(Endpoints.api + path, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.text();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      error.json().then((val) => {
        console.log(val);
        alert(val.message);
      });
    });
}

export function PDFStreamMaker(path) {
  const fullpath = Endpoints.api + path;
  console.log(fullpath);
  return axios(fullpath, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => {
      console.log("response", response.data.body.file_base64);
      const file = new Blob([response.data.body.file_base64], {
        type: "application/pdf",
      });
      const fileURL = URL.createObjectURL(file);
      return fileURL;
    })
    .catch((error) => {
      console.log(error);
    });
}
