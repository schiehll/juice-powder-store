import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "schiehll.myshopify.com",
  storefrontAccessToken: "d7581eb49f4ff5438f4f06005c778cf1",
});

export { client };
