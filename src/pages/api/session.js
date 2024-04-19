import axios from "axios";
import cheerio from "cheerio";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36";
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Authorization"
  );
  const { query } = req.body;
  const query1 = "IPL news";
  const accessKey = "adb0cfcc77074ab38735db68a601a3a0";
  const endpoint = `https://api.bing.microsoft.com/v7.0/search?q=${query1}&responseFilter=news`;
  try {
    const response = await axios.get(endpoint, {
      headers: {
        "Ocp-Apim-Subscription-Key": accessKey,
      },
    });

    const data = response.data;
    const results = await Promise.all(
      data.news.value.map(async (page) => {
        try {
          const pageResponse = await axios.get(page.url, {
            headers: {
              "User-Agent": USER_AGENT,
              Accept: "*/*",
              "Accept-Encoding": "gzip, deflate",
            },
          });

          if (pageResponse.status === 401) {
            console.error("Error 401:", pageResponse.statusText);
            return null;
          }
          if (pageResponse.status === 403) {
            console.error("Error 403:", pageResponse.statusText);
            return;
          }
          const body = pageResponse.data;
          const $ = cheerio.load(body);
          const heading = $("body")
            .find("h1")
            .map((index, element) => $(element).text().trim())
            .get()
            .join("");
          const paragraphContent = $("body")
            .find("p")
            .map((index, element) => $(element).text().trim())
            .get()
            .join("");
          if (!heading && !paragraphContent) {
            return null;
          }
          const postData = {
            heading: heading,
            para: paragraphContent,
            image_url: page.image?.contentUrl || "",
          };

          await axios.post(
            "https://vaani.softage.net/api/v1/savenews",
            postData
          );
          return {
            paragraphs: paragraphContent,
            heading: heading,
            imageUrl: page.image.contentUrl,
          };
        } catch (error) {
          console.error("Error on :", page.url + error.message);
          return null;
        }
      })
    );
    return res.status(200).json({ newsdata: "" });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
