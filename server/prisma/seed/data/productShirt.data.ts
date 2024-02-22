import { Prisma, ProductGenderEnum } from "@prisma/client";
import { ProductCategorySeedEnum } from "./products.data";

const products: (Omit<Prisma.ProductCreateManyInput, "slug" | "categoryId"> & {
  categoryName: ProductCategorySeedEnum;
})[] = [
  {
    name: "Kemeja Linen Blend Kerah Terbuka Lengan Pendek",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/464739/item/idgoods_31_464739.jpg?width=750",
    price: 299e3,
    stock: 20,
    gender: ProductGenderEnum.FEMALE,
    description:
      "Kemeja Wanita yang serbaguna dengan nuansa alami dan dapat dilapiskan.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E464739-000?colorCode=COL31&sizeCode=SMA002",
    categoryName: ProductCategorySeedEnum.KEMEJA,
  },
  {
    name: "Kemeja Motif Katun Modal Kerah Terbuka Lengan Pendek",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/467512/item/idgoods_69_467512.jpg?width=750",
    price: 299e3,
    stock: 15,
    gender: ProductGenderEnum.MALE,
    description:
      "Kemeja Pria dari bahan yang lembut dengan aksen drape yang elegan. Potongan rileks untuk mudah dilapiskan.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E467512-000?colorCode=COL69&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.KEMEJA,
  },
  {
    name: "Kemeja Studio Ghibli Kerah Terbuka Lengan Pendek",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/466531/item/idgoods_33_466531.jpg?width=750",
    price: 499e3,
    stock: 10,
    gender: ProductGenderEnum.MALE,
    description:
      "Koleksi original yang menampilkan Studio Ghibli universe dalam berbagai cara.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E466531-000?colorCode=COL33&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.KEMEJA,
  },
  {
    name: "Kemeja Flannel Lengan Panjang",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/450267/item/idgoods_04_450267.jpg?width=750",
    price: 399e3,
    stock: 15,
    gender: ProductGenderEnum.MALE,
    description:
      "Kemeja Pria dari bahan flanel yang ringan dan cocok untuk gaya apa pun. Fit reguler sehingga mudah dilapiskan.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E450267-000?colorCode=COL04&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.KEMEJA,
  },
  {
    name: "Kemeja Katun Linen Kerah Tegak Lengan Panjang",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/464933/item/idgoods_00_464933.jpg?width=750",
    price: 399e3,
    stock: 25,
    gender: ProductGenderEnum.UNISEX,
    description:
      "Kemeja Pria yang kini dibuat dari kandungan katun lebih tinggi untuk nuansa yang lebih lembut. Fit rileks dapat dikenakan sendirinya atau sebagai outer layer.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E464933-000?colorCode=COL00&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.KEMEJA,
  },
  {
    name: "Kemeja Luaran Jersey Lengan Panjang",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462092/item/idgoods_31_462092.jpg?width=750",
    price: 599e3,
    stock: 35,
    gender: ProductGenderEnum.UNISEX,
    description:
      "Jaket kemeja Pria dengan nuansa workwear yang autentik. Dengan fit rileks membuatnya dapat dikenakan berlapis.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E462092-000?colorCode=COL31&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.KEMEJA,
  },
  {
    name: "Kemeja Extra Fine Cotton Garis Lengan Panjang",
    imgUrl:
      "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/464805/item/idgoods_51_464805.jpg?width=750",
    price: 399e3,
    stock: 25,
    gender: ProductGenderEnum.FEMALE,
    description:
      "Kemeja Wanita dari bahan 100% serat katun ultra-long dengan kilau yang elegan dan bertekstur lembut.",
    sourceUrl:
      "https://www.uniqlo.com/id/id/products/E464805-000?colorCode=COL51&sizeCode=SMA003",
    categoryName: ProductCategorySeedEnum.KEMEJA,
  },
];

export default products;
