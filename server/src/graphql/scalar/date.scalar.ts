import { GraphQLScalarType, Kind } from "graphql";

// Custom Date scalar resolver
export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: unknown): string {
    // Convert outgoing Date to ISO string
    return (value as Date).toISOString();
  },
  parseValue(value: unknown): Date {
    // Convert incoming ISO string to Date
    return new Date(value as string);
  },
  parseLiteral(ast): Date | null {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});
