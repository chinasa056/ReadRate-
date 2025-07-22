export enum Errors {
  NOT_AUTHENTICATED = 'This request is not authenticated',
  NOT_AUTHORIZED = "'Unauthorized access. Please log in to continue'",
  BAD_REQUEST = 'Invalid data provided for the request',
  FORBIDDEN = 'Forbidden. You do not have permission to access this resource',
  REQUEST_VALIDATION = 'There was an issue with your request. Please check the provided information and try again',
  CONFLICT = 'Request culd not be completed due to a conflict with the current state of the resource',
  NOT_IMPLEMENTED = 'Functionality not supported',
  SERVER_ERROR = 'Internal server error. Please try again later or contact support if the issue persists',
  VALIDATION = 'Data provided is invalid or does not meet the required format',
  RESOURCE_NOT_FOUND = 'The resource you are looking for could not be found',
  INVALID_AUTHORIZATION_TOKEN = 'Authorization token is invalid',
  SERVICE_UNAVAILABLE = 'Service unavailable. Please try again later',
}
