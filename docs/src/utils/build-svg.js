/**
 * @file build-svg
 */

import { IconCompiler } from '@icon-link/compiler'

import { icons } from './index'

const BUILD_CONFIG = {
    author: '@tdio/iconlink',
    useType: true,
    fixedSize: true,
    stroke: 4,
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    cssPrefix: 'i',
    colors: [
        {
            type: 'color',
            color: '#000'
        },
        {
            type: 'color',
            color: '#2F88FF'
        },
        {
            type: 'color',
            color: '#FFF'
        },
        {
            type: 'color',
            color: '#43CCF8'
        }
    ],
    theme: [
        {
            name: 'outline',
            fill: [
                {
                    type: 'color',
                    color: '#333',
                    name: 'fill',
                    currentColor: true
                },
                {
                    type: 'color',
                    color: 'transparent',
                    fixed: true,
                    name: 'background'
                }
            ],
            order: [0, 1, 0, 1]
        },
        {
            name: 'filled',
            fill: [
                {
                    type: 'color',
                    color: '#333',
                    name: 'fill',
                    currentColor: true
                },
                {
                    type: 'color',
                    color: '#FFF',
                    fixed: true,
                    name: 'background'
                }
            ],
            order: [0, 0, 1, 1]
        },
        {
            name: 'two-tone',
            fill: [
                {
                    type: 'color',
                    color: '#333',
                    name: 'fill',
                    currentColor: true
                },
                {
                    type: 'color',
                    color: '#2F88FF',
                    name: 'twoTone'
                }
            ],
            order: [0, 1, 0, 1]
        },
        {
            name: 'multi-color',
            fill: [
                {
                    type: 'color',
                    color: '#333',
                    name: 'outStrokeColor',
                    currentColor: true
                },
                {
                    type: 'color',
                    color: '#2F88FF',
                    name: 'outFillColor'
                },
                {
                    type: 'color',
                    color: '#FFF',
                    name: 'innerStrokeColor'
                },
                {
                    type: 'color',
                    color: '#43CCF8',
                    name: 'innerFillColor'
                }
            ],
            order: [0, 1, 2, 3]
        }
    ]
}

const compiler = IconCompiler.instance({
    ...BUILD_CONFIG,
    type: 'svg'
})

icons.forEach(item => {
    compiler.appendIcon({
        name: item.name,
        description: item.title,
        content: item.svg,
        rtl: item.rtl
    })
})

function extractSVG(input) {
    const svgMatch = input.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)
    return svgMatch ? `'${svgMatch[0]}'` : null
}

export const getSvgCode = name => {
    const code = compiler.map[name]
    return new Function('props', `return ${extractSVG(code)}`)
}
