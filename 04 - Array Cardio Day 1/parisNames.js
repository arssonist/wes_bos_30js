var https = require('https')

var content = ""
https.get('https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris', (res) => {
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
       console.log(content += chunk);
   });

   // res.on("end", function () {
   //     util.log(content);
   // });
})
