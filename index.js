const fs = require('fs');
const OUTPUT_DIR = `dist/`;


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

    fs.writeFileSync(
		OUTPUT_DIR+"test.js", 
		`var data = ${JSON.stringify(checklist)};`
	);
}

main();