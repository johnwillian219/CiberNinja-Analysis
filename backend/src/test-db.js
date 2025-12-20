// Versão alternativa do test-db.js
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

// Solução mais simples
const prisma = new PrismaClient({
  // log: ["query"] // Comente logs inicialmente
});

async function test() {
  try {
    console.log(
      "Tentando conectar com URL:",
      process.env.DATABASE_URL?.substring(0, 30) + "..."
    );

    await prisma.$connect();
    console.log("✅ Conexão bem-sucedida!");

    // Teste uma consulta simples primeiro
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("Teste SQL:", result);

    // Depois teste seus modelos
    const users = await prisma.user.findMany();
    console.log(`Usuários: ${users.length}`);
  } catch (error) {
    console.error("❌ Erro detalhado:");
    console.error("Mensagem:", error.message);
    console.error("Stack:", error.stack);

    // Verifique se é erro de conexão
    if (error.code === "P1001") {
      console.error("Não foi possível alcançar o servidor de banco de dados.");
      console.error("Verifique sua DATABASE_URL e se o Neon está rodando.");
    }
  } finally {
    await prisma.$disconnect();
    console.log("Conexão fechada.");
  }
}

test();
