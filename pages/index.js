import Head from "next/head";
import { Card, Col, Row, Space, Image, Typography } from "antd";
import { client } from "../lib/shopify";
import { ShoppingOutlined } from "@ant-design/icons";
import useCart from "../hooks/useCart";

export const getServerSideProps = async (context) => {
  const products = await client.product.fetchAll(); // Fetch products
  const infos = await client.shop.fetchInfo(); // Fetch shop Info if you think about SEO and title and ... to your page

  return {
    props: {
      infos: JSON.parse(JSON.stringify(infos)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};

export default function Home({ infos, products }) {
  const { addItemToCart, setCart } = useCart();

  const addToCart = async (product) => {
    const cart = await addItemToCart({
      variantId: product.variants[0].id,
      quantity: 1,
    });

    setCart(cart);
  };

  return (
    <div>
      <Head>
        <title>Juice Powder Store</title>
        <meta name="description" content="Juice Powder Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Row gutter={24}>
          {products.map((product) => {
            return (
              <Col key={product.id}>
                <Card
                  style={{ width: 240 }}
                  cover={
                    <Image
                      width="240px"
                      height="240px"
                      alt={product.description}
                      src={product.images[0].src}
                    />
                  }
                  actions={[
                    <a
                      key="buy"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <Space>
                        <span>
                          {product.variants[0].priceV2.currencyCode}
                          {product.variants[0].priceV2.amount}
                        </span>
                        <ShoppingOutlined />
                      </Space>
                    </a>,
                  ]}
                >
                  <Card.Meta
                    title={product.title}
                    description={product.description}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </main>
    </div>
  );
}
