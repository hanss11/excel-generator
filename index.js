const ExcelJS = require("exceljs");
const faker = require("faker");
const minimist = require("minimist");

faker.locale = "es";

let args = minimist(process.argv.slice(2), {
  boolean: ["categoria", "titulo", "foto"],
  string: ["mla", "brand"],
});

const { categoria, titulo, foto, productos = 5, mla, brand = "Aleph" } = args;

const saveExcel = (data) => {
  const workbook = new ExcelJS.Workbook();

  const fileName = "Productos a importar.xlsx";

  const sheet = workbook.addWorksheet("productos");

  const reColumns = [
    { header: "Marca del producto", key: "brand" },
    { header: "Código SKU Marca", key: "sku" },
    ...(categoria && [{ header: "Categoría", key: "categoria" }]),
    ...(titulo && [{ header: "Título", key: "title" }]),
    ...(foto && [{ header: "URL de foto", key: "foto" }]),
  ];

  sheet.columns = reColumns;
  sheet.addRows(data);

  workbook.xlsx
    .writeFile(fileName)
    .then((e) => {
      console.log("Creado exitosamente");
    })
    .catch(() => {
      console.log("Error al crear archivo");
    });
};

let data = [];
for (i = 0; i < productos; i++) {
  data.push({
    brand: brand,
    sku: `skuQA${faker.datatype.uuid()}`,
    ...(titulo && { title: faker.commerce.productName() }),
    ...(categoria && { categoria: mla }),
    ...(foto && {
      foto: "https://economipedia.com/wp-content/uploads/test-de-estr%C3%A9s.png",
    }),
  });
}

//console.log(data);
saveExcel(data);
