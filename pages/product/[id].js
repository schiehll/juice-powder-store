import { Card, Space, Image, Typography, Button } from "antd";
import { useRouter } from "next/dist/client/router";
import { client } from "../../lib/shopify";
import styles from "./styles.module.css";
import useCart from "../../hooks/useCart";

export async function getServerSideProps({ query }) {
  const id = query.id;

  const product = await client.product.fetch(id);

  return { props: { product: JSON.parse(JSON.stringify(product)) } };
}

export default function Product({ product }) {
  const router = useRouter();
  const { addItemToCart, setCart } = useCart();

  const addToCart = async () => {
    const cart = await addItemToCart({
      variantId: product.variants[0].id,
      quantity: 1,
    });

    setCart(cart);
  };

  return (
    <Space>
      <Image
        width="240px"
        height="240px"
        alt={product.description}
        src={product.images[0].src}
      />
      <div className={styles.info}>
        <Typography.Title level={3}>{product.title}</Typography.Title>
        <Typography.Text>{product.description}</Typography.Text>
        <Button type="primary" onClick={addToCart}>
          Add to cart
        </Button>
      </div>
    </Space>
  );
}
