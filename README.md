# Medusa-Plugin-Variant-Images

Adding possibility to add images to the product variants.

# Getting started

Installation

```bash
yarn add medusa-plugin-variant-images
```

# Usage
## Configuration

This plugin can be used with new `beta` version of medusa with new `@medusajs/admin`.
After release stable version of new extendable admin widgets, this plugin will be updated to support stable version.
If you want to play with it now, you can use `@medusajs/medusa`, `medusa-react`, and `@medusajs/admin` from `beta` branch.

```bash
yarn add @medusajs/medusa@beta @medusajs/admin@beta medusa-react@beta
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