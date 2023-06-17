import puppeteer from "puppeteer-core";

//URL PAGE
const URL = 'https://id.wikipedia.org/wiki/Daftar_perguruan_tinggi_negeri_di_Indonesia';



(async () => {
  const browser = await puppeteer.launch({
    channel: "chrome",
  });

  const page = await browser.newPage();
  await page.goto(URL);

  const data = await page.evaluate(() => {
    //selector
    const perguruanTinggi = document.querySelectorAll(
      "div.mw-parser-output > ul > li > a:nth-child(1)"
    );

    let listPerguruanTinggi = [];
    
    //take value from selector and push into listPerguruanTinggi
    perguruanTinggi.forEach((element) => {
      listPerguruanTinggi.push(element.textContent.trim());
    });

    //filter listPerguruanTinggi with value "Universitas"
    const listUniversitas = listPerguruanTinggi.filter((perguruanTinggi) => {
      return perguruanTinggi.startsWith("Universitas")
    })

    return listUniversitas
  });

  console.log(data);

  // Tutup browser Puppeteer
  await browser.close();
})();
