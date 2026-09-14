import js from "@eslint/js";

export default [
    {
        ignores: ["test-render.mjs", "dist/**"]
    },
    js.configs.recommended,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn"
        }
    }
];
