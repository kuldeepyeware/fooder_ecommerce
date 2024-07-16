/* eslint-disable no-unused-vars */
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@repo/db/client";
import { Adapter } from "next-auth/adapters";

function customPrismaAdapter(prisma: PrismaClient): Adapter {
  const adapter = PrismaAdapter(prisma);
  return {
    ...adapter,
    createUser: async (data) => {
      const { name, ...rest } = data;
      return (adapter.createUser as unknown as (data: any) => Promise<any>)({
        ...rest,
        firstName: name?.split(" ")[0],
        lastName: name?.split(" ")[1],
      });
    },
  };
}

export default customPrismaAdapter;
