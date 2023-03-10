import { Server } from './server.interface';

export interface CustomResponse {
  timeStamp: Date;
  statusCode: number;
  status: boolean;
  reason?: string;
  message?: string;
  developerMessage?: string;
  data?: { servers?: Server[]; server?: Server };
}
