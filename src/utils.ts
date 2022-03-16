import * as bcrypt from "bcrypt";

// Convert category string in ID of category table in database
export function convertCategoryId(name: any) {
  let category_id: number;

  switch (name) {
    case "tênis":
      category_id = 1;
      break;
    case "camisetas":
      category_id = 2;
      break;
    case "relógios":
      category_id = 3;
      break;
  }

  return category_id;
}

export function createUpdateProductParam(body: any) {
  let rawParam = "";

  rawParam += body.title ? `title = '${body.title}', ` : "";
  rawParam += body.price ? `price = ${body.price}, ` : "";
  rawParam += body.image_url ? `image_url = '${body.image_url}', ` : "";
  rawParam += body.description ? `description = '${body.description}', ` : "";
  rawParam += body.category_id
    ? `category_id = ${convertCategoryId(body.category_id)}, `
    : "";
  rawParam += body.stock ? `stock = ${body.stock}, ` : "";

  const finalParam = rawParam.slice(0, -2);

  return finalParam;
}
export function createUpdateUserParam(body: any) {
  let rawParam = "";

  rawParam += body.nickname ? `nickname = '${body.nickname}', ` : "";
  rawParam += body.fullname ? `fullname = '${body.fullname}', ` : "";
  rawParam += body.email ? `email = '${body.email}', ` : "";
  rawParam += body.password ? `password = '${body.password}', ` : "";
  rawParam += body.auth_token ? `auth_token = '${body.auth_token}', ` : "";

  const finalParam = rawParam.slice(0, -2);

  return finalParam;
}

export async function encryptString(password: string, email: string) {
  const hash = await bcrypt.hash(password, email.length).then((res) => {
    return res;
  });

  return hash;
}
