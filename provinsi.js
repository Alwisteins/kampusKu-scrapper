import puppeteer from "puppeteer-core";

//URL PAGE
const URL =
  "https://id.wikipedia.org/wiki/Daftar_perguruan_tinggi_negeri_di_Indonesia";

(async () => {
  const browser = await puppeteer.launch({
    channel: "chrome",
  });

  const page = await browser.newPage();
  await page.goto(URL);

  const data = await page.evaluate(() => {
    //selector
    const provinsi = document.querySelectorAll("h3 > span.mw-headline");

    let listProvinsi = [];

    //take value from selector and push into listProvinsi
    provinsi.forEach((element) => {
      listProvinsi.push(element.textContent.trim());
    });

    return listProvinsi;
  });

  fs.writeFileSync("./data-output/data-universitas.json", JSON.stringify(data));
  console.log(data);

  // Tutup browser Puppeteer
  await browser.close();
})();
