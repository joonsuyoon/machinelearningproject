const axios = require("axios");
const fs = require("fs");

const url = `	https://golmok.seoul.go.kr/region/selectStoreCount.json`;
const body =
  "stdrYyCd=2020&stdrSlctQu=sameQu&stdrQuCd=4&stdrMnCd=202012&selectTerm=quarter&svcIndutyCdL=CS100000&svcIndutyCdM=all&stdrSigngu=11&selectInduty=1&infoCategory=store";

const dongs = [
  "염창동",
  "등촌1동",
  "등촌2동",
  "등촌3동",
  "화곡1동",
  "화곡2동",
  "화곡3동",
  "화곡4동",
  "화곡본동",
  "화곡6동",
  "화곡8동",
  "가양1동",
  "가양2동",
  "가양3동",
  "발산1동",
  "우장산동",
  "공항동",
  "방화1동",
  "방화2동",
  "방화3동",
];

async function main() {
  try {
    const result = [["동", "연도", "분기", "전체점포수"]];

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });

    const data = response.data;

    data.forEach((d) => {
      if (dongs.includes(d.NM)) {
        result.push([d.NM, 2020, 4, d.THIRD_TOT]);
      }
    });

    fs.writeFileSync(
      "test.csv",
      result.map((row) => row.join(",")).join("\n"),
      "utf8"
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

main();
