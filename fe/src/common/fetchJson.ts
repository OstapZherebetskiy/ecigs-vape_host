const headers = new Headers({
  accept: 'application/json',
  'Content-Type': 'application/json',
});

export const fetchJson = async (input: RequestInfo, init: RequestInit = {}) => {
  if (!init.headers) init.headers = headers;

  const resp = await fetch(input, init);

  if (resp.status === 400) {
    throw Error(resp.statusText);
  }

  const data = await resp.json();
  return data;
};
