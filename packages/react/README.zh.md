# IconLink Icons

> React Icons for IconLink

## 介绍

### 新特性

-   提供超过 2000 图标
-   支持 4 种主题:
    -   线性
    -   填充
    -   双色
    -   四色

### 更多图标

请访问[IconLink](https://github.com/levai/IconLink), 提供更多便捷的操作：

-   复制 SVG 源文件
-   复制 React 图标组件
-   复制 Vue 图标组件
-   下载 PNG
-   下载 SVG

## 快速上手

### 安装

```
npm install @icon-link/react --save
```

### 引用图标

在组件的上方引用`@icon-link/react`，并在组件的渲染函数中使用:

```typescript jsx
import {Home} from '@icon-link/react';

// examples
<Home/>
<Home theme="filled"/>
```

### Style Sheet

引用预设样式

```typescript
import '@icon-link/react/styles/index.css'
```

或者

```typescript
import '@icon-link/react/styles/index.less'
```

### 全局

你可以使用 `@icon-link/react` 中的 `IconProvider`来设置全局配置。

```typescript jsx
import { IconProvider, DEFAULT_ICON_CONFIGS } from '@icon-link/react'
import { Home } from '@icon-link/react'

const IconConfig = { ...DEFAULT_ICON_CONFIGS, prefix: 'icon' }

function App() {
    return (
        <IconProvider value={IconConfig}>
            <Home />
            <Home theme="filled" />
        </IconProvider>
    )
}
```

### 按需加载

可以使用[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)来按需加载图标

配置如下:

```json
{
    "plugins": [
        [
            "import",
            {
                "libraryName": "@icon-link/react",
                "libraryDirectory": "es/icons",
                "camel2DashComponentName": false
            }
        ]
    ]
}
```

### 使用 Icon 组件

我们更推荐使用按需加载的方式来加载图标，因为这样可以大幅度缩减编译后代码体积，
但是在有些类似远程加载的菜单的场景下，直接引用全部图标可以缩减开发成本。

使用方式：

```typescript jsx
import Icon, { IconType } from '@icon-link/react/es/all'
import React, { Fragment } from 'react'

export function Demo(props: { type: IconType }): JSX.Element {
    const { type } = props

    return (
        <Fragment>
            <Icon type={type} theme="filled" />
            <Icon type="People" theme="filled" />
            <Icon type="Switch" />
        </Fragment>
    )
}
```

当你不确定 type 是否合法时，你可以这样做

```typescript jsx
import Icon, { ALL_ICON_KEYS, IconType } from '@icon-link/react/es/all'
import React, { Fragment } from 'react'

export function Demo(props: { type: IconType }): JSX.Element {
    const { type } = props

    if (ALL_ICON_KEYS.indexOf(type) < 0) {
        return <span>图标不存在</span>
    }

    return (
        <Fragment>
            <Icon type={type} theme="filled" />
            <Icon type="AddText" theme="filled" />
            <Icon type="add-text" />
        </Fragment>
    )
}
```

### 将 IconLink 嵌入到你的项目中

如果你的项目中需要使用到图标名称，作者，分类，标签以及创建时间等额外的信息，你可以使用位于每个 NPM 根目录的`icons.json`文件。

## 属性

| 属性名称       | 介绍                                        | 类型                                                             | 默认值         | 注释 |
| -------------- | ------------------------------------------- | ---------------------------------------------------------------- | -------------- | ---- |
| theme          | 图标主题                                    | 'outline' &#124; 'filled' &#124; 'two-tone' &#124; 'multi-color' | 'outline'      |
| size           | 图标的大小，宽高相同                        | number &#124; string                                             | '1em'          |
| spin           | 给图标加旋转效果                            | boolean                                                          | false          |
| fill           | 图标的颜色，不超过 4 个颜色，默认为当前颜色 | string &#124; string[]                                           | 'currentColor' |
| strokeLinecap  | svg 元素的 stroke-linecap 属性              | 'butt' &#124; 'round' &#124; 'square'                            | 'round'        |
| strokeLinejoin | svg 元素的 stroke-linejoin 属性             | 'miter' &#124; 'round' &#124; 'bevel'                            | 'round'        |
| strokeWidth    | svg 元素的 stroke-width 属性                | number                                                           | 4              |
| tag            | 包裹 svg 的标签                             | string                                                           | span           |

**其他属性**
你可以使用定义的`HTMLAttributes<HTMLSpanElement>>`上的全部属性，比如：

-   className
-   style
-   onClick
-   ...
