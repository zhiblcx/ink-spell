import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    let message;
    let status;

    switch (exception.code) {
      case 'P2002': {
        status = HttpStatus.CONFLICT;
        message = '已经上传过该内容';
        break;
      }
      case 'P2025': {
        status = HttpStatus.NOT_FOUND;
        message = '没有找到该资源';
        break;
      }
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }

    response.status(status).json({
      message: message,
    });
  }
}
