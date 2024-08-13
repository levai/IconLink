/**
 * @file runtime 运行时
 * @author Auto Generated by IconLink
 */

import React, { HTMLAttributes, ReactElement, createContext, useContext, useMemo } from 'react'

type NonAny = number | boolean | string | symbol | null
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends NonAny[] // checks for nested any[]
        ? T[P]
        : T[P] extends ReadonlyArray<NonAny> // checks for nested ReadonlyArray<any>
        ? T[P]
        : T[P] extends Date // checks for Date
        ? T[P]
        : T[P] extends (infer U)[]
        ? DeepPartial<U>[]
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : T[P] extends Set<infer V> // checks for Sets
        ? Set<DeepPartial<V>>
        : T[P] extends Map<infer K, infer V> // checks for Maps
        ? Map<K, DeepPartial<V>>
        : T[P] extends NonAny // checks for primative values
        ? T[P]
        : DeepPartial<T[P]> // recurse for all non-array, non-date and non-primative values
}

// 描边连接类型
export type StrokeLinejoin = 'miter' | 'round' | 'bevel'

// 描边端点类型
export type StrokeLinecap = 'butt' | 'round' | 'square'

// 主题
export type Theme = 'outline' | 'filled' | 'two-tone' | 'multi-color'

// 包裹前的图标属性
export interface ISvgIconProps {
    // 包裹当前的图标的tag，默认是span
    tag: string
    // 当前图标的唯一Id
    id: string

    // 图标尺寸大小，默认1em
    size: number | string

    // 描边宽度
    strokeWidth: number

    // 描边端点类型
    strokeLinecap: StrokeLinecap

    // 描边连接线类型
    strokeLinejoin: StrokeLinejoin

    // 换肤的颜色数组
    colors: string[]
}

// 图标配置属性
export interface IIconConfig {
    // 自定义tag，默认是span包裹
    tag: string
    // 图标尺寸大小，默认1em
    size: number | string

    // 描边宽度
    strokeWidth: number

    // 描边端点类型
    strokeLinecap: StrokeLinecap

    // 描边连接线类型
    strokeLinejoin: StrokeLinejoin

    // CSS前缀
    prefix: string

    // RTL是否开启
    rtl: boolean

    // 默认主题
    theme: Theme

    // 主题默认颜色
    colors: {
        outline: {
            fill: string
            background: string
        }

        filled: {
            fill: string
            background: string
        }

        twoTone: {
            fill: string
            twoTone: string
        }

        multiColor: {
            outStrokeColor: string
            outFillColor: string
            innerStrokeColor: string
            innerFillColor: string
        }
    }
}

// 图标基础属性
export interface IIconBase {
    // 自定义tag，默认是span包裹
    tag?: string
    // 图标尺寸大小，默认1em
    size?: number | string

    // 描边宽度
    strokeWidth?: number

    // 描边端点类型
    strokeLinecap?: StrokeLinecap

    // 描边连接线类型
    strokeLinejoin?: StrokeLinejoin

    // 默认主题
    theme?: Theme

    // 填充色
    fill?: string | string[]
}

// 安全的类型合并
export type Intersection<T, K> = T & Omit<K, keyof T>

// 包裹后的图标非扩展属性
export interface IIcon extends IIconBase {
    spin?: boolean
}

// 包裹后的图标属性
export type IIconProps = Intersection<IIcon, HTMLAttributes<HTMLSpanElement>>

// 包裹前的图标
export type IconRender = (props: ISvgIconProps) => ReactElement

// 包裹后的图标
export type Icon = (props: IIconProps) => ReactElement

// 默认属性
export const DEFAULT_ICON_CONFIGS: IIconConfig = {
    tag: 'span',
    size: '1em',
    strokeWidth: 4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    rtl: false,
    theme: 'outline',
    colors: {
        outline: {
            fill: 'currentColor',
            background: 'transparent'
        },
        filled: {
            fill: 'currentColor',
            background: '#FFF'
        },
        twoTone: {
            fill: 'currentColor',
            twoTone: '#2F88FF'
        },
        multiColor: {
            outStrokeColor: 'currentColor',
            outFillColor: '#2F88FF',
            innerStrokeColor: '#FFF',
            innerFillColor: '#43CCF8'
        }
    },
    prefix: 'i'
}

function guid(): string {
    return 'icon-' + (((1 + Math.random()) * 0x100000000) | 0).toString(16).substring(1)
}

const getColor = (fillColor: string | undefined, cfgColor: string): string => {
    if (fillColor?.trim()?.length) {
        return fillColor
    }
    if (cfgColor.trim().length) {
        return cfgColor
    }
    return 'currentColor'
}

