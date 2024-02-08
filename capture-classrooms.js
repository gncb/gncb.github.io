const page = await browser.newPage();
await page.goto('https://www.jiritsu-red.jp/contact/');

const list_pref = await page.$$eval(
    "select#schoolprefecture > optgroup > option", 
    options => options.map(option => option.textContent)
);

const master = {};
const master_flat = [];
let cityOptions;
let classroomOptions;

for ( i = 0; i < list_pref.length; i++) {

    // 都道府県を順番に選択
    await page.evaluate((list_pref,i) => {
        const selectPrefBox = document.getElementById("schoolprefecture");
        Array.from(selectPrefBox.options).forEach(e => {
            if (e.textContent === list_pref[i]) {
                selectPrefBox.selectedIndex = e.index;
                selectPrefBox.dispatchEvent(new Event("change", { bubbles: true }));
            }
        });
    },list_pref,i);

     // 市区町村のオプションを取得
    cityOptions = await page.$$eval(
        "select#schoolcity > option", 
        options => options.map(option => option.textContent)
    );
    master[list_pref[i]] = cityOptions;

    const list_city = master[list_pref[i]];

    for ( j = 1; j < list_city.length; j++) {

        // 市区町村を順番に選択
        await page.evaluate((list_city,j) => {
            const selectCityBox = document.getElementById("schoolcity");
            Array.from(selectCityBox.options).forEach(e => {
                if (e.textContent === list_city[j]) {
                    selectCityBox.selectedIndex = e.index;
                    selectCityBox.dispatchEvent(new Event("change", { bubbles: true }));
                }
            });
        },list_city,j);

        // 教室のオプションを取得
        classroomOptionNodes = await page.$$eval(
            "select#classroom > option", 
            options => options.map(option => {
                { option.value, option.textContent }
            })
        );
        console.log(classroomOptionNodes);
        master[list_pref[i]][master[list_pref[i]][j]] = classroomOptionNodes.map(option => {
            master_flat.push({ pref: list_pref[i], city: master[list_pref[i]][j], id: option.value, name: option.textContent });
            return { id: option.value, name: option.textContent }
        });

    }
}
return master_flat;


// await _waitForElement(document,"select#schoolprefecture > optgroup > option");
        //   var prefOptionNodes = Array.from(document.querySelectorAll("select#schoolprefecture > optgroup > option"));
        //   var list_pref = prefOptionNodes.map(option => option.text);
        //   window.list_pref = list_pref;
        //   var master = {};
        //   var master_flat = [];

          for ( i = 0; i < list_pref.length; i++) {
              await send_selected_text(document, "#schoolprefecture", list_pref[i]);
              await wait_switched_options(document,"#schoolcity");
              var cityOptionNodes = Array.from(document.querySelectorAll("select#schoolcity > option"));
              cityOptionNodes.shift();
              master[list_pref[i]] = cityOptionNodes.map(option => option.text);
      
              for ( j = 0; j < master[list_pref[i]].length; j++) {
                  await send_selected_text(document, "#schoolcity", master[list_pref[i]][j]);
                  await wait_switched_options(document,"#classroom");
                  var classroomOptionNodes = Array.from(document.querySelectorAll("select#classroom > option"));
                  classroomOptionNodes.shift();
                  master[list_pref[i]][master[list_pref[i]][j]] = classroomOptionNodes.map(option => {
                      master_flat.push({ pref: list_pref[i], city: master[list_pref[i]][j], id: option.value, name: option.text });
                      return { id: option.value, name: option.text }
                  });
              }
          }
          