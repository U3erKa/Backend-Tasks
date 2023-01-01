export default class HTTPError extends Error {
  constructor(public status = 500, public message = 'Something weng wrong') {
    super();
  }
}
