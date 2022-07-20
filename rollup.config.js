import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "./public/ifc.js",
  output: [
    {
      format: "esm",
      file: "ifc.bun.js",
    },
  ],
  plugins: [resolve()],
};
