// File: api/redemptions.js
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export default async function handler(req, res) {
  const api = new WooCommerceRestApi({
    url: "https://islandgiftcards.net",
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3"
  });

  try {
    const { data } = await api.get("orders", {
      per_page: 10,
      orderby: "date",
      order: "desc"
    });

    const redemptions = data.filter(order =>
      order.coupon_lines && order.coupon_lines.length > 0
    );

    res.status(200).json(redemptions);
  } catch (error) {
    console.error("WooCommerce API Error:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
