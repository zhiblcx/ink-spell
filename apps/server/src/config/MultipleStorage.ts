import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

export function MultipleStorage(fileType, dest = 'public') {
  return {
    fileFilter: (_, file, cb) => {
      if (!fileType.test(file.originalname)) {
        const allowedFileTypes = fileType
          .toString()
          .replace(/[()\.$\/\\]/g, '')
          .replace(/[|]/g, '/');
        cb(new BadRequestException(`仅支持 ${allowedFileTypes} 类型`), false);
      } else {
        cb(null, true);
      }
    },
    storage: diskStorage({
      destination: dest,
      filename: (_, file, cb) => {
        const suffix = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${suffix}`);
      },
    }),
  };
}
