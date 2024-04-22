import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { login } from "../../shopify.server";
import styles from "./styles.module.css";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  console.log("Loader at '/': Current URL", url.href);
  console.log("SHOPIFY_APP_URL:", process.env.SHOPIFY_APP_URL);
  console.log("PORT:", process.env.PORT);
  console.log("SHOPIFY_API_KEY:", process.env.SHOPIFY_API_KEY);
  console.log("SHOPIFY_API_SECRET:", process.env.SHOPIFY_API_SECRET);
  console.log("SCOPES:", process.env.SCOPES);
  console.log("SHOP_CUSTOM_DOMAIN:", process.env.SHOP_CUSTOM_DOMAIN);

  if (url.searchParams.get("shop")) {
    console.log(
      "Redirecting to '/app' with params:",
      url.searchParams.toString(),
    );
    throw redirect(`/app?${url.searchParams.toString()}`);
  }
  console.log("Returning from index loader");
  return json({ showForm: Boolean(login) });
};

export default function App() {
  const { showForm } = useLoaderData();
  console.log("🚀 ~ App ~ showForm:", showForm);

  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <h1 className={styles.heading}>A short heading about [your app]</h1>
        <p className={styles.text}>
          A tagline about [your app] that describes your value proposition.
        </p>
        {showForm && (
          <Form className={styles.form} method="post" action="/auth/login">
            <label className={styles.label}>
              <span>Shop domain</span>
              <input className={styles.input} type="text" name="shop" />
              <span>e.g: my-shop-domain.myshopify.com</span>
            </label>
            <button className={styles.button} type="submit">
              Log in
            </button>
          </Form>
        )}
        <ul className={styles.list}>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
        </ul>
      </div>
    </div>
  );
}
