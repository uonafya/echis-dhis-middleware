const express = require("express");
var request = require("request");

const app = express();
const utils = require('openhim-mediator-utils');

var optionsHIM = {
  apiURL: '',
  username: '',
  password: '',
}


const sendToOpenHIM = async (json_data) => {
  // console.log({"Hello": json_data})
  var options = {
    'method': 'POST',
    'url': 'https://interoperabilitylab.uonbi.ac.ke/interop/mediator/edhis',
    'headers': {
      'Authorization': 'Basic cm9vdEBvcGVuaGltLm9yZzoxY1k2JmxXbmMwI0c=',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json_data)
  }


  var responses = request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response);
  });
  return responses
}

// utils.registerMediator(optionsHIM, mediatorConfig, callback)

require("dotenv").config();
const userRouter = require("./routes/getdata");
require("./routes/readCSV");

const fs = require("fs");
const { parse } = require("csv-parse");
const { json } = require("express");
app.use(express.json());
const PeriodDate_year = new Date().getFullYear();
const PeriodDate_month = new Date().getMonth();
// const periodStartMonth = PeriodDate_month + "/" + "1" + "/" + PeriodDate_year;
const PeriodDate_monthString =
String(PeriodDate_month).length == 1
? "0" + PeriodDate_month
: PeriodDate_month;
const dhisMonth = PeriodDate_year + "" + PeriodDate_monthString;
const periodStartMonth = PeriodDate_year + "-" +PeriodDate_monthString + "-" + "01"  ;

let payload = {
  dryRun: false,
  dataSet: "ovtKPo15xAg",
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
          // console.log({datas});
          resolve(datas);
        });
    } catch (error) {
      console.log({ error });
      datas.push({ message: error });
      reject(error);
    }
  });
};

