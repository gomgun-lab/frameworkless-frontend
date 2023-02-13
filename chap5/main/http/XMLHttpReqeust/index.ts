type RequestHeaders = {
  [property: string]: string;
};

type RequestParams = {
  url: string;
  headers: RequestHeaders;
  method: RequestMethod;
  /**
   * Planning to use generic to enable more precise typing when requesting.
   *
   * We will use `RequestBody<T> = T;`.
   */
  body?: any;
};

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** @todo */
type RequestBody<T> = T;

const setHeaders = (xhr: XMLHttpRequest, headers: RequestHeaders) => {
  Object.entries(headers).forEach((entry) => {
    const [name, value] = entry;

    xhr.setRequestHeader(name, value);
  });
};

const parseResponse = (xhr: XMLHttpRequest) => {
  const { status, responseText } = xhr;

  let data;
  if (status !== 204) {
    data = JSON.parse(responseText);
  }

  return { status, data };
};

const request = (params: RequestParams) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const { method = "GET", url, headers = {}, body } = params;

    xhr.open(method, url);

    setHeaders(xhr, headers);

    console.log(JSON.stringify(body));
    console.log(xhr);

    xhr.send(JSON.stringify(body));

    xhr.onerror = (error) => {
      reject(new Error("HTTP Error", error));
    };

    xhr.ontimeout = () => {
      reject(new Error("Timeout Error"));
    };

    xhr.onload = () => {
      resolve(parseResponse(xhr));
    };
  });
};

const get = async (url: string, headers: RequestHeaders) => {
  /**
   * @todo replace any.
   */
  const response: any = await request({
    url,
    headers,
    method: "GET",
  });

  return response.data;
};

const post = async (url: string, body, headers: RequestHeaders) => {
  /**
   * @todo replace any.
   */
  const response: any = await request({
    url,
    headers,
    method: "POST",
    body,
  });

  return response.data;
};

const put = async (url: string, body, headers: RequestHeaders) => {
  /**
   * @todo replace any.
   */
  const response: any = await request({
    url,
    headers,
    method: "PUT",
    body,
  });

  return response.data;
};

const patch = async (url: string, body, headers: RequestHeaders) => {
  /**
   * @todo replace any.
   */
  const response: any = await request({
    url,
    headers,
    method: "PATCH",
    body,
  });

  return response.data;
};

/** 'delete' is not allowed as a variable declaration name.ts(1389)` delete => deleteRequest */
const deleteRequest = async (url: string, headers: RequestHeaders) => {
  /**
   * @todo replace any.
   */
  const response: any = await request({
    url,
    headers,
    method: "DELETE",
  });

  return response.data;
};

export default {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
};
