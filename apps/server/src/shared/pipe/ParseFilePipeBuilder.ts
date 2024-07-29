import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as fs from 'node:fs';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  fileSize: number;
  constructor(fileSize: number) {
    this.fileSize = fileSize;
  }
  transform(file: any) {
    const oneKb = 1024;
    let sizeLimit: number;
    let unit: string;

    if (this.fileSize > oneKb * oneKb) {
      sizeLimit = this.fileSize / (oneKb * oneKb);
      unit = 'MB';
    } else {
      sizeLimit = this.fileSize / oneKb;
      unit = 'KB';
    }

    console.log(file);

    if (file.size > this.fileSize) {
      fs.unlink(file.path, (err) => {
        if (err) throw err;
      });
      throw new BadRequestException(`上传文件不能超过${sizeLimit}${unit}`);
    }
    return file;
  }
}