jsonData = [
  {
      "chu_uuid": "019fe252-e25b-51b3-9b87-ed54e206b3fb",
      "chu_code": "vJfBQhxz2P0",
      "chu_name": "Kiwiro Community Health Unit",
      "chv_area_uuid": "All",
      "chv_area_name": "All",
      "period_start": "2023-02-01",
      "period_start_epoch": "1675209600",
      "facility_join_field": "019fe252-e25b-51b3-9b87-ed54e206b3fb",
      "OXgWwVp4SLi": "2",
      "zhwGF3FDj8B": "1",
      "b16FHzbfVUe": "0",
      "NjcDm9nopWu": "1",
      "vAkP6k0yZDk": "6",
      "VrpxWLhfIr6": "0",
      "fdsnixQkKCY": "0",
      "ZkAL6i7sS2S": "7",
      "zbYf5G3P7Fv": "0",
      "hYPcrC46URl": "0",
      "umcBUHyhuTc": "0",
      "SnP5Qr06tLy": "0",
      "d0XSdWwIlCU": "1",
      "v9HafndlV8q": "0",
      "KHfPfnhSjmA": "0",
      "sXPwrF8r04E": "0",
      "Gx1XLLsvwAZ": "0",
      "LGsW5FyZFwZ": "2",
      "vGvOtbvhclF": "202",
      "z9qwgod3UiG": "0",
      "d0zEtbkJnel": "0",
      "xXhZ15pqy4p": "0",
      "KiKtdZ5rV5d": "0",
      "lhkXObzaWr3": "1",
      "qNoOzWtEpuD": "3",
      "bbrNRV9zwVa": "0",
      "TLKNYG2xGad": "0",
      "NvUUbEhFVcO": "4",
      "h9VcGyaQkfZ": "1",
      "LHd6A9RtHRF": "0",
      "jx879BUZ39L": "1",
      "X9d8oaBHDqx": "1",
      "vB85yqSN4gx": "1",
      "tuIDKhqDdcB": "1",
      "JrdSl1ADdBC": "0",
      "idiiaWIh2qi": "0",
      "ekh0oJidJ38": "0",
      "ksINuMMr419": "12",
      "dmU5MIrpsP7": "2",
      "TfmOlLMrQc6": "0",
      "yHBk3iXClvx": "0",
      "q90IMsLpFO4": "0",
      "rdJBPSOGJlA": "0",
      "NjCLHbMeaNw": "0",
      "eLMPka37L2p": "0",
      "HHyDcD7IjqT": "0",
      "siQaAwG3fiQ": "0",
      "RhriKmKbHuH": "0",
      "XP1JclLpKdP": "0",
      "mOoe88OmCct": "0",
      "RivX8a7SDU3": "0",
      "wYD1JE3Tgsu": "0",
      "vyCCWAqAP5x": "0",
      "XDgpSRb8Ofv": "0",
      "QAKpLg7iZEJ": "0",
      "iJpuwr4Hqj1": "0",
      "r1ed7zn2Q0a": "0",
      "ylvw7Y1OB1H": "0",
      "HC2a1iMVGPv": "0",
      "Qr3F0zbsMmN": "0",
      "RlDNgxU0gn3": "0",
      "RKBTMciF0Tk": "0",
      "gpYrkLhO4wB": "2",
      "RXgNfdYSJPh": "2",
      "eUakxWsxkcq": "1",
      "V9SqzZHKoP7": "0",
      "WBTvg49kJHr": "0",
      "wMQolZyIR5P": "0",
      "V00z4bQRaqe": "0",
      "AR3WCfcKDwX": "0",
      "YCWGGPn7tdl": "3",
      "ZAsCMIJLkvj": "3",
      "QfBRPj1q0W1": "1",
      "oVxxa344TPs": "1",
      "bWTVzXQoxpt": "0",
      "I9yVwu1FWu6": "0",
      "jBYvAmDdyfY": "0",
      "zW17XEoFhAN": "0",
      "rdcZ1ni3jrD": "438",
      "Y0ZpWnkp4v9": "0",
      "ybfaTwL9yBA": "0",
      "aod6Gz2QUg2": "0"
  },
  {
      "chu_uuid": "019fe252-e25b-51b3-9b87-ed54e206b3fb",
      "chu_code": "vJfBQhxz2P0",
      "chu_name": "Kiwiro Community Health Unit",
      "chv_area_uuid": "All",
      "chv_area_name": "All",
      "period_start": "2023-01-01",
      "period_start_epoch": "1672531200",
      "facility_join_field": "019fe252-e25b-51b3-9b87-ed54e206b3fb",
      "OXgWwVp4SLi": "23",
      "zhwGF3FDj8B": "13",
      "b16FHzbfVUe": "15",
      "NjcDm9nopWu": "1",
      "vAkP6k0yZDk": "15",
      "VrpxWLhfIr6": "6",
      "fdsnixQkKCY": "0",
      "ZkAL6i7sS2S": "10",
      "zbYf5G3P7Fv": "0",
      "hYPcrC46URl": "0",
      "umcBUHyhuTc": "0",
      "SnP5Qr06tLy": "0",
      "d0XSdWwIlCU": "0",
      "v9HafndlV8q": "1",
      "KHfPfnhSjmA": "1",
      "sXPwrF8r04E": "0",
      "Gx1XLLsvwAZ": "0",
      "LGsW5FyZFwZ": "27",
      "vGvOtbvhclF": "417",
      "z9qwgod3UiG": "5",
      "d0zEtbkJnel": "0",
      "xXhZ15pqy4p": "0",
      "KiKtdZ5rV5d": "0",
      "lhkXObzaWr3": "13",
      "qNoOzWtEpuD": "12",
      "bbrNRV9zwVa": "0",
      "TLKNYG2xGad": "0",
      "NvUUbEhFVcO": "15",
      "h9VcGyaQkfZ": "2",
      "LHd6A9RtHRF": "8",
      "jx879BUZ39L": "0",
      "X9d8oaBHDqx": "0",
      "vB85yqSN4gx": "4",
      "tuIDKhqDdcB": "0",
      "JrdSl1ADdBC": "0",
      "idiiaWIh2qi": "0",
      "ekh0oJidJ38": "3",
      "ksINuMMr419": "28",
      "dmU5MIrpsP7": "5",
      "TfmOlLMrQc6": "0",
      "yHBk3iXClvx": "0",
      "q90IMsLpFO4": "1",
      "rdJBPSOGJlA": "0",
      "NjCLHbMeaNw": "0",
      "eLMPka37L2p": "0",
      "HHyDcD7IjqT": "0",
      "siQaAwG3fiQ": "0",
      "RhriKmKbHuH": "0",
      "XP1JclLpKdP": "0",
      "mOoe88OmCct": "0",
      "RivX8a7SDU3": "0",
      "wYD1JE3Tgsu": "2",
      "vyCCWAqAP5x": "0",
      "XDgpSRb8Ofv": "0",
      "QAKpLg7iZEJ": "0",
      "iJpuwr4Hqj1": "0",
      "r1ed7zn2Q0a": "0",
      "ylvw7Y1OB1H": "0",
      "HC2a1iMVGPv": "0",
      "Qr3F0zbsMmN": "0",
      "RlDNgxU0gn3": "0",
      "RKBTMciF0Tk": "0",
      "gpYrkLhO4wB": "4",
      "RXgNfdYSJPh": "2",
      "eUakxWsxkcq": "0",
      "V9SqzZHKoP7": "0",
      "WBTvg49kJHr": "2",
      "wMQolZyIR5P": "0",
      "V00z4bQRaqe": "1",
      "AR3WCfcKDwX": "0",
      "YCWGGPn7tdl": "3",
      "ZAsCMIJLkvj": "3",
      "QfBRPj1q0W1": "2",
      "oVxxa344TPs": "1",
      "bWTVzXQoxpt": "0",
      "I9yVwu1FWu6": "0",
      "jBYvAmDdyfY": "0",
      "zW17XEoFhAN": "0",
      "rdcZ1ni3jrD": "436",
      "Y0ZpWnkp4v9": "0",
      "ybfaTwL9yBA": "0",
      "aod6Gz2QUg2": "0"
  },
  {
      "chu_uuid": "019fe252-e25b-51b3-9b87-ed54e206b3fb",
      "chu_code": "vJfBQhxz2P0",
      "chu_name": "Kiwiro Community Health Unit",
      "chv_area_uuid": "All",
      "chv_area_name": "All",
      "period_start": "2022-12-01",
      "period_start_epoch": "1669852800",
      "facility_join_field": "019fe252-e25b-51b3-9b87-ed54e206b3fb",
      "OXgWwVp4SLi": "373",
      "zhwGF3FDj8B": "182",
      "b16FHzbfVUe": "213",
      "NjcDm9nopWu": "3",
      "vAkP6k0yZDk": "1",
      "VrpxWLhfIr6": "3",
      "fdsnixQkKCY": "0",
      "ZkAL6i7sS2S": "0",
      "zbYf5G3P7Fv": "0",
      "hYPcrC46URl": "0",
      "umcBUHyhuTc": "0",
      "SnP5Qr06tLy": "0",
      "d0XSdWwIlCU": "0",
      "v9HafndlV8q": "0",
      "KHfPfnhSjmA": "0",
      "sXPwrF8r04E": "0",
      "Gx1XLLsvwAZ": "0",
      "LGsW5FyZFwZ": "412",
      "vGvOtbvhclF": "20",
      "z9qwgod3UiG": "38",
      "d0zEtbkJnel": "0",
      "xXhZ15pqy4p": "0",
      "KiKtdZ5rV5d": "0",
      "lhkXObzaWr3": "196",
      "qNoOzWtEpuD": "1",
      "bbrNRV9zwVa": "0",
      "TLKNYG2xGad": "0",
      "NvUUbEhFVcO": "8",
      "h9VcGyaQkfZ": "1",
      "LHd6A9RtHRF": "8",
      "jx879BUZ39L": "0",
      "X9d8oaBHDqx": "0",
      "vB85yqSN4gx": "0",
      "tuIDKhqDdcB": "0",
      "JrdSl1ADdBC": "0",
      "idiiaWIh2qi": "0",
      "ekh0oJidJ38": "0",
      "ksINuMMr419": "1",
      "dmU5MIrpsP7": "0",
      "TfmOlLMrQc6": "0",
      "yHBk3iXClvx": "0",
      "q90IMsLpFO4": "0",
      "rdJBPSOGJlA": "0",
      "NjCLHbMeaNw": "0",
      "eLMPka37L2p": "0",
      "HHyDcD7IjqT": "0",
      "siQaAwG3fiQ": "0",
      "RhriKmKbHuH": "0",
      "XP1JclLpKdP": "0",
      "mOoe88OmCct": "0",
      "RivX8a7SDU3": "0",
      "wYD1JE3Tgsu": "0",
      "vyCCWAqAP5x": "0",
      "XDgpSRb8Ofv": "0",
      "QAKpLg7iZEJ": "0",
      "iJpuwr4Hqj1": "0",
      "r1ed7zn2Q0a": "0",
      "ylvw7Y1OB1H": "0",
      "HC2a1iMVGPv": "0",
      "Qr3F0zbsMmN": "0",
      "RlDNgxU0gn3": "0",
      "RKBTMciF0Tk": "0",
      "gpYrkLhO4wB": "1",
      "RXgNfdYSJPh": "0",
      "eUakxWsxkcq": "0",
      "V9SqzZHKoP7": "0",
      "WBTvg49kJHr": "0",
      "wMQolZyIR5P": "0",
      "V00z4bQRaqe": "0",
      "AR3WCfcKDwX": "0",
      "YCWGGPn7tdl": "0",
      "ZAsCMIJLkvj": "0",
      "QfBRPj1q0W1": "0",
      "oVxxa344TPs": "0",
      "bWTVzXQoxpt": "0",
      "I9yVwu1FWu6": "0",
      "jBYvAmDdyfY": "1",
      "zW17XEoFhAN": "0",
      "rdcZ1ni3jrD": "411",
      "Y0ZpWnkp4v9": "0",
      "ybfaTwL9yBA": "0",
      "aod6Gz2QUg2": "0"
  }
]

