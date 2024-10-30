import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

const regex = /^\-?\d+$/;
const errorMessage = 'Can not convert BigInt';

@Scalar('BigInt')
export class BigIntScalar implements CustomScalar<string, string> {
  description = 'BigInt custom scalar type';

  parseValue(value: string): string {
    if (typeof value === 'string' && regex.test(value)) {
      return value.toString();
    }

    throw new Error(errorMessage);
  }

  serialize(value: string): string {
    return value.toString();
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.STRING && regex.test(ast.value)) {
      return ast.value.toString();
    }

    throw new Error(errorMessage);
  }
}
