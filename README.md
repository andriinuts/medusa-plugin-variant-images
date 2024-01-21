# Medusa-Plugin-Variant-Images

Adding possibility to add images to the product variants.

# Getting started

Installation

```bash
yarn add medusa-plugin-variant-images
```

# Usage

## Configuration

This plugin requires min version of packages:

```
"@medusajs/medusa": "^1.14.0",
"@medusajs/admin": "^7.1.10"
"medusa-react": "^9.0.4",
"@medusajs/ui": "^2.2.4",
"@medusajs/icons": "^1.1.0",
```

### Add to medusa-config.js

add to your plugins list

```
///...other plugins
  {
    resolve: 'medusa-plugin-variant-images',
    options: {
      enableUI: true,
    },
  },

```

### Update database schema

Run the following command from the root of the project to udpate database with a new table required for storing product variant

```
npx medusa migrations run
```

### How to get images from variant

After enabling this plugin, each variant will contains `images` and `thumbnail` fields.
