import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  createTest: publicProcedure
    .input(z.object({ message: z.string() }).nullish())
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.testData.create({
        data: {
          data: message,
        },
      });

      return { created: input };
    }),

  // createTest: publicProcedure.input(({ ctx }) => {
  //   return ctx.prisma.testData.create({
  //     data: {
  //       data: "Hello world",
  //     },
  //   });
  // }),
});
