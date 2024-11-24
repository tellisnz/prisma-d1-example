import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

export interface Env {
	DB: D1Database;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const adapter = new PrismaD1(env.DB);
		const prisma = new PrismaClient({ adapter });
		// const users = await prisma.user.upsert({
		// 	create: {
		// 		email: 'test@test.com',
		// 		name: 'test'
		// 	},
		// 	update: {
		// 		email: 'test@test.com',
		// 		name: 'test'
		// 	},
		// 	where: {
		// 		email: 'test@test.com'
		// 	}
		// });
		// const users = await prisma.user.create({ data: { name: Math.random().toString(), email: Math.random().toString() }})
		const users = await prisma.user.findMany({ where: { name: 'test'}});
		const result = JSON.stringify(users);
		return new Response(result);
	},
} satisfies ExportedHandler<Env>;
