import dns from "dns";
import { defineConfig } from "vite";

// localhost part
dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  server: {
    port: 3000,
  },
});