const convertToDhis = (dataI) => {
  // console.log(dataI)
  data_le = dataI.length;
  if (data_le < 1) {
    return { response: "No dataI" };
  } else {
    const header = Object.keys(dataI[0]);
    const pePosition = header.indexOf(
      header.find((ele) => ele.toLowerCase().includes("period"))
    );
    const chuCode = header.indexOf(
      header.find((ele) => ele.toLowerCase().includes("chu_code"))
    );
    const dataStart =
      header.indexOf(
        header.find((ele) => ele.toLowerCase().includes("facility_join_field"))
      ) + 1;
    const rowEnd = header.length;

    const currentRowData = dataI.filter(
      (ele) => ele.period_start === periodStartMonth
    );
    // console.log(currentRowData)
    if (currentRowData != undefined) {
      currentRowData.map((rowData) => {
        for (let i = dataStart; i < rowEnd; i++) {
          dataEle = header[i]
          valuesData = {
            period: dhisMonth,
            orgUnit: rowData.chu_code,
            dataElement: dataEle,
            categoryOptionCombo: "",
            value: rowData[dataEle],
          };
          payload.dataValues.push(valuesData);
        }
      });
    }
    face = payload.dataValues;
    // console.log({
    //   pePosition,
    //   chuCode,
    //   dataStart,
    //   rowEnd,
    //   periodStartMonth,
    //   currentRowData,
    //   dhisMonth,
    //   face,
    //   payload
    // });
  }
  
  return payload;
};

const postResponse = [];
const dataJson = []

// Call csvOutput to get the data
csvOutput("public/files/515.csv").then((datas) => {
  // Pass the data to another function
  dataJson.push(convertToDhis(jsonData))
}).catch((error) => {
  console.log(error);
});

const postData = async (data1) => {
  
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
    // console.log({ message: response.body });
    postResponse.push({ message: response.body });
  });
  return { message: postResponse };
};



app.get("/", (req, res) => {
  const resp = postData(dataJson);
  console.log({ resp });
  res.send({ resp });
});

app.get("/api/get", (req, res) => {
  //   const resp = postData(dataJson);
  console.log("resp");
  res.send({ dataJson });
});

app.post("/api/post", (req, res) => {
  const dataBody = req.body;
  const dataresp = sendToOpenHIM(dataBody);
  // console.log({ dataBody, dataresp });
  res.send({ dataresp });
});

app.use("/get", userRouter);

const port = process.env.APP_PORT || 3000;
console.log(port);
app.listen(port, () => console.log(`Listening on port ${port}...`));
