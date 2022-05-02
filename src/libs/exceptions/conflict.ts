import { ExceptionBase } from './base';
import { ExceptionCodes } from './codes';

export class ConflictException extends ExceptionBase {
  readonly code = ExceptionCodes.conflict;
}
