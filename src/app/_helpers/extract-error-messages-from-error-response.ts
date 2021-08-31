/* import { HttpErrorResponse } from '@angular/common/http';

export const extractErrorMessagesFromErrorResponse = (
  errorResponse: HttpErrorResponse
) => {
  // Creates an empty array
  const errors = [];

  // Check if errorresponse existst
  if (errorResponse.error) {
    // Push main errormessage
    errors['message'] = errorResponse.error.message;

    // Push errormessages according to fields in an array
    if (errorResponse.error.errors) {
      errors['errors'] = [];
      for (let error in errorResponse.error.errors) {
        errors['errors'][error] = errorResponse.error.errors[error];
      }
    }
    console.log(errors);
  }

  return errors;
}; */
