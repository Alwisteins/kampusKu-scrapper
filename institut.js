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
    const institut = document.querySelectorAll(
      "div.mw-parser-output > ul > li > a:nth-child(1)"
    );

    let listPerguruanTinggi = [];

    //take value from selector and push into listPerguruanTinggi
    institut.forEach((element) => {
      listPerguruanTinggi.push(element.textContent.trim());
    });

    //filter listPerguruanTinggi with value "Institut"
    const listInstitut = listPerguruanTinggi.filter((perguruanTinggi) => {
      return perguruanTinggi.startsWith("Institut");
    });

    return listInstitut;
  });

  console.log(data);

  // Tutup browser Puppeteer
  await browser.close();
})();
