/**
 * Seed: Ajax cihaz kataloğu (§4.1) + hazır kitler (§4.2)
 * Çalıştırma: npm i -D tsx && npm run db:seed
 *
 * Kaynak: lib/data/devices.ts ve lib/data/kits.ts — tek doğruluk kaynağı,
 * UI ile seed aynı veriden beslenir.
 */

import { PrismaClient } from "@prisma/client";
import { DEVICES } from "../lib/data/devices";
import { KITS } from "../lib/data/kits";
import { MISSING_DATA } from "../lib/data/site";

const prisma = new PrismaClient();

async function main() {
  for (const d of DEVICES) {
    await prisma.device.upsert({
      where: { slug: d.slug },
      update: {},
      create: {
        slug: d.slug,
        ad: d.ad,
        kategori: d.kategori,
        kisaAciklama: d.kisaAciklama,
        uzunAciklama: d.uzunAciklama,
        teknikOzellikler: [...d.teknikOzellikler],
        gorseller: [], // [[DOLDUR]] Ajax bayi materyal kiti izniyle
        aylikKiraTL: d.aylikKiraTL,
        kurulumPuani: d.kurulumPuani,
        hubUyumlulugu: [...d.hubUyumlulugu],
        disMekan: d.disMekan,
        oneCikan: d.oneCikan,
      },
    });
  }

  for (const kit of KITS) {
    const created = await prisma.kit.upsert({
      where: { slug: kit.slug },
      update: {},
      create: {
        slug: kit.slug,
        ad: kit.ad,
        hedef: kit.hedef,
        kapsam: kit.kapsam,
        aciklama: kit.aciklama,
        kurulumDakika: kit.kurulumDakika,
        oneCikan: kit.oneCikan,
        teklifBazli: kit.teklifBazli ?? false,
      },
    });
    for (const item of kit.cihazlar) {
      const device = await prisma.device.findUniqueOrThrow({
        where: { slug: item.deviceSlug },
      });
      await prisma.kitItem.upsert({
        where: { kitId_deviceId: { kitId: created.id, deviceId: device.id } },
        update: { adet: item.adet },
        create: { kitId: created.id, deviceId: device.id, adet: item.adet },
      });
    }
  }

  console.log(`Seed tamam: ${DEVICES.length} cihaz, ${KITS.length} kit.`);
  console.warn(
    "\n[[DOLDUR]] UYARI — aşağıdaki veriler placeholder, yayın öncesi gerçek değerlerle değiştirilmeli:",
  );
  for (const item of MISSING_DATA) console.warn(`  - ${item}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
