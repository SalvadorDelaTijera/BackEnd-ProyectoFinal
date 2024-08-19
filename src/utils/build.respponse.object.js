import ResponseObject from "../common/response.object.js";

export default function buildResponse(statusCode, content) {
  if (statusCode >= 400) {
    const errorResponseObject = new ResponseObject(statusCode);

    return errorResponseObject.toJSON();
  }

  const successResponseObject = new ResponseObject(statusCode);

  successResponseObject.payload = content;

  return successResponseObject.toJSON();
}
