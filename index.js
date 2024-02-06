const fs = require('fs');
const OUTPUT_DIR = `dist/`;

console.log("RUN SCRIPT!!")

const page = await browser.newPage();
await page.goto('https://www.jiritsu-red.jp/contact/');

async function main() {

    const checklist = [{
        name: "test",
        updatedAt: "2020-12-10"
    },{
        name: "test2",
        updatedAt: "2020-12-11"
    },{
        name: "test3",
        updatedAt: "2020-12-12"
    },{
        name: "test4",
        updatedAt: "2020-12-14"
    },{
        name: "test5",
        updatedAt: "2020-12-19"
    }
    ]

    console.log(checklist)

    fs.writeFileSync(
		OUTPUT_DIR+"test.js", 
		`var data = ${JSON.stringify(checklist)};`
	);
}

main();