# IconLink

This project is derived from [iconpark](https://github.com/bytedance/iconpark), and is transformed and expanded on this basis.

English | [简体中文](README.zh.md)

visit [IconLink](https://icon-space.github.io/doc/)


### Packages
#### Generate Cross-platform Components

Find packages in `packages` folder. NPM packages make it painless to import icon components to your project.

| Name | Github link | NPM link                                                                  |
| ------- | --- |---------------------------------------------------------------------------|
| React Icons | [React Component](./packages/react/README.md)  | [@icon-link/react](https://www.npmjs.com/package/@icon-link/react)      |
| Vue2 Icons | [Vue Component for old Vue2.0](./packages/vue/README.md) | [@icon-link/vue](https://www.npmjs.com/package/@icon-link/vue)           |
| Vue3 Icons | [Vue Component for Vue3.0](./packages/vue-next/README.md) | [@icon-link/vue-next](https://www.npmjs.com/package/@icon-link/vue-next) |
| SVG Icons | [Pure SVG String](./packages/svg/README.md)| [@icon-link/svg](https://www.npmjs.com/package/@icon-link/svg)           |

### Develop

#### Add your own svg image

1. clone/fork repo
2. Find the corresponding classification in the folder `source` and put the icon file in it
3. Modify the file [db.csv](source/db.csv) configuration
4. submit

The project will automatically generate the corresponding `react` `svg` `vue` `vue-next` code

### Publish

1. Modify `packages/react/package.json` `packages/svg/package.json` `packages/vue/package.json` `packages/vue-next/package.json` versions
2. submit
3. create a new `release`，`github action` will automatic publishing

### Join

<img src="https://user-images.githubusercontent.com/41979509/222069693-3df322d9-d914-4d25-a7d3-6549f3a82127.jpeg" width="160" />
