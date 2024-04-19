import axios from "axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export default async function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    const response = await axios.get(
      "https://vaani.softage.net/vaani/api/v1/news"
    );
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
