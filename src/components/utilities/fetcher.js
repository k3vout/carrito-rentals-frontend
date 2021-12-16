const fetchUrl = async (url, endpoint, httpMethod, callback, body = false, auth = false) => {
  const paramsBuilder = {
    method: httpMethod,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };
  if (body) {
    paramsBuilder.body = JSON.stringify(body);
  }
  if (auth) {
    paramsBuilder.headers.Authorization = auth;
  }
  fetch(`${url}${endpoint}`, paramsBuilder)
    .then((response) => response.json())
    .then((json) => callback(json));
};

export default fetchUrl;
