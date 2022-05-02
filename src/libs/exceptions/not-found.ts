import { ExceptionBase } from './base';
import { ExceptionCodes } from './codes';

export class NotFoundException extends ExceptionBase {
  readonly code = ExceptionCodes.notFound;

  constructor(message = 'Not found') {
    super(message);
  }
}
