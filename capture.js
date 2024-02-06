const page = await browser.newPage();
await page.goto('https://www.jiritsu-red.jp/contact/');
const gradeOptionNodes = await page.$$eval("select#gakunen > option", options => options.map(option => option.textContent));
gradeOptionNodes.shift();
return gradeOptionNodes