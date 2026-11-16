import { defineConfig } from "vitest/config";
import path from "path";

// Kiểm thử đơn vị (logic, không cần trình duyệt). Kiểm tra giao diện/số đo: `npm run check`.
export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "scripts/**/*.test.mjs"],
    setupFiles: ["src/test/setup.ts"],
  },
});
