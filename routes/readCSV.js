const fs = require("fs");
const { parse } = require("csv-parse");


const csvOutput = ()=>{
    fs.createReadStream("./public/515.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        console.log(row);
      })
      return row
}