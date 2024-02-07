import { Prisma } from "@prisma/client";

export enum ProductCategorySeedEnum {
  ATASAN = "ATASAN",
  JAKET = "JAKET",
  KEMEJA = "KEMEJA",
  CARDIGAN = "CARDIGAN",
}

const products: (Omit<Prisma.ProductCreateManyInput, "slug" | "categoryId"> & {
  categoryName: ProductCategorySeedEnum;
})[] = [
  {
    name: "T-Shirt Waffle Kerah Bulat Lengan Panjang",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/449860/item/idgoods_53_449860.jpg",
    price: 149e3,
    stock: 20,
    gender: "FEMALE",
    description:
      "T-shirt Wanita yang terasa halus, ringan, dan nyaman dikenakan. Potongan rileks agar mudah dipadupadankan. Kini dengan harga baru",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E449860-000?colorCode=COL53&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.ATASAN,
  },
  {
    name: "Sweater Lengan Panjang",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/444966/item/idgoods_64_444966.jpg",
    price: 399e3,
    stock: 15,
    gender: "MALE",
    description:
      "Sweater Pria yang dibuat dari pilihan bahan yang lembut. Terlihat autentik dengan detail yang dirancang dengan cermat.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E444966-000?colorCode=COL64&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.JAKET,
  },
  {
    name: "Jaket Sweat Dry Stretch Hoodie Lengan Panjang (Polos)",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/460325/item/idgoods_56_460325.jpg",
    price: 599e3,
    stock: 25,
    gender: "MALE",
    description:
      "Jaket hoodie Pria dengan lapisan matte yang terlihat kasual dan terasa sejuk di bagian tudung dan saku.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E460325-000?colorCode=COL56&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.JAKET,
  },
  {
    name: "AIRism Jaket Mesh Hoodie Proteksi Sinar UV Lengan Panjang",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/456261/item/idgoods_11_456261.jpg",
    price: 399e3,
    stock: 50,
    gender: "FEMALE",
    description:
      "Jaket hoodie Wanita dari bahan mesh yang sejuk dan dilengkapi fitur Cool Touch untuk kenyamanan.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E456261-000?colorCode=COL11&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.JAKET,
  },
  {
    name: "Jaket Sweat Hoodie Ritsleting Garis Lengan Panjang",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/466765/item/idgoods_32_466765.jpg",
    price: 499e3,
    stock: 25,
    gender: "UNISEX",
    description:
      "Jaket hoodie Pria dari bahan sweat yang halus dengan lapisan yang tidak mudah mencuat. Didesain khusus dengan perhatian terhadap detail. Produk ini tidak dapat dikembalikan.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E466765-000?colorCode=COL32&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.JAKET,
  },
  {
    name: "Kardigan Proteksi Sinar UV Kerah Bulat Lengan Panjang (Garis)",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/470910/item/idgoods_69_470910.jpg",
    price: 199e3,
    stock: 15,
    gender: "FEMALE",
    description:
      "Cardigan Wanita dari bahan campuran katun-rayon yang lembut dan nyaman, juga dilengkapi fitur UV protection.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E470910-000?colorCode=COL69&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.CARDIGAN,
  },
  {
    name: "Jaket Pendek Rajut",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/466366001/item/idgoods_69_466366001.jpg",
    price: 599e3,
    stock: 10,
    gender: "FEMALE",
    description:
      "Jaket Wanita dengan tekstur rajut yang stylish. Desain klasik tanpa kerah dengan kancing berukuran besar.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E466366-001?colorCode=COL69&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.JAKET,
  },
  {
    name: "AIRism T-Shirt Proteksi Sinar UV Kerah Tinggi",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/457783/item/goods_30_457783.jpg",
    price: 199e3,
    stock: 15,
    gender: "FEMALE",
    description:
      "Dalaman Wanita dengan desain high neck dan perlindungan terhadap sinar UV. Bahan sejuk dan cepat kering untuk kenyamanan Anda. Untuk alasan kesehatan, produk ini tidak dapat dikembalikan.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E457783-000?colorCode=COL30&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.ATASAN,
  },
  {
    name: "Jaket Parka Saku Proteksi Sinar UV (Water-Repellent)",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/464022/item/idgoods_56_464022.jpg",
    price: 499e3,
    stock: 35,
    gender: "MALE",
    description:
      "Jaket Pria yang memiliki fitur UV protection (UPF50+). Bahan yang bertekstur dengan lapisan water-repellent.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E464022-000?colorCode=COL56&sizeCode=SMA002",
    categoryName: ProductCategorySeedEnum.JAKET,
  },
  {
    name: "BLOCKTECH Jaket Parka Potongan 3D (Water-Repellent)",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/464024/item/idgoods_66_464024.jpg",
    price: 999e3,
    stock: 40,
    gender: "MALE",
    description:
      "Jaket Pria performa tinggi untuk perlindungan di berbagai cuaca. Tape pelapis di bagian jahitan untuk mencegah air masuk ke dalam jaket.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E464024-000?colorCode=COL66&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.JAKET,
  },
  {
    name: "Jaket Kemeja Miracle Air (AirSense)",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/464917/item/idgoods_09_464917.jpg",
    price: 699e3,
    stock: 50,
    gender: "UNISEX",
    description:
      "Jaket Pria dari bahan yang ringan, lentur, cepat kering, dan luar biasa nyaman.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E464917-000?colorCode=COL09&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.JAKET,
  },
  {
    name: "Jaket Hoodie DRY-EX Lengan Panjang Ultra Stretch (Motif)",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/467763/item/idgoods_03_467763.jpg",
    price: 399e3,
    stock: 10,
    gender: "UNISEX",
    description:
      "Quick-drying for stay-fresh comfort. Excellent stretch for easy movement. UPF50+.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E467763-000?colorCode=COL03&sizeCode=SMA002",
    categoryName: ProductCategorySeedEnum.JAKET,
  },
];

export default products;
