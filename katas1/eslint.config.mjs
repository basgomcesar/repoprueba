import globals from "globals";
import pluginJs from "@eslint/js";

export default [
    {
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.node,
            },
        },
    },
    pluginJs.configs.recommended,
];
