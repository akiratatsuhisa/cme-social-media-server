import { CustomScalar, Scalar } from '@nestjs/graphql';
import dayjs from 'dayjs';
import { Kind, ValueNode } from 'graphql';

const errorMessage = 'Can not convert ISODateTime';

@Scalar('ISODateTime')
export class ISODateTimeScalar implements CustomScalar<string, string> {
  description = 'ISODateTime custom scalar type';

  parseValue(value: string): string {
    if (typeof value === 'string' && dayjs(value).isValid()) {
      return dayjs(value).toISOString();
    }

    throw new Error(errorMessage);
  }

  serialize(value: string): string {
    return value.toString();
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.STRING && dayjs(ast.value).isValid()) {
      return dayjs(ast.value).toISOString();
    }

    throw new Error(errorMessage);
  }
}
