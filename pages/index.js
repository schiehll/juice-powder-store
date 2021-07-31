import Head from "next/head";
import Image from "next/image";
import { Card, Space } from "antd";
import { useRouter } from "next/dist/client/router";
import { client } from "../lib/shopify";

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
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Juice Powder Store</title>
        <meta name="description" content="Juice Powder Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Space size="large">
          {products.map((product) => {
            return (
              <Card
                key={product.id}
                hoverable
                onClick={() => router.push(`/product/${product.id}`)}
                style={{ width: 240 }}
                cover={
                  <Image
                    width="240px"
                    height="240px"
                    alt={product.description}
                    src={product.images[0].src}
                  />
                }
              >
                <Card.Meta
                  title={product.title}
                  description={product.description}
                />
              </Card>
            );
          })}
        </Space>
      </main>
    </div>
  );
}
