import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

const baseTypeNames = ['String', 'Number', 'Boolean'];
/**
 * @description: 生成返回结果装饰器
 */

export const APIResponse = <T extends Type<any>>(
  type?: T | T[],
  msg: string = '请求成功',
  isPage?: boolean,
) => {
  let prop = null;
  // 判断type是否为数组
  if (Array.isArray(type)) {
    // 判断是否为分页
    if (isPage) {
      // 生成包含分页信息的对象结构
      prop = {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            // getSchemaPath 获取一个模型的引用
            items: { $ref: getSchemaPath(type[0]) },
          },
          itemCount: { type: 'number', default: 0 },
          totalItems: { type: 'number', default: 0 },
          totalPages: { type: 'number', default: 0 },
          currentPage: { type: 'number', default: 0 },
          itemsPerPage: { type: 'number', default: 0 },
        },
      };
    } else {
      //生成包含数组类型数据的对象结构。
      prop = {
        type: 'array',
        items: { $ref: getSchemaPath(type[0]) },
      };
    }
  } else if (type) {
    // 判断type是否为基础类型
    if (type && baseTypeNames.includes(type.name)) {
      // 生成基础类型的对象结构。
      prop = { type: type.name.toLocaleLowerCase() };
    } else {
      // 生成引用类型的对象结构。
      prop = { $ref: getSchemaPath(type) };
    }
  } else {
    // 生成包含空值的对象结构。
    prop = { type: 'null', default: null };
  }

  const resProps = {
    type: 'object',
    properties: {
      message: { type: 'string', default: msg },
      data: prop,
    },
  };

  return applyDecorators(
    // 使用 ApiExtraModels 装饰器 定义为额外的模型
    ApiExtraModels(type ? (Array.isArray(type) ? type[0] : type) : String),
    ApiResponse({
      schema: {
        // allOf 根据所有子模式验证值
        allOf: [resProps],
      },
    }),
  );
};
