export default async function handler(req, res) {
    const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
  
    const api = new WooCommerceRestApi({
      url: "https://islandgiftcards.net",
      consumerKey: process.env.WC_CONSUMER_KEY,
      consumerSecret: process.env.WC_CONSUMER_SECRET,
      version: "wc/v3"
    });
  
    try {
      const response = await api.get("orders", {
        per_page: 20,
        orderby: "date",
        order: "desc"
      });
  
      const redemptions = response.data
        .filter(order => order.coupon_lines && order.coupon_lines.length > 0)
        .map(order => ({
          id: order.id,
          date: order.date_created,
          email: order.billing?.email || "N/A",
          total: order.total,
          coupons: order.coupon_lines.map(c => c.code).join(", ")
        }));
  
      res.status(200).json(redemptions);
    } catch (error) {
      console.error("WooCommerce API error:", error.message);
      res.status(500).json({ error: "Failed to fetch redemptions" });
    }
  }
  