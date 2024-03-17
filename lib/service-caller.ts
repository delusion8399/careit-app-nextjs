import { HOST } from "@/config";
import { getSession } from "next-auth/react";

type Options = {
  query?: any;
  body?: any;
  headers?: RequestInit["headers"];
  method?: RequestInit["method"];
  auth?: boolean;
  params?: any;
};

export class ResponseError {
  public message: string;
  public code: number;
  public _err: any;
  public error: any;
  //
  constructor(errorData: {
    code: number;
    message?: string;
    field?: string;
    value?: string;
  }) {
    this.message = `${errorData.code}_message`;
    this.code = errorData.code;
    this._err = errorData;
    this.error = this._err;
  }
}

export default async function serviceCaller(
  endpoint: string,
  options: Options = { headers: {}, auth: true },
): Promise<any> {
  const session = await getSession();

  const opt: any = {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
      token: (session as any)?.accessToken,
      ...options.headers,
    },
  };

  if (!options.auth) {
    delete opt.Authorization;
  }

  let url = `${HOST}/${endpoint}`;

  if (options.query) {
    const searchParams = new URLSearchParams(options.query);
    url += `?${searchParams.toString()}`;
  }

  if (options.body) {
    opt.body = JSON.stringify(options.body);
  }

  if (options.params) {
    Object.keys(options.params).forEach((key) => {
      url = url.replace(`:${key}`, options.params[key]);
    });
  }

  try {
    const response = await fetch(url, opt);
    let jsonResponse;
    const contentType =
      response.headers.get("content-type") || "application/json";

    if (contentType.includes("application/json")) {
      jsonResponse = await response.json();
    } else if (contentType.includes("text/csv")) {
      jsonResponse = await response.blob();
    } else {
      jsonResponse = await response.text();
    }

    if (response.ok) {
      return jsonResponse;
    }

    throw new ResponseError(jsonResponse);
  } catch (error) {
    throw error instanceof ResponseError
      ? error
      : new ResponseError({ code: 500 });
  }
}
