import { groupBy, cloneDeep, debounce, throttle } from 'lodash'

import icons from '../../../source/icons.json'

export { cloneDeep, debounce, throttle, icons }

export const defaultConfig = {
    size: 24, // 图标尺寸大小，默认1em
    strokeWidth: 4, // 描边宽度
    strokeLinecap: 'butt', // 描边端点类型
    strokeLinejoin: 'miter', // 描边连接线类型
    theme: 'outline', // 默认主题
    colorsList: {
        outline: [
            {
                label: '描边颜色',
                fill: '#333'
            }
        ],

        filled: [
            {
                label: '填充颜色',
                fill: '#333'
            }
        ],
        'two-tone': [
            {
                label: '描边颜色',
                fill: '#333'
            },
            {
                label: '填充颜色',
                fill: '#2F88FF'
            }
        ],
        'multi-color': [
            {
                label: '外部描边颜色',
                fill: '#333'
            },
            {
                label: '外部填充颜色',
                fill: '#2F88FF'
            },
            {
                label: '内部描边颜色',
                fill: '#FFF'
            },
            {
                label: '内部填充颜色',
                fill: '#43CCF8'
            }
        ]
    },
    colors: ['#333']
}

export const defaultThemeList = [
    {
        label: '线性',
        value: 'outline',
        checked: true
    },
    {
        label: '填充',
        value: 'filled',
        checked: false
    },
    {
        label: '双色',
        value: 'two-tone',
        checked: false
    },
    {
        label: '多色',
        value: 'multi-color',
        checked: false
    }
]

export const defaultStrokeLinecapList = [
    {
        label: `<svg width="1em" height="1em" viewBox="0 0 48 48" fill="none"><path d="M42 24L26 24" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="22" cy="24" r="3" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></circle><path d="M42 40H22C13.1634 40 6 32.8366 6 24C6 15.1634 13.1634 8 22 8H42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
        value: 'butt',
        checked: true
    },
    {
        label: `<svg width="1em" height="1em" viewBox="0 0 48 48" fill="none"><path d="M43 40H23.2857C20.0414 40 7 40 7 40L7 27M43 8H23.2857C14.2914 8 7 8 7 8L7 21M43 24H10" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="7" cy="24" r="3" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></circle></svg>`,
        value: 'round',
        checked: false
    },
    {
        label: `<svg width="1em" height="1em" viewBox="0 0 48 48" fill="none"><path d="M42 40H21.4286C18.355 40 6 40 6 40V8C6 8 12.9076 8 21.4286 8H42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="24" cy="24" r="3" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></circle><path d="M42 24L27 24" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
        value: 'square',
        checked: false
    }
]

export const defaultStrokeLinejoinList = [
    {
        label: `<svg width="1em" height="1em" viewBox="0 0 48 48" fill="none"><path d="M24 42V27M42 24H27" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="24" cy="24" r="3" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></circle><path d="M42 6H24C14.0589 6 6 14.0589 6 24V42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
        value: 'miter',
        checked: true
    },
    {
        label: `<svg width="1em" height="1em" viewBox="0 0 48 48" fill="none"><path d="M24 42V27M42 24H27" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="24" cy="24" r="3" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></circle><path d="M42 6H24H6V24V42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
        value: 'round',
        checked: false
    },
    {
        label: `<svg width="1em" height="1em" viewBox="0 0 48 48" fill="none"><path d="M24 42V27M42 24H27" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="24" cy="24" r="3" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></circle><path d="M42 6H24L6 24V42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
        value: 'bevel',
        checked: false
    }
]

const groupedByCategory = groupBy(icons, 'category')
export const getMenu = () => {
    return Object.keys(groupedByCategory).map(category => {
        const categoryItems = groupedByCategory[category]
        return {
            category: category,
            categoryCN: categoryItems[0].categoryCN,
            list: categoryItems
        }
    })
}

export const svgToBase64 = svgString => {
    // 编码 SVG 字符串为 Base64
    const base64 = btoa(unescape(encodeURIComponent(svgString)))
    return `data:image/svg+xml;base64,${base64}`
}

export const toPascalCase = text => {
    return (
        text
            // eslint-disable-next-line no-useless-escape
            .split(/[\s_\-]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('')
    )
}

export const toKebabCase = text => {
    return (
        text
            .trim()
            .toLowerCase()
            // eslint-disable-next-line no-useless-escape
            .replace(/[\s_\-]+/g, '-')
            .replace(/^-+|-+$/g, '')
    )
}

/**
 * 从 SVG 数据生成 PNG 数据 URL。
 * @param {string} base64Svg - Base64 编码的 SVG 数据 URL。
 * @param {number} width - PNG 图片的宽度。
 * @param {number} height - PNG 图片的高度。
 * @param {number} dpi - 图片的分辨率。
 * @returns {Promise<string>} - 一个 Promise，解析为 PNG 数据 URL。
 */
export function generatePngDataUrl(base64Svg, width = 100, height = 100, dpi = 2) {
    return new Promise((resolve, reject) => {
        if (typeof base64Svg !== 'string' || !base64Svg.startsWith('data:image/svg+xml;base64,')) {
            reject(new Error('Invalid SVG data URL'))
            return
        }

        const image = new Image()
        image.crossOrigin = 'anonymous' // 解决跨域问题
        image.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = width * dpi
            canvas.height = height * dpi
            const ctx = canvas.getContext('2d')

            if (!ctx) {
                reject(new Error('Failed to get canvas context'))
                return
            }

            // 确保背景透明
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.scale(dpi, dpi)
            ctx.drawImage(image, 0, 0, width, height)

            const pngDataUrl = canvas.toDataURL('image/png')
            resolve(pngDataUrl)
        }

        image.onerror = () => {
            reject(new Error('Failed to load SVG image'))
        }

        image.src = base64Svg
    })
}

/**
 * 下载文件的通用函数。
 * @param {string} dataUrl - 文件内容的 Data URL。
 * @param {string} fileName - 下载的文件名。
 * @param {string} [fileType='application/octet-stream'] - 文件的 MIME 类型，默认为 'application/octet-stream'。
 */
export function downloadFile(dataUrl, fileName, fileType = 'application/octet-stream') {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = fileName
    link.type = fileType
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

/**
 * 将 Base64 编码的字符串转换为 Blob 对象。
 * @param {string} base64 - Base64 编码的字符串。
 * @param {string} mimeType - 文件的 MIME 类型。
 * @returns {Blob} - 对应的 Blob 对象。
 */
export function base64ToBlob(base64, mimeType) {
    const base64Data = base64.replace(/^data:.*;base64,/, '')
    const binaryString = atob(base64Data)
    const uint8Array = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i)
    }
    return new Blob([uint8Array], { type: mimeType })
}