// 属性转换函数
export function IconConverter(id: string, icon: IIconBase, config: DeepPartial<IIconConfig>): ISvgIconProps {
    const fill: string[] = typeof icon.fill === 'string' ? [icon.fill] : icon.fill || []
    const colors: string[] = []

    const theme: Theme = icon.theme || config.theme || DEFAULT_ICON_CONFIGS.theme

    switch (theme) {
        case 'outline':
            colors.push(getColor(fill[0], config?.colors?.outline?.fill ?? DEFAULT_ICON_CONFIGS.colors.outline.fill))
            colors.push('transparent')
            colors.push(getColor(fill[0], config?.colors?.outline?.fill ?? DEFAULT_ICON_CONFIGS.colors.outline.fill))
            colors.push('transparent')
            break
        case 'filled':
            colors.push(getColor(fill[0], config?.colors?.filled?.fill ?? DEFAULT_ICON_CONFIGS.colors.filled.fill))
            colors.push(getColor(fill[0], config?.colors?.filled?.fill ?? DEFAULT_ICON_CONFIGS.colors.filled.fill))
            colors.push('#FFF')
            colors.push('#FFF')
            break
        case 'two-tone':
            colors.push(getColor(fill[0], config?.colors?.twoTone?.fill ?? DEFAULT_ICON_CONFIGS.colors.twoTone.fill))
            colors.push(getColor(fill[1], config?.colors?.twoTone?.twoTone ?? DEFAULT_ICON_CONFIGS.colors.twoTone.twoTone))
            colors.push(getColor(fill[0], config?.colors?.twoTone?.fill ?? DEFAULT_ICON_CONFIGS.colors.twoTone.fill))
            colors.push(getColor(fill[1], config?.colors?.twoTone?.twoTone ?? DEFAULT_ICON_CONFIGS.colors.twoTone.twoTone))
            break
        case 'multi-color':
            colors.push(getColor(fill[0], config?.colors?.multiColor?.outStrokeColor ?? DEFAULT_ICON_CONFIGS.colors.multiColor.outStrokeColor))
            colors.push(getColor(fill[1], config?.colors?.multiColor?.outFillColor ?? DEFAULT_ICON_CONFIGS.colors.multiColor.outFillColor))
            colors.push(getColor(fill[2], config?.colors?.multiColor?.innerStrokeColor ?? DEFAULT_ICON_CONFIGS.colors.multiColor.innerStrokeColor))
            colors.push(getColor(fill[3], config?.colors?.multiColor?.innerFillColor ?? DEFAULT_ICON_CONFIGS.colors.multiColor.innerFillColor))
            break
    }

    return {
        tag: icon.tag ?? config.tag ?? DEFAULT_ICON_CONFIGS.tag,
        size: icon.size || config.size || DEFAULT_ICON_CONFIGS.size,
        strokeWidth: icon.strokeWidth || config.strokeWidth || DEFAULT_ICON_CONFIGS.strokeWidth,
        strokeLinecap: icon.strokeLinecap || config.strokeLinecap || DEFAULT_ICON_CONFIGS.strokeLinecap,
        strokeLinejoin: icon.strokeLinejoin || config.strokeLinejoin || DEFAULT_ICON_CONFIGS.strokeLinejoin,
        colors,
        id
    }
}

// 图标配置Context
const IconContext = createContext<DeepPartial<IIconConfig>>(DEFAULT_ICON_CONFIGS)

// 图标配置Provider
export const IconProvider = IconContext.Provider

// 图标Wrapper
export function IconWrapper(name: string, rtl: boolean, render: IconRender): Icon {
    return (props: IIconProps) => {
        const { tag, size, strokeWidth, strokeLinecap, strokeLinejoin, theme, fill, className, spin, ...extra } = props

        const config = useContext(IconContext)

        const id = useMemo(guid, [])

        const svgProps = IconConverter(
            id,
            {
                tag,
                size,
                strokeWidth,
                strokeLinecap,
                strokeLinejoin,
                theme,
                fill
            },
            config
        )

        const cls: string[] = ['i-icon']

        cls.push('i-icon' + '-' + name)

        if (rtl && config.rtl) {
            cls.push('i-icon-rtl')
        }

        if (spin) {
            cls.push('i-icon-spin')
        }

        if (className) {
            cls.push(className)
        }

        const CustomTag = `${svgProps.tag}` as keyof React.ReactHTML

        if (CustomTag.length === 0) {
            return <>{render(svgProps)}</>
        }

        return (
            <CustomTag {...extra} className={cls.join(' ')}>
                {render(svgProps)}
            </CustomTag>
        )
    }
}
