<template>
    <div class="icon-aside-wrapper">
        <!-- 图标大小 -->
        <div class="icon-aside-item">
            <h3 class="icon-aside-item-title">图标大小</h3>
            <div class="icon-aside-item-content">
                <t-slider v-model="configOptions.size" :max="48" :min="12" />
                <t-input-number v-model="configOptions.size" align="center" :allowInputOverLimit="false" theme="column" :max="48" :min="12" />
            </div>
        </div>
        <t-divider></t-divider>
        <!-- 线段粗细 -->
        <div class="icon-aside-item">
            <h3 class="icon-aside-item-title">线段粗细</h3>
            <div class="icon-aside-item-content">
                <t-slider v-model="configOptions.strokeWidth" :max="4" :min="1" />
                <t-input-number v-model="configOptions.strokeWidth" align="center" :allowInputOverLimit="false" theme="column" :max="4" :min="1" />
            </div>
        </div>
        <t-divider></t-divider>

        <!-- 图标风格 -->
        <div class="icon-aside-item">
            <h3 class="icon-aside-item-title">图标风格</h3>
            <div class="icon-aside-item-content mb-20">
                <t-row :gutter="[16, 16]">
                    <t-col v-for="item in themeList" :key="item.label" :span="6">
                        <t-button block :variant="item.checked ? 'base' : 'outline'" :theme="item.checked ? 'primary' : 'default'" @click="onChangeChecked(item, 'theme')">{{
                            item.label
                        }}</t-button>
                    </t-col>
                </t-row>
            </div>
            <!-- 颜色选择器 -->
            <t-row :gutter="[16, 16]">
                <t-col v-for="item in curColorList" :key="item.label" :span="6">
                    <span class="icon-aside-item-color-label">{{ item.label }}</span>
                    <t-color-picker @change="onChange" v-model="item.fill" size="small" format="HEX" :color-modes="['monochrome']" />
                </t-col>
            </t-row>
        </div>
        <t-divider></t-divider>

        <!-- 端点类型 -->
        <div class="icon-aside-item">
            <h3 class="icon-aside-item-title">端点类型</h3>
            <div class="icon-aside-item-content">
                <t-button
                    class="icon-aside-item-button"
                    v-for="item in strokeLinecapList"
                    :key="item.label"
                    block
                    :variant="item.checked ? 'base' : 'outline'"
                    :theme="item.checked ? 'primary' : 'default'"
                    @click="onChangeChecked(item, 'strokeLinecap')"
                    ><span class="icon-aside-item-button-icon" v-html="item.label"></span
                ></t-button>
            </div>
        </div>
        <t-divider></t-divider>

        <!-- 边角类型 -->
        <div class="icon-aside-item">
            <h3 class="icon-aside-item-title">边角类型</h3>
            <div class="icon-aside-item-content">
                <t-button
                    class="icon-aside-item-button"
                    v-for="item in strokeLinejoinList"
                    :key="item.label"
                    block
                    :variant="item.checked ? 'base' : 'outline'"
                    :theme="item.checked ? 'primary' : 'default'"
                    @click="onChangeChecked(item, 'strokeLinejoin')"
                    ><span class="icon-aside-item-button-icon" v-html="item.label"></span
                ></t-button>
            </div>
        </div>

        <t-divider></t-divider>
        <!-- 清空配置 -->
        <div class="icon-aside-item">
            <t-button @click="onReset" block variant="outline">清空配置</t-button>
        </div>
    </div>
</template>

<script>
import { cloneDeep, debounce, defaultConfig, defaultThemeList, defaultStrokeLinecapList, defaultStrokeLinejoinList } from '@/utils'
export default {
    data() {
        return {
            themeList: cloneDeep(defaultThemeList),
            strokeLinecapList: cloneDeep(defaultStrokeLinecapList),
            strokeLinejoinList: cloneDeep(defaultStrokeLinejoinList),
            configOptions: cloneDeep(defaultConfig)
        }
    },
    computed: {
        curColorList() {
            return this.configOptions.colorsList[this.configOptions.theme]
        }
    },
    watch: {
        configOptions: {
            handler() {
                this.onChange()
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        onChangeChecked(curItem, type) {
            this[`${type}List`].forEach(item => {
                item.checked = false
                item.value === curItem.value && (item.checked = true)
            })
            this.configOptions[type] = curItem.value
        },
        onReset() {
            this.themeList = cloneDeep(defaultThemeList)
            this.strokeLinecapList = cloneDeep(defaultStrokeLinecapList)
            this.strokeLinejoinList = cloneDeep(defaultStrokeLinejoinList)
            this.configOptions = cloneDeep(defaultConfig)
        },
        onChange: debounce(function () {
            const { colorsList, theme } = this.configOptions
            const data = {
                ...this.configOptions,
                colors: colorsList[theme].map(item => item.fill)
            }
            this.$emit('change', data)
        }, 500)
    }
}
</script>

<style lang="scss" scoped>
.mb-20 {
    margin-bottom: 20px;
}
.icon-aside-wrapper {
    padding: 20px 20px 60px 20px;
    box-sizing: border-box;
    .icon-aside-item {
        &-title {
            opacity: 0.85;
            font-size: 14px;
            color: #000000;
            font-weight: 500;
            margin: 0;
        }
        &-content {
            margin-top: 12px;
            display: flex;
            width: 100%;
            gap: 16px;
        }
    }
    .icon-aside-item-button-icon {
        display: flex;
        align-items: center;
    }
    .icon-aside-item-color-label {
        font-size: 12px;
        color: #666;
        margin-bottom: 8px;
    }
}
</style>
