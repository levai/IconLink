<template>
    <t-dialog class="m-popup-dialog" attach="body" width="848px" :visible.sync="visible" :closeBtn="false" :footer="false" :header="false">
        <div class="m-popup-content" slot="body">
            <div class="header">
                <h2 class="title">
                    选中图标 <span>{{ count }}</span>
                </h2>
                <CloseIcon @click="onClose" class="icon-close" />
            </div>
            <div class="content">
                <div v-if="isEmpty" class="empty">
                    <img src="@/assets/images/feedback.svg" />
                    <p>暂无选中图标</p>
                </div>
                <div v-else class="items">
                    <IconItem v-for="item in favoriteList" :key="item.name + '_dialog'" :item-data="item" :config="config" :dropdown="false" dialog @checked="onChecked" />
                </div>
            </div>
            <div class="footer">
                <div class="left">
                    <t-button variant="outline" @click="onDeleteAll">
                        删除全部
                        <DeleteIcon slot="icon" />
                    </t-button>
                </div>
                <div class="right">
                    <t-space size="18px">
                        <t-button @click="onDownloadSvg">SVG下载 <DownloadIcon slot="icon" /></t-button>
                        <t-button @click="onDownloadPng" theme="default">PNG下载 <DownloadIcon slot="icon" /></t-button>
                    </t-space>
                </div>
            </div>
        </div>
    </t-dialog>
</template>

<script>
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Canvg } from 'canvg'
import IconItem from './IconItem'
import { CloseIcon, DeleteIcon, DownloadIcon } from 'tdesign-icons-vue'
export default {
    components: {
        IconItem,
        CloseIcon,
        DeleteIcon,
        DownloadIcon
    },
    props: {
        favoriteList: {
            type: Array,
            default: () => []
        },
        count: {
            type: Number,
            default: 0
        },
        config: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            visible: false
        }
    },
    computed: {
        isEmpty() {
            return this.favoriteList.length === 0
        }
    },
    methods: {
        onClose() {
            this.visible = false
        },
        onChecked(curItem, checked) {
            this.$emit('checked', curItem, checked)
        },
        onDeleteAll() {
            this.$emit('deleteAll')
        },
        async convertSvgToPng(svgContent) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            // 使用canvg将SVG渲染到Canvas
            const v = await Canvg.fromString(ctx, svgContent)
            await v.render()
            return canvas.toDataURL('image/png')
        },
        onDownloadSvg() {
            if (this.isEmpty) {
                this.$message.info('暂无选中图标')
                return
            }
            const zip = new JSZip()
            const svgFiles = this.favoriteList
            svgFiles.forEach(file => {
                const fileName = `${file.name}.svg`
                zip.file(fileName, file.svg)
            })
            zip.generateAsync({ type: 'blob' }).then(content => {
                saveAs(content, 'svg_files.zip')
            })
        },
        async onDownloadPng() {
            if (this.isEmpty) {
                this.$message.info('暂无选中图标')
                return
            }
            const zip = new JSZip()
            const svgFiles = this.favoriteList
            for (const file of svgFiles) {
                const pngDataUrl = await this.convertSvgToPng(file.svg)
                const response = await fetch(pngDataUrl)
                const blob = await response.blob()
                const fileName = `${file.name}.png`
                zip.file(fileName, blob)
            }
            zip.generateAsync({ type: 'blob' }).then(content => {
                saveAs(content, 'png_files.zip')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.m-popup-dialog {
    --td-comp-paddingTB-l: 0;
    ::v-deep .t-dialog {
        padding: 0;
        border-radius: 0;
    }
}
.m-popup-content {
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid rgba(231, 231, 231, 1);
        .title {
            font-size: 16px;
            color: var(--text-color-secondary);
            margin: 0;
            span {
                font-size: 14px;
                color: var(--activeColor);
            }
        }
        .icon-close {
            width: 24px;
            height: 24px;
            color: #333;
            cursor: pointer;
        }
    }
    .content {
        align-content: flex-start;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        padding: 20px 16px;
        flex: 1;
        overflow-y: scroll;
        max-height: 300px;
        .empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            p {
                font-size: 12px;
                text-align: center;
                color: #999;
            }
        }
        .items {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 8px;
        }
    }
    .footer {
        border-top: 1px solid rgba(231, 231, 231, 1);
        padding: 20px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
