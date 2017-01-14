module.exports = {
    "plugins": ["react", "import", "babel"],
    "parser": "babel-eslint",
    "env": {
        "browser": true,
    },
    "extends": "airbnb-base",
    "rules": {
      "max-len": ["warn", 120],
      "prefer-const": "warn",
      "arrow-parens": ["warn", "always"],

      // Disabled rules
      "padded-blocks": "off",
      "no-plusplus": "off",
      "no-underscore-dangle": "off",
      "arrow-body-style": "off",
      "linebreak-style": "off",
      "no-param-reassign": "off",
      "prefer-default-export": "off",
      "no-console": "off",
    }
};
