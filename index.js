const express = require("express");
const app = express();

require("dotenv").config();
const userRouter = require("./routes/getdata");
require("./routes/readCSV");

const fs = require("fs");
const { parse } = require("csv-parse");
app.use(express.json());
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

const csvOutput = (filename) => {
  return new Promise((resolve, reject) => {
    const datas = [];
    try {
      fs.createReadStream(filename)
        .pipe(parse({ delimiter: ",", from_line: 1 }))
        .on("data", function (rows) {
          datas.push(rows);
        })
        .on("end", function () {
          console.log({datas});
          resolve(datas);
        });
    } catch (error) {
      console.log({ error });
      datas.push({ message: error });
      reject(error);
    }
  });
};



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

const postResponse = [];
const dataJson = []

// Call csvOutput to get the data
csvOutput("public/files/515.csv").then((datas) => {
  // Pass the data to another function
  dataJson.push(convertToDhis(datas))
}).catch((error) => {
  console.log(error);
});

const postData = async (data1) => {
  var request = require("request");
  var options = {
    method: "POST",
    url: "https://test.hiskenya.org/api/dataValueSets",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.DHIS_USERNAME + ":" + process.env.DHIS_PASSWORD
        ).toString("base64"),
      "Content-Type": "application/json",
      Cookie: "JSESSIONID=B074FFF6B8F3FC221A41125F21701E8D",
    },
    body: JSON.stringify(data1),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log({ message: response.body });
    postResponse.push({ message: response.body });
  });
  return { message: postResponse };
};

app.get("/", (req, res) => {
  // console.log(data.length)
  const resp = postData(dataJson);
  console.log({ resp });
  res.send({ resp });
});

app.get("/api/get", (req, res) => {
  // console.log(data.length)
  //   const resp = postData(dataJson);
  console.log("resp");
  res.send({ dataJson });
});

app.post("/api/post", (req, res) => {
  console.log(req.body);
  const dataBody = req.body;
  const dataresp = postData(dataBody);
  console.log({ dataBody, dataresp });
  res.send({ dataresp });
});

app.use("/get", userRouter);

const port = process.env.APP_PORT || 3000;
console.log(port);
app.listen(port, () => console.log(`Listening on port ${port}...`));
