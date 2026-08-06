module.exports = {
  root: true,
  env: {
    node: true
  },
  // Was `extends: ["plugin:vue/essential"]` only. package.json's eslintConfig block,
  // which is what ESLint actually read while this file was misnamed, also extended
  // eslint:recommended, so renaming the file without merging the two would have
  // silently dropped rules like no-unused-vars. Both are here now and the duplicate
  // block is gone from package.json.
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    // The rules this file was written for, which had never applied: a stray
    // console.log or debugger fails a production build and is merely allowed in
    // development.
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
