import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.member.create({
            data: {
                role: 'DEVELOPER',
                email: 'developer@giraph.fr',
                password: '$2b$10$RPuVlp2QD6xokDMir0Rmxuv0tgjDUzb.gRZa60xOMVj2SNMRWbkr2', // 123456
                profile: {
                    create: {
                        email: 'developer@giraph.fr'
                    }
                }
            },
            include: { profile: true }
        });
    } catch (error) {
        console.log(error);
    }

    console.log('🍃 Seed done !');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
