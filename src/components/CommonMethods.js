/* eslint-disable vars-on-top */
/* eslint-disable no-var */
export const compare = (a, b) => {
  if (a.isDone < b.isDone) {
    return -1;
  }
  if (a.isDone > b.isDone) {
    return 1;
  }
  return 0;
};

export const getTasks = (userID) => {
  const result = localStorage.getItem(`task-${userID}`);
  if (result) {
    return JSON.parse(result);
  }
  return [];
};

export const arrayCheck = (arr) => {
  if (Array.isArray(arr) && arr.length) {
    return arr;
  }
  return false;
};

export const todayDate = new Date();

export const getFormattedDate = (date) => {
  var year = new Date(date).getFullYear();

  var month = (1 + new Date(date).getMonth()).toString();
  month = month.length > 1 ? month : `0${month}`;

  var day = new Date(date).getDate().toString();
  day = day.length > 1 ? day : `0${day}`;

  return `${year}/${month}/${day}`;
};

export const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
