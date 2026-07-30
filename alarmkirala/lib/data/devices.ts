/**
 * Ajax cihaz kataloğu — brief §4.1
 *
 * DİKKAT [[DOLDUR]]: `aylikKiraTL` değerleri ÖRNEK placeholder'dır.
 * Gerçek kira fiyatları netleşmeden yayına çıkmaz; UI her fiyatın
 * yanında "örnek fiyat" rozeti gösterir (PRICING_IS_PLACEHOLDER).
 */

export const PRICING_IS_PLACEHOLDER = true;

export type DeviceCategory =
  | "hub"
  | "hareket"
  | "acilma"
  | "cam"
  | "yangin"
  | "su"
  | "siren"
  | "kontrol"
  | "otomasyon"
  | "video";

export const CATEGORY_LABELS: Record<DeviceCategory, string> = {
  hub: "Kontrol Paneli",
  hareket: "Hareket Dedektörü",
  acilma: "Açılma / Temas",
  cam: "Cam Kırılma",
  yangin: "Yangın & Can Güvenliği",
  su: "Su Baskını",
  siren: "Siren",
  kontrol: "Kontrol Arayüzü",
  otomasyon: "Otomasyon",
  video: "Video",
};

export interface Device {
  slug: string;
  ad: string;
  kategori: DeviceCategory;
  kisaAciklama: string;
  uzunAciklama: string;
  teknikOzellikler: string[];
  /** [[DOLDUR]] örnek placeholder — gerçek fiyat değil */
  aylikKiraTL: number;
  /** 1-5: kurulum eforu; randevu süresi tahmini için kullanılır */
  kurulumPuani: number;
  hubUyumlulugu: string[];
  disMekan: boolean;
  oneCikan: boolean;
}

const TUM_HUBLAR = ["hub", "hub-plus", "hub-2", "hub-2-plus", "hub-hybrid"];

