import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(path.join(__dirname, '../uploads/audios', '1722160607364.wav'));
    return 'Hello World!';
  }
}
