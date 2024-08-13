<template>
    <div class="icon-item-group" :class="{ 'is-dialog': dialog }">
        <t-dropdown :disabled="!dropdown" :maxColumnWidth="120" :options="dropdownOptions" trigger="hover" :hideAfterItemClick="false">
            <div class="icon-item" :class="{ active: isActive, 'is-dialog': dialog }">
                <div class="icon-item-operate" @click.stop="onChecked">
                    <PlusIcon v-if="!isActive" color="var(--activeColor)" />
                    <MultiplyIcon class="icon-del" v-else />
                </div>
                <div class="icon-item-base">
                    <img v-lazy="itemData.base64Url" />
                    <!-- <img v-else :src="itemData.base64Url" /> -->
                </div>
                <div v-if="!dialog" class="icon-item-name">
                    {{ itemData.title }}
                </div>
            </div>
        </t-dropdown>
    </div>
</template>

<script>
import { toPascalCase, toKebabCase, base64ToBlob, generatePngDataUrl, downloadFile } from '@/utils'
import { isArray } from 'lodash'

import { MultiplyIcon, PlusIcon } from 'tdesign-icons-vue'
export default {
    components: {
        MultiplyIcon,
        PlusIcon
    },
    props: {
        itemData: {
            type: Object,
            default: () => {}
        },
        config: {
            type: Object,
            default: () => {}
        },
        dialog: {
            type: Boolean,
            default: false
        },
        dropdown: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            dropdownOptions: [
                {
                    content: '复制SVG',
                    value: 1,
                    onClick: this.copySvg
                },
                {
                    content: '复制React代码',
                    value: 2,
                    onClick: () => this.copyCode('React')
                },
                {
                    content: '复制Vue代码',
                    value: 3,
                    onClick: () => this.copyCode('Vue')
                },
                {
                    content: '复制PNG',
                    value: 4,
                    divider: true,
                    onClick: this.copyPng
                },
                {
                    content: '下载SVG',
                    value: 5,
                    onClick: this.downloadSvg
                },
                {
                    content: '下载PNG',
                    value: 6,
                    onClick: this.downloadPng
                }
            ],
            checked: this.itemData.checked
        }
    },
    computed: {
        svgContent() {
            return this.itemData.svg || ''
        },
        iconName() {
            return this.itemData.name || ''
        },
        isActive() {
            return this.itemData.checked
        }
    },
    methods: {
        onChecked() {
            this.checked = !this.checked
            this.$emit('checked', this.itemData, this.checked)
        },
        getIconComp(type = 'React') {
            const validTypes = ['React', 'Vue']
            if (!validTypes.includes(type)) {
                throw new Error('type must be one of React or Vue')
            }

            const { theme, colors, size, strokeLinecap, strokeLinejoin, strokeWidth } = this.config

            const iconName = type === 'React' ? toPascalCase(this.iconName) : toKebabCase(this.iconName)

            // 处理 fill 属性
            const fill = colors && colors.length > 1 ? colors : colors[0]
            console.log('[ fill ]-123', fill)
            const fillAttr = isArray(fill) ? (type === 'React' ? `fill={['${fill.join("','")}']}` : `:fill="['${fill.join("','")}']"`) : `fill="${fill}"`

            // 处理 strokeWidth 属性
            const strokeWidthAttr = strokeWidth === 4 ? '' : type === 'React' ? `strokeWidth={${strokeWidth}}` : `strokeWidth="${strokeWidth}"`

            // 处理 strokeLinecap 和 strokeLinejoin 属性
            const strokeLinecapAttr = strokeLinecap !== 'butt' ? `strokeLinecap="${strokeLinecap}"` : ''
            const strokeLinejoinAttr = strokeLinejoin !== 'miter' ? `strokeLinejoin="${strokeLinejoin}"` : ''

            // 生成最终的组件字符串
            return `<${iconName} theme="${theme}" size="${size}" ${fillAttr} ${strokeWidthAttr} ${strokeLinecapAttr} ${strokeLinejoinAttr} />`
        },
        copyFun(text, successMsg, errorMsg) {
            this.$copyText(text).then(
                () => {
                    this.$message.success(successMsg)
                },
                () => {
                    this.$message.info(errorMsg)
                }
            )
        },
        copySvg() {
            const copyText = `<?xml version="1.0" encoding="UTF-8"?>${this.svgContent}`
            this.copyFun(copyText, '操作成功', '操作失败')
        },
        copyCode(type) {
            const code = this.getIconComp(type)
            this.copyFun(code, `操作成功：${code}`, `操作失败`)
        },
        async copyPng() {
            try {
                const pngDataUrl = await generatePngDataUrl(this.itemData.base64Url, 240, 240)
                const imageBlob = base64ToBlob(pngDataUrl, 'image/png')
                if (navigator.clipboard && navigator.clipboard.write) {
                    await this.$copyText(' ')
                    await navigator.clipboard.write([
                        new ClipboardItem({
                            'image/png': imageBlob
                        })
                    ])
                    this.$message.success('操作成功')
                } else {
                    console.error('当前浏览器不支持剪贴板 API')
                    this.$message.error('当前浏览器不支持剪贴板操作')
                }
            } catch (error) {
                console.error('复制图片到剪贴板时出错:', error)
                this.$message.error('复制图片失败，请重试')
            }
        },
        async downloadSvg() {
            const dataUrl = this.itemData.base64Url
            await this.initiateDownload(dataUrl, 'image/svg+xml')
        },
        async downloadPng() {
            const dataUrl = await generatePngDataUrl(this.itemData.base64Url)
            await this.initiateDownload(dataUrl, 'image/png')
        },
        async initiateDownload(dataUrl, mimeType) {
            let url = ''
            try {
                const blob = base64ToBlob(dataUrl, mimeType)
                url = URL.createObjectURL(blob)
                const fileName = `${this.itemData.title}_${this.itemData.name}`
                await downloadFile(url, fileName, mimeType)
                this.$message.success('操作成功')
            } catch (error) {
                console.error('文件下载失败:', error)
                this.$message.error('下载失败，请重试')
            } finally {
                if (url) {
                    URL.revokeObjectURL(url)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.icon-item-group {
    --td-bg-color-secondarycontainer: tarnsparent;
    margin-bottom: 20px;
    padding: 0 10px;
    // width: 12.5%;
    box-sizing: border-box;
    &.is-dialog {
        margin-bottom: 0;
        padding: 0;
    }
    .icon-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 120px;
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 2px;
        cursor: pointer;
        &.is-dialog {
            width: 72px;
            height: 72px;
            border-color: transparent;
            &.active {
                border-color: transparent;
            }
            &:hover {
                border-color: var(--homeMenuHoverColor);
            }
            .icon-item-operate {
                top: 4px;
                right: 4px;
            }
        }
        &.active {
            border-color: var(--homeMenuHoverColor);
        }
        &:hover {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
            .icon-item-operate {
                display: flex;
            }
        }
        &-operate {
            position: absolute;
            top: 8px;
            right: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            background: #ebeff7;
            border-radius: 1px;
            color: var(--text-color-secondary);
            font-size: 24px;
            display: none;
            .icon-del {
                &:hover {
                    color: #ff3300;
                }
            }
        }
        &-base {
            width: 48px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            flex: none;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                max-width: 48px;
            }
            img[lazy='loading'],
            img[lazy='error'] {
                width: 24px;
            }
        }
        &-name {
            font-size: 14px;
            color: var(--text-color-secondary);
            font-weight: 500;
            white-space: nowrap; /* 不换行 */
            overflow: hidden; /* 隐藏溢出的文本 */
            text-overflow: ellipsis;
            display: block;
            width: 100%;
            text-align: center;
            padding: 0 10px;
        }
    }
}
</style>
