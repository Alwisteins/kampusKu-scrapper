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
    const selector = document.querySelectorAll(
      "div.mw-parser-output > ul > li > a"
    );

    let listPerguruanTinggi = [];

    //take value from selector and push into listPerguruanTinggi
    selector.forEach((element) => {
      const perguruanTinggi = element.textContent;
      listPerguruanTinggi.push(perguruanTinggi);
    });

    //filter to get list Universitas
    const Universitas = listPerguruanTinggi.filter((item) => {
      return item.startsWith("Universitas");
    });

    //filter to get list kota Universitas
    const kota = listPerguruanTinggi.filter((item, index) => {
      return (
        index > 0 && listPerguruanTinggi[index - 1].startsWith("Universitas")
      );
    });

    //combining Universitas and kota into one array & one item each index
    const detail = Universitas.map((item, index) => {
      return item + ", " + kota[index];
    });

    return detail;
  });

  console.log(data);

  // Tutup browser Puppeteer
  await browser.close();
})();
