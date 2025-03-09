import { createClient } from "@sanity/client";

export const clientConfig = {
  projectId: "xvwfx739",
  dataset: "production",
  apiVersion: "2025-03-09",
  useCdn: true,
};

const sanityClient = createClient(clientConfig);

export default sanityClient;