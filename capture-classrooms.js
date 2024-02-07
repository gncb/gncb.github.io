function send_selected_text(doc, selector, val) {
    const tar = doc.querySelector(selector);
    if (tar) {
      setTimeout(() => {
        Array.from(tar.options).forEach(e => {
          if (e.textContent === val) {
            tar.selectedIndex = e.index;
            tar.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });
      }, 100);
    }
}

// function wait_switched_options(doc, selector) {
//     new Promise(resolve => {
//     const tar = doc.querySelector(selector);
//     const formObserver = new MutationObserver(records => {
//       formObserver.disconnect();
//       resolve();
//     })
//     formObserver.observe(tar, {
//       childList: true,
//       subtree: true
//     })
// })}

// function _waitForElement(doc, selector, delay = 1000, tries = 10) {
//     const element = doc.querySelector(selector);

//     if (!window[`__${selector}`]) {
//       window[`__${selector}`] = 0;
//     }

//     function _search() {
//       return new Promise((resolve) => {
//         window[`__${selector}`]++;
//         setTimeout(resolve, delay);
//       });
//     }

//     if (element === null) {
//       if (window[`__${selector}`] >= tries) {
//         window[`__${selector}`] = 0;
//         return Promise.reject(`__${selector} is not found`);
//       }

//       return _search().then(() => _waitForElement(doc, selector));
//     } else {
//       return Promise.resolve(element);
//     }
// };

const page = await browser.newPage();
await page.goto('https://www.jiritsu-red.jp/contact/');

const list_pref = await page.$$eval(
    "select#schoolprefecture > optgroup > option", 
    options => options.map(option => option.textContent)
);

const master = {};
let cityOptions;

for ( i = 0; i < list_pref.length; i++) {

    await page.evaluate((list_pref,i) => {
        const selectBox = document.getElementById("schoolprefecture");
        Array.from(selectBox.options).forEach(e => {
            if (e.textContent === list_pref[i]) {
                selectBox.selectedIndex = e.index;
                selectBox.dispatchEvent(new Event("change", { bubbles: true }));
            }
        });
    },list_pref,i);
    cityOptions = await page.$$eval(
        "select#schoolcity > option", 
        options => options.map(option => option.textContent)
    );
    console.log(cityOptions);
    master[list_pref[i]] = cityOptions;
}

return master;


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
          