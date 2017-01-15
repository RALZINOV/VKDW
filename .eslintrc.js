module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "react",
    "import",
    "babel"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules":true,
      "arrowFunctions":true,
      "classes":true
    }
  },
  "env": {
      "browser": true,
      "es6": true,
  },
  "rules": {
    "max-len": ["warn", 120],
    "prefer-const": "warn",
    "arrow-parens": ["warn", "always"],

    // Disabled rules
    "class-methodds-use-this": "off",
    "padded-blocks": "off",
    "no-plusplus": "off",
    "no-underscore-dangle": "off",
    "arrow-body-style": "off",
    "linebreak-style": "off",
    "no-param-reassign": "off",
    "prefer-default-export": "off",
    "no-console": "off",
  },
  "settings": {
    "import/resolve": {
      "moduleDirectory": ["node_modules", "src"]
    }
  }
};
