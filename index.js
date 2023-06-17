import puppeteer from "puppeteer-core";

//URL PAGE
const institut_URL = "https://pddikti.kemdikbud.go.id/search/institut";

(async () => {
  const browser = await puppeteer.launch({
    channel: "chrome",
  });

  const page = await browser.newPage();
  await page.goto(institut_URL);

  // waiting div with id root rendered
  await page.waitForSelector("body > div#root");

  const data = await page.evaluate(() => {
    //selector
    const nodeListInstitut = document.querySelectorAll(
      "tr > td:nth-child(3) > a.add-cart-parimary-btn > span"
    );

    let listInstitut = [];
    
    //take value from selector and push into listInstitut
    nodeListInstitut.forEach((element) => {
      listInstitut.push(element.textContent.trim());
    });

    return listInstitut;
  });

  console.log(data);

  // Tutup browser Puppeteer
  await browser.close();
})();