export const DEVICES: Device[] = [
  // ── Kontrol panelleri ────────────────────────────────────────────
  {
    slug: "hub-2",
    ad: "Hub 2",
    kategori: "hub",
    kisaAciklama: "Fotoğraf doğrulamalı sistemlerin beyni. 100 cihaza kadar.",
    uzunAciklama:
      "Hub 2, tüm dedektörleri Jeweller radyo protokolüyle yönetir. Alarmda MotionCam fotoğraflarını saniyeler içinde telefonuna iletir. Çift GSM + Ethernet ile kesintisiz bağlantı.",
    teknikOzellikler: [
      "100 cihaz kapasitesi",
      "Jeweller radyo — 2 km menzile kadar",
      "2× GSM + Ethernet yedekli bağlantı",
      "Fotoğraf doğrulama desteği",
    ],
    aylikKiraTL: 349,
    kurulumPuani: 3,
    hubUyumlulugu: [],
    disMekan: false,
    oneCikan: true,
  },
  {
    slug: "hub-2-plus",
    ad: "Hub 2 Plus",
    kategori: "hub",
    kisaAciklama: "Büyük mekânlar için: 200 cihaz, Wi-Fi + LTE.",
    uzunAciklama:
      "Hub 2 Plus, villa, mağaza ve çok katlı mekânlar için tasarlandı. 200 cihaz kapasitesi, Wi-Fi ve LTE dahil dört bağlantı kanalı, daha hızlı fotoğraf iletimi.",
    teknikOzellikler: [
      "200 cihaz kapasitesi",
      "Ethernet + Wi-Fi + 2× SIM (LTE)",
      "Fotoğraf doğrulama desteği",
      "25 kamera bağlantısı",
    ],
    aylikKiraTL: 449,
    kurulumPuani: 3,
    hubUyumlulugu: [],
    disMekan: false,
    oneCikan: true,
  },
  {
    slug: "hub",
    ad: "Hub",
    kategori: "hub",
    kisaAciklama: "Kompakt sistemler için giriş seviyesi panel.",
    uzunAciklama:
      "Hub, küçük daire ve ofisler için temel kontrol paneli. GSM + Ethernet bağlantısı, 100 cihaz kapasitesi.",
    teknikOzellikler: ["100 cihaz kapasitesi", "GSM + Ethernet", "Jeweller radyo"],
    aylikKiraTL: 249,
    kurulumPuani: 2,
    hubUyumlulugu: [],
    disMekan: false,
    oneCikan: false,
  },
  {
    slug: "hub-plus",
    ad: "Hub Plus",
    kategori: "hub",
    kisaAciklama: "150 cihaz, çift SIM ve Wi-Fi ile geniş kapsama.",
    uzunAciklama:
      "Hub Plus, orta ölçekli mekânlar için genişletilmiş kapasite ve çoklu bağlantı kanalı sunar.",
    teknikOzellikler: ["150 cihaz kapasitesi", "Ethernet + Wi-Fi + 2× SIM"],
    aylikKiraTL: 329,
    kurulumPuani: 3,
    hubUyumlulugu: [],
    disMekan: false,
    oneCikan: false,
  },
  {
    slug: "hub-hybrid",
    ad: "Hub Hybrid",
    kategori: "hub",
    kisaAciklama: "Kablolu + kablosuz karma sistemler için.",
    uzunAciklama:
      "Hub Hybrid, mevcut kablolu altyapıyı Ajax kablosuz cihazlarıyla tek sistemde birleştirir. Renovasyon ve kurumsal projeler için idealdir.",
    teknikOzellikler: ["100 kablosuz + kablolu bölge", "Fibra + Jeweller", "Fotoğraf doğrulama"],
    aylikKiraTL: 399,
    kurulumPuani: 4,
    hubUyumlulugu: [],
    disMekan: false,
    oneCikan: false,
  },

  // ── Hareket ──────────────────────────────────────────────────────
  {
    slug: "motionprotect",
    ad: "MotionProtect",
    kategori: "hareket",
    kisaAciklama: "İç mekân hareket dedektörü. 12 m algılama.",
    uzunAciklama:
      "MotionProtect, oda ve koridorları izler. Pil ömrü 7 yıla kadar — kablo yok, delik yok, bakım derdi yok.",
    teknikOzellikler: ["12 m algılama mesafesi", "7 yıla kadar pil ömrü", "Jeweller radyo"],
    aylikKiraTL: 79,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: true,
  },
  {
    slug: "motionprotect-plus",
    ad: "MotionProtect Plus",
    kategori: "hareket",
    kisaAciklama: "Evcil hayvan dostu: mikrodalga + kızılötesi çift sensör.",
    uzunAciklama:
      "MotionProtect Plus, kızılötesine ek mikrodalga sensörüyle sıcak hava akımı ve evcil hayvan kaynaklı yanlış alarmları eler.",
    teknikOzellikler: ["Çift teknoloji: PIR + mikrodalga", "Evcil hayvan bağışıklığı", "12 m algılama"],
    aylikKiraTL: 99,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },
  {
    slug: "motionprotect-curtain",
    ad: "MotionProtect Curtain",
    kategori: "hareket",
    kisaAciklama: "Perde tipi dar açı: pencere ve balkon hattı koruması.",
    uzunAciklama:
      "Dar perde deseniyle yalnızca belirlediğin hattı izler — içeride serbest dolaşım sürerken pencere hattı korunur.",
    teknikOzellikler: ["Perde algılama deseni", "6 m menzil", "İç mekân"],
    aylikKiraTL: 89,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },
  {
    slug: "motionprotect-outdoor",
    ad: "MotionProtect Outdoor",
    kategori: "hareket",
    kisaAciklama: "Bahçe ve dış alan: çift PIR, evcil hayvan bağışıklığı.",
    uzunAciklama:
      "MotionProtect Outdoor, tehdidi daha kapıya gelmeden algılar. Çift sensör ve anti-maskeleme ile dış ortam koşullarına dayanıklıdır.",
    teknikOzellikler: ["Dış mekân IP55", "Çift PIR sensör", "Anti-maskeleme", "15 m ayarlanabilir menzil"],
    aylikKiraTL: 159,
    kurulumPuani: 3,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: true,
    oneCikan: true,
  },
  {
    slug: "motioncam",
    ad: "MotionCam",
    kategori: "hareket",
    kisaAciklama: "Fotoğraf doğrulamalı hareket dedektörü.",
    uzunAciklama:
      "Alarm anında seri fotoğraf çeker ve telefonuna iletir. Gerçek tehdit mi, yanlış alarm mı — saniyeler içinde görürsün. İzleme merkezi de aynı kareleri görür.",
    teknikOzellikler: ["Dahili kamera ile fotoğraf doğrulama", "12 m algılama", "4 yıla kadar pil"],
    aylikKiraTL: 129,
    kurulumPuani: 1,
    hubUyumlulugu: ["hub-2", "hub-2-plus", "hub-hybrid"],
    disMekan: false,
    oneCikan: true,
  },
  {
    slug: "dualcurtain-outdoor",
    ad: "DualCurtain Outdoor",
    kategori: "hareket",
    kisaAciklama: "Çift yönlü perde: cephe boyu dış koruma.",
    uzunAciklama:
      "İki yöne bakan perde sensörleriyle bina cephesini tek cihazla korur. Pencere ve kapılara yaklaşan daha camı açamadan algılanır.",
    teknikOzellikler: ["Çift yönlü perde deseni", "30 m toplam kapsama", "Dış mekân"],
    aylikKiraTL: 189,
    kurulumPuani: 3,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: true,
    oneCikan: false,
  },
  {
    slug: "combiprotect",
    ad: "CombiProtect",
    kategori: "hareket",
    kisaAciklama: "Hareket + cam kırılma tek cihazda.",
    uzunAciklama:
      "CombiProtect, hareket ve cam kırılma algılamayı birleştirir — pencereli odalar için ekonomik çözüm.",
    teknikOzellikler: ["PIR + akustik cam sensörü", "12 m / 9 m algılama"],
    aylikKiraTL: 109,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },

  // ── Açılma / temas ───────────────────────────────────────────────
  {
    slug: "doorprotect",
    ad: "DoorProtect",
    kategori: "acilma",
    kisaAciklama: "Kapı / pencere açılma dedektörü.",
    uzunAciklama:
      "DoorProtect, kapı veya pencere açıldığı anda sinyal gönderir. Kablosuz, yapıştırmalı montaj — kiralık evde iz bırakmaz.",
    teknikOzellikler: ["Manyetik temas sensörü", "7 yıla kadar pil", "Yapıştırmalı montaj"],
    aylikKiraTL: 59,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: true,
  },
  {
    slug: "doorprotect-plus",
    ad: "DoorProtect Plus",
    kategori: "acilma",
    kisaAciklama: "Darbe ve eğim sensörlü gelişmiş kapı dedektörü.",
    uzunAciklama:
      "Açılmayı beklemez: kapıya vurulmasını ve zorlanmasını da algılar. Depo kapısı ve pencere kanatları için idealdir.",
    teknikOzellikler: ["Temas + darbe + eğim sensörü", "7 yıla kadar pil"],
    aylikKiraTL: 79,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },

  // ── Cam kırılma ──────────────────────────────────────────────────
  {
    slug: "glassprotect",
    ad: "GlassProtect",
    kategori: "cam",
    kisaAciklama: "Akustik cam kırılma dedektörü. 9 m menzil.",
    uzunAciklama:
      "GlassProtect, cam kırılma sesini iki aşamalı doğrulamayla algılar; anahtar sesi gibi gürültülerde yanlış alarm üretmez.",
    teknikOzellikler: ["9 m algılama menzili", "Çift aşamalı ses doğrulama", "7 yıla kadar pil"],
    aylikKiraTL: 69,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },

  // ── Yangın & can güvenliği ───────────────────────────────────────
  {
    slug: "fireprotect-2",
    ad: "FireProtect 2",
    kategori: "yangin",
    kisaAciklama: "Duman + ısı sensörlü yangın dedektörü.",
    uzunAciklama:
      "FireProtect 2, dumanı ve ani sıcaklık artışını izler. Sistem kapalıyken bile 7/24 çalışır — yangın algılama hiçbir zaman devre dışı kalmaz.",
    teknikOzellikler: ["Duman + ısı sensörü", "Dahili siren 85 dB", "Değiştirilebilir pil ile 10 yıla kadar"],
    aylikKiraTL: 119,
    kurulumPuani: 2,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: true,
  },
  {
    slug: "fireprotect-2-rb",
    ad: "FireProtect 2 RB (CO)",
    kategori: "yangin",
    kisaAciklama: "Duman + ısı + karbonmonoksit tek cihazda.",
    uzunAciklama:
      "Görünmez tehlike karbonmonoksiti de izler. Kombili ve şömineli evler için önerilir.",
    teknikOzellikler: ["Duman + ısı + CO sensörü", "Dahili siren", "7/24 bağımsız çalışma"],
    aylikKiraTL: 149,
    kurulumPuani: 2,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },

  // ── Su baskını ───────────────────────────────────────────────────
  {
    slug: "leaksprotect",
    ad: "LeaksProtect",
    kategori: "su",
    kisaAciklama: "Su kaçağını ilk damlada algılar.",
    uzunAciklama:
      "Çamaşır makinesi altına, lavabo dolabına koy — su temasında anında bildirim alırsın. Minik gövde, 5 yıl pil.",
    teknikOzellikler: ["Temas anında algılama", "5 yıla kadar pil", "Montaj gerektirmez"],
    aylikKiraTL: 49,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },
  {
    slug: "waterstop",
    ad: "WaterStop",
    kategori: "su",
    kisaAciklama: "Kaçak algılanınca ana vanayı otomatik kapatır.",
    uzunAciklama:
      "LeaksProtect sinyaliyle ana su vanasını saniyeler içinde kapatır. Tatildeyken patlayan hortum artık felaket değil, bildirim.",
    teknikOzellikler: ["Otomatik vana kapatma", "LeaksProtect ile senaryo", "1/2\"–1\" vana desteği"],
    aylikKiraTL: 139,
    kurulumPuani: 4,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },

  // ── Sirenler ─────────────────────────────────────────────────────
  {
    slug: "homesiren",
    ad: "HomeSiren",
    kategori: "siren",
    kisaAciklama: "İç mekân siren. 105 dB'e kadar.",
    uzunAciklama:
      "HomeSiren, alarm anında davetsiz misafiri caydırır ve içeridekileri uyarır. Ses seviyesi uygulamadan ayarlanır.",
    teknikOzellikler: ["81–105 dB ayarlanabilir", "LED durum göstergesi", "5 yıla kadar pil"],
    aylikKiraTL: 69,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },
  {
    slug: "streetsiren",
    ad: "StreetSiren",
    kategori: "siren",
    kisaAciklama: "Dış cephe sireni. 113 dB'e kadar, LED çerçeveli.",
    uzunAciklama:
      "Cephedeki StreetSiren tek başına caydırıcıdır. Sökülme girişiminde bağımsız alarm verir.",
    teknikOzellikler: ["85–113 dB", "IP54 dış mekân", "Sabotaj koruması"],
    aylikKiraTL: 119,
    kurulumPuani: 3,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: true,
    oneCikan: false,
  },
  {
    slug: "streetsiren-doubledeck",
    ad: "StreetSiren DoubleDeck",
    kategori: "siren",
    kisaAciklama: "Çift katmanlı dış siren — marka panelli.",
    uzunAciklama:
      "DoubleDeck, yüksek görünürlüklü çift katman gövdesiyle işletme cephelerinde hem caydırıcı hem kurumsal durur.",
    teknikOzellikler: ["85–113 dB", "Aydınlatmalı ön panel", "IP54"],
    aylikKiraTL: 139,
    kurulumPuani: 3,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: true,
    oneCikan: false,
  },

  // ── Kontrol arayüzleri ───────────────────────────────────────────
  {
    slug: "spacecontrol",
    ad: "SpaceControl",
    kategori: "kontrol",
    kisaAciklama: "Cep kumandası: kur, çöz, panik butonu.",
    uzunAciklama:
      "Telefon çıkarmadan sistemi yönet. Panik butonu uzun basışla sessiz alarm gönderir.",
    teknikOzellikler: ["Kur / çöz / gece modu", "Panik butonu", "5 yıla kadar pil"],
    aylikKiraTL: 39,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },
  {
    slug: "keypad",
    ad: "KeyPad",
    kategori: "kontrol",
    kisaAciklama: "Dokunmatik tuş takımı — şifreyle kurma/çözme.",
    uzunAciklama:
      "Girişe monte edilen KeyPad ile aile bireyleri ve çalışanlar kendi şifreleriyle sistemi yönetir; kim ne zaman girdi kayıt altındadır.",
    teknikOzellikler: ["Kişi bazlı şifre", "Zorlama (duress) kodu", "2 yıla kadar pil"],
    aylikKiraTL: 69,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },
  {
    slug: "keypad-plus",
    ad: "KeyPad Plus",
    kategori: "kontrol",
    kisaAciklama: "Kartlı / etiketli temassız erişim.",
    uzunAciklama:
      "KeyPad Plus, DESFire kart ve etiketlerle temassız kurma/çözme sağlar — şifre ezberletmek istemediğin ekipler için.",
    teknikOzellikler: ["Temassız kart/etiket", "Kişi bazlı erişim kaydı"],
    aylikKiraTL: 89,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },
  {
    slug: "keypad-touchscreen",
    ad: "KeyPad TouchScreen",
    kategori: "kontrol",
    kisaAciklama: "Dokunmatik ekranlı premium kontrol paneli.",
    uzunAciklama:
      "Sistemin durumu, odalar ve senaryolar tek ekranda. Villa ve ofis girişleri için premium arayüz.",
    teknikOzellikler: ["Dokunmatik ekran", "Kart + şifre + uygulama", "Duvar montajı"],
    aylikKiraTL: 149,
    kurulumPuani: 2,
    hubUyumlulugu: ["hub-2", "hub-2-plus", "hub-hybrid"],
    disMekan: false,
    oneCikan: false,
  },
  {
    slug: "button",
    ad: "Button (Panik)",
    kategori: "kontrol",
    kisaAciklama: "Tek tuş: panik alarmı veya senaryo tetikleme.",
    uzunAciklama:
      "Kasanın altına, tezgâhın arkasına sabitlenir. Basıldığında izleme merkezine sessiz panik sinyali gider. Dükkân kitlerinde zorunludur.",
    teknikOzellikler: ["Sessiz panik modu", "Senaryo tetikleme", "5 yıla kadar pil"],
    aylikKiraTL: 35,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },

  // ── Otomasyon ────────────────────────────────────────────────────
  {
    slug: "socket",
    ad: "Socket",
    kategori: "otomasyon",
    kisaAciklama: "Akıllı priz: uzaktan aç/kapat + tüketim izleme.",
    uzunAciklama:
      "Socket ile prize takılı cihazı uygulamadan yönet, enerji tüketimini izle, senaryolara bağla.",
    teknikOzellikler: ["Uzaktan kontrol", "Enerji izleme", "Aşırı yük koruması"],
    aylikKiraTL: 45,
    kurulumPuani: 1,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },
  {
    slug: "relay",
    ad: "Relay",
    kategori: "otomasyon",
    kisaAciklama: "Kuru kontak röle: kapı, bariyer, motor kontrolü.",
    uzunAciklama:
      "Relay, düşük voltaj hatlarını uzaktan anahtarlar — otomatik kapı, sulama, aydınlatma senaryoları için.",
    teknikOzellikler: ["Kuru kontak", "Senaryo desteği"],
    aylikKiraTL: 45,
    kurulumPuani: 3,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },
  {
    slug: "wallswitch",
    ad: "WallSwitch",
    kategori: "otomasyon",
    kisaAciklama: "230V hat kontrolü ve tüketim ölçümü.",
    uzunAciklama:
      "WallSwitch, 230V hattı uzaktan yönetir; alarm senaryolarına bağlanabilir (ör. alarmda tüm ışıkları yak).",
    teknikOzellikler: ["230V anahtarlama", "Enerji ölçümü"],
    aylikKiraTL: 49,
    kurulumPuani: 3,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },
  {
    slug: "lightswitch",
    ad: "LightSwitch",
    kategori: "otomasyon",
    kisaAciklama: "Akıllı ışık anahtarı — dokunmatik panel.",
    uzunAciklama:
      "Mevcut anahtarın yerine geçer; ışıkları uygulamadan, senaryodan veya dokunuşla yönet.",
    teknikOzellikler: ["Dokunmatik panel", "Nötrsüz montaj seçeneği"],
    aylikKiraTL: 55,
    kurulumPuani: 3,
    hubUyumlulugu: TUM_HUBLAR,
    disMekan: false,
    oneCikan: false,
  },

  // ── Video ────────────────────────────────────────────────────────
  {
    slug: "ajax-kamera",
    ad: "Ajax Kamera",
    kategori: "video",
    kisaAciklama: "Alarm doğrulamalı IP kamera ailesi.",
    uzunAciklama:
      "Ajax kameralar alarm olaylarıyla senkron çalışır: alarm anındaki görüntü, olay kaydının yanına düşer. KVKK gereği görüntülü cihazlarda ayrı açık rıza alınır.",
    teknikOzellikler: ["Alarm-senkron kayıt", "Mobil canlı izleme", "NVR desteği"],
    aylikKiraTL: 199,
    kurulumPuani: 3,
    hubUyumlulugu: ["hub-2", "hub-2-plus", "hub-hybrid"],
    disMekan: true,
    oneCikan: false,
  },
];

export const deviceBySlug = (slug: string) =>
  DEVICES.find((d) => d.slug === slug);

export function getDevicesByCategory(kategori: DeviceCategory) {
  return DEVICES.filter((d) => d.kategori === kategori);
}
