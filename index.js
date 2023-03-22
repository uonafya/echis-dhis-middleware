const express = require("express");
const app = express();

require("dotenv").config();
const userRouter = require("./routes/getdata");
require("./routes/readCSV");

const fs = require("fs");
const { parse } = require("csv-parse");
const datas = [];
app.use(express.json());
// const data_r = []
const PeriodDate_year = new Date().getFullYear();
const PeriodDate_month = new Date().getMonth() + 1;
const periodStartMonth = PeriodDate_month + "/" + "1" + "/" + PeriodDate_year;
const PeriodDate_monthString =
  String(PeriodDate_month).length == 1
    ? "0" + PeriodDate_month
    : PeriodDate_month;
const dhisMonth = PeriodDate_year + "" + PeriodDate_monthString;

let payload = {
  dryRun: false,
  dataSet: "OXgWwVp4SLi",
  attributeOptionCombo: "",
  dataValues: [],
};

const csvOutput = () => {
  try {
    fs.createReadStream("public/files/515.csv")
      .pipe(parse({ delimiter: ",", from_line: 1 }))
      .on("data", function (row) {
        // console.log(row);
        datas.push(row);
      });
    //   if (datas.length >= 1) { data_r=datas }{ data_r.push({error: "There is no data"})}
    return datas;
  } catch (error) {
    return { data: `error ${error}` };
  }
};

const data = csvOutput();

const convertToDhis = (data) => {
  data_le = data.length;
  if (data_le < 1) {
    return { response: "No data" };
  } else {
    const header = data[0];
    const pePosition = data[0].indexOf(
      data[0].find((ele) => ele.toLowerCase().includes("period"))
    );
    const chuCode = data[0].indexOf(
      data[0].find((ele) => ele.toLowerCase().includes("chu_code"))
    );
    const dataStart =
      data[0].indexOf(
        data[0].find((ele) => ele.toLowerCase().includes("facility_join_field"))
      ) + 1;
    const rowEnd = data[0].length;

    const currentRowData = data.filter(
      (ele) => ele[pePosition] === periodStartMonth
    );

    if (currentRowData != undefined) {
      currentRowData.map((rowData) => {
        for (let i = dataStart; i < rowEnd; i++) {
          valuesData = {
            period: dhisMonth,
            orgUnit: rowData[chuCode],
            dataElement: header[i],
            categoryOptionCombo: "",
            value: rowData[i],
          };
          payload.dataValues.push(valuesData);
        }
      });
    }
    face = payload.dataValues;
    console.log({
      pePosition,
      chuCode,
      dataStart,
      rowEnd,
      periodStartMonth,
      currentRowData,
      dhisMonth,
      face,
    });
  }
  return payload;
};

const postData = () => {
  var request = require("request");
  var options = {
    method: "POST",
    url: "https://test.hiskenya.org/api/dataValueSets",
    headers: {
      Authorization: 'Basic ' + Buffer.from(process.env.DHIS_USERNAME + ':' + process.env.DHIS_PASSWORD).toString('base64'),
      "Content-Type": "application/json",
      Cookie: "JSESSIONID=B074FFF6B8F3FC221A41125F21701E8D",
    },
    body: JSON.stringify(convertToDhis(data)),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
};

app.get("/", (req, res) => {
  // console.log(data.length)
  postData()
  res.send(data);
});

app.use("/get", userRouter);

const port = process.env.APP_PORT || 3000;
console.log(port);
app.listen(port, () => console.log(`Listening on port ${port}...`));
