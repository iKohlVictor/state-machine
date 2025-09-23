import { PrismaClient } from "../src/generated/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(
    async (tx) => {
      const profiles = ["Admin", "Analise Doc.", "Filial", "Nacional"];

      await tx.profile.createMany({
        data: profiles.map((profile) => {
          return {
            is_active: true,
            name: profile,
          };
        }),
        skipDuplicates: true,
      });
      const users = ["1", "2", "3", "4"];
      const profilesCreated = await tx.profile.findMany();

      await tx.user.createMany({
        data: users.map((user, index) => {
          return {
            name: user,
            profile_id: profilesCreated[index].id,
            is_active: true,
          };
        }),
      });

      const pendencyStages = [
        "Pendente",
        "Pendente Validação",
        "Concluido",
        "Cancelado",
      ];

      await tx.pendency_stage.createMany({
        data: pendencyStages.map((stage) => {
          return {
            name: stage,
          };
        }),
      });

      const pendencyType = [
        "Assinaturas completas e validadas",
        "Permuta Barter",
        "Cif peso pendente",
        "Distrato",
      ];

      await tx.pendency_type.createMany({
        data: pendencyType.map((type) => {
          return {
            is_active: true,
            name: type,
          };
        }),
      });
    },
    {
      maxWait: 5000,
    }
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
