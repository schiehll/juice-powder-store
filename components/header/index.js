import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Drawer,
  Layout,
  Menu,
  Typography,
  List,
  Image,
  Empty,
  Space,
} from "antd";
import { ShoppingTwoTone, ThunderboltTwoTone } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import useCart from "../../hooks/useCart";

import styles from "./styles.module.css";

const Header = () => {
  const router = useRouter();
  const {
    createCart,
    cart,
    setShowCart,
    showCart,
    removeItemFromCart,
    setCart,
  } = useCart();

  useEffect(() => {
    createCart();
  }, [createCart]);

  const getCartItemsQuantity = () => {
    return cart.lineItems.reduce((amount, item) => {
      return amount + item.quantity;
    }, 0);
  };

  const goToCheckout = () => {
    router.push(cart.webUrl, cart.webUrl, { target: "_blank" });
  };

  const removeItem = async (item) => {
    const cart = await removeItemFromCart(item);
    setCart(cart);
  };

  return (
    <>
      <Layout.Header className={styles.spacer}>
        <Typography.Title level={4}>
          <Link href="/">
            <a>
              <ThunderboltTwoTone /> Juice Powder Store
            </a>
          </Link>
        </Typography.Title>
        {cart && (
          <Badge
            count={getCartItemsQuantity()}
            size="small"
            style={{ backgroundColor: blue[5] }}
          >
            <a
              onClick={() => {
                setShowCart(true);
              }}
              className={styles.square}
            >
              <ShoppingTwoTone />
            </a>
          </Badge>
        )}
      </Layout.Header>
      <Drawer
        title={
          <Space>
            <ShoppingTwoTone />
            Cart
          </Space>
        }
        placement="right"
        closable={false}
        onClose={() => {
          setShowCart(false);
        }}
        visible={showCart}
        width={400}
      >
        {(cart?.lineItems?.length || 0) > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={cart.lineItems}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Image
                      width="90px"
                      height="90px"
                      alt={item.title}
                      src={item.variant.image.src}
                      preview={false}
                    />
                  }
                  title={`${item.quantity}x ${item.title}`}
                  description={
                    <Space direction="vertical" size="small">
                      <Typography.Text>
                        {item.variant.priceV2.currencyCode}
                        {item.variant.priceV2.amount}
                      </Typography.Text>
                      <Button onClick={() => removeItem(item)}>
                        Remove item
                      </Button>
                    </Space>
                  }
                />
              </List.Item>
            )}
            footer={
              <Space direction="vertical" style={{ width: "100%" }}>
                <Typography.Text strong>
                  Total: {cart.totalPriceV2.currencyCode}{" "}
                  {cart.totalPriceV2.amount}
                </Typography.Text>
                <Button onClick={goToCheckout} block type="primary">
                  Go to checkout
                </Button>
              </Space>
            }
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No items" />
        )}
      </Drawer>
    </>
  );
};

export default Header;
