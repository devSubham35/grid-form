export enum HttpStatusCode {
  // 2xx: Success
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  // 3xx: Redirection
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,

  // 4xx: Client Errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,

  // 5xx: Server Errors
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export interface BaseApiResponse {
  token?: string;
  error: boolean
  message: string;
  statusCode: HttpStatusCode;
}

export interface PaginatedPayload {
  page?: string;
  limit?: string;
}


