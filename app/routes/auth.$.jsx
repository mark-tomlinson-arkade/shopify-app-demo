import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  console.log("Entering auth loader");
  await authenticate.admin(request);

  return null;
};
