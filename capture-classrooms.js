const page = await browser.newPage();
await page.goto('https://www.jiritsu-red.jp/contact/');

const prefOptionNodes = await page.$$eval(
    "select#schoolprefecture > optgroup > option", 
    options => options.map(option => option.textContent)
);
prefOptionNodes.shift();
return prefOptionNodes;


// await _waitForElement(document,"select#schoolprefecture > optgroup > option");
        //   var prefOptionNodes = Array.from(document.querySelectorAll("select#schoolprefecture > optgroup > option"));
          var list_pref = prefOptionNodes.map(option => option.text);
        //   window.list_pref = list_pref;
          var master = {};
          var master_flat = [];
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
          