<template>
    <div class="icon-page">
        <section class="icon-content">
            <main class="icon-content-main">
                <div class="icon-store">
                    <!-- 左侧导航 -->
                    <div class="icon-store-anchors">
                        <scrollactive class="anchors-list" v-bind="scrollActiveOptions" @itemchanged="onItemChanged">
                            <a v-for="item in menuData" :key="item.category" class="anchors-link scrollactive-item" :href="`#${item.category}`">
                                {{ item.categoryCN }}
                            </a>
                        </scrollactive>
                    </div>
                    <!-- 右侧图标列表 -->
                    <div class="icon-store-content">
                        <!-- 搜索 -->
                        <div class="icon-store-content-tool">
                            <IconSearch :search-value="search" :count="count" @change="onSearchChange" @click="onClickFavorite" />
                        </div>
                        <div v-show="isEmpty" class="icon-store-feedback">
                            <div class="icon-store-feedback-chart">
                                <img src="@/assets/images/feedback.svg" />
                            </div>
                            <div class="icon-store-feedback-tip">暂无您想要的图标</div>
                        </div>
                        <IconPanelList v-show="!isEmpty" :icons-data="menuData" :config="config" @checked="onChangeChecked" />
                    </div>
                </div>
            </main>
            <!-- 工具栏 -->
            <aside class="icon-content-aside">
                <IconAside @change="onChangeConfig" />
            </aside>
        </section>
        <!-- 收集弹窗 -->
        <IconDialog ref="dialog" @checked="onChangeChecked" :count="count" :config="config" :favoriteList="favoriteList" @deleteAll="onDeleteAll" />
    </div>
</template>

<script>
import IconSearch from '@/components/IconSearch.vue'
import IconPanelList from '@/components/IconPanelList.vue'
import IconAside from '@/components/IconAside.vue'
import IconDialog from '@/components/IconDialog.vue'
import { cloneDeep, getMenu, defaultConfig, svgToBase64 } from '@/utils'
import { getSvgCode } from '@/utils/build-svg'
export default {
    name: 'IconHome',
    components: {
        IconSearch,
        IconPanelList,
        IconAside,
        IconDialog
    },
    data() {
        return {
            search: '',
            menuData: [],
            favoriteList: [],
            scrollActiveOptions: {
                activeClass: 'active',
                alwaysTrack: true,
                modifyUrl: false,
                duration: 10,
                offset: 0,
                bezierEasingValue: '0.5,0,0.35,1',
                scrollContainerSelector: '.icon-store-content-list-wrapper'
            },
            config: cloneDeep(defaultConfig)
        }
    },
    computed: {
        count() {
            return this.favoriteList.length
        },
        isEmpty() {
            return this.menuData.length === 0
        }
    },
    mounted() {
        this.menuData = getMenu()
    },
    watch: {
        config() {
            this.updateMenuDataByConfig()
            this.updateFavoriteListByConfig()
        }
    },
    methods: {
        onItemChanged(e, curItem) {
            const rect = curItem.getBoundingClientRect()
            if (rect.top < 0 || rect.bottom > window.innerHeight) {
                curItem.scrollIntoView({ block: 'center' })
            }
        },
        onClickFavorite() {
            this.$refs.dialog.visible = true
        },
        onDeleteAll() {
            this.favoriteList.forEach(item => {
                this.updateMenuDataByChecked(item, false)
            })
            this.favoriteList = []
        },
        onChangeChecked(curItem, checked) {
            this.updateFavoriteList(curItem, checked)
            this.updateMenuDataByChecked(curItem, checked)
        },
        onSearchChange(val) {
            this.search = val
            if (!val) {
                this.menuData = getMenu()
            } else {
                this.menuData = this.fuzzySearch(this.menuData, val)
            }
            this.updateMenuDataByConfig()
        },
        fuzzySearch(data, query) {
            const regex = new RegExp(query, 'i') // 创建忽略大小写的正则表达式
            let results = []
            data.forEach(categoryItem => {
                const matches = categoryItem.list.filter(item => {
                    // 检查 title 是否匹配
                    if (regex.test(item.title)) return true

                    // 检查 tag 是否匹配
                    if (item.tag.some(tag => regex.test(tag))) return true

                    return false
                })
                // 将匹配的条目添加到结果中
                if (matches.length > 0) {
                    results.push({
                        category: categoryItem.category,
                        categoryCN: categoryItem.categoryCN,
                        list: matches
                    })
                }
            })
            return results
        },
        onChangeConfig(data) {
            this.config = data
        },
        getBase64Url(config, name) {
            const props = {
                ...config,
                colors: config.colors.concat(Array(4).fill('')).slice(0, 4)
            }
            const svgTemplate = getSvgCode(name)
            const svgContent = svgTemplate(props)
            const base64 = svgToBase64(svgContent)
            return { base64, svgContent }
        },
        updateMenuDataByConfig() {
            let isUpdated = false

            this.menuData.forEach(item => {
                item.list.forEach(item2 => {
                    const { svgContent, base64 } = this.getBase64Url(this.config, item2.name)
                    if (item2.base64Url !== base64 || item2.svg !== svgContent) {
                        this.$set(item2, 'base64Url', base64)
                        this.$set(item2, 'svg', svgContent)
                        isUpdated = true
                    }
                })
            })
            if (isUpdated) {
                this.menuData = [...this.menuData]
            }
        },
        updateMenuDataByChecked(curItem, checked) {
            const { id, category } = curItem
            let isUpdated = false
            this.menuData.forEach(item => {
                if (item.category === category) {
                    item.list.forEach(item2 => {
                        if (item2.id === id) {
                            if (item2.checked !== checked) {
                                this.$set(item2, 'checked', checked)
                                isUpdated = true
                            }
                        }
                    })
                }
            })
            if (isUpdated) {
                this.menuData = [...this.menuData]
            }
        },
        updateFavoriteList(curItem, checked) {
            if (checked) {
                this.favoriteList.push({ ...curItem, checked })
            } else {
                const index = this.favoriteList.findIndex(item => item.id === curItem.id)
                this.favoriteList.splice(index, 1)
            }
        },
        updateFavoriteListByConfig() {
            const cache = new Map()

            this.favoriteList.forEach(item => {
                const cacheKey = `${this.config}-${item.name}`
                if (!cache.has(cacheKey)) {
                    const { svgContent, base64 } = this.getBase64Url(this.config, item.name)
                    cache.set(cacheKey, { svgContent, base64 })
                }
                const { svgContent, base64 } = cache.get(cacheKey)
                if (item.base64Url !== base64 || item.svg !== svgContent) {
                    item.base64Url = base64
                    item.svg = svgContent
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
$contentHeight: 100svh;
.icon-page {
    background-color: var(--homeBgColor);
}
.icon-content {
    display: flex;
    background-color: var(--homeBgColor);
    height: $contentHeight;
    overflow: hidden;
}
.icon-content-main {
    flex: 1;
    overflow: auto;
    height: auto;
    .icon-store {
        display: flex;
        height: 100%;
    }
    .icon-store-anchors {
        width: var(--homeMenuWidth);
        overflow-y: auto;
        border-right: 1px solid var(--borderColor);
        .anchors-list {
            list-style: none;
            margin: 0;
            padding: 10px 0;
        }
        .anchors-link {
            padding: 0 20px;
            flex: none;
            height: 40px;
            text-align: left;
            display: block;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 40px;
            font-size: 14px;
            color: var(--text-color-secondary);
            cursor: pointer;
            font-weight: 500;
            margin-bottom: 4px;
            box-sizing: border-box;
            &:hover {
                color: var(--homeMenuHoverColor);
                background-color: #f8f9fa;
            }
            &.active {
                font-weight: 600;
                color: var(--homeMenuHoverColor);
                background-color: #f8f9fa;
            }
        }
    }
    .icon-store-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: $contentHeight;
        overflow: hidden scroll;
        &-tool {
            position: sticky;
            top: 0;
            margin: 36px var(--homeSpace);
            background-color: var(--homeBgColor);
        }
    }
}
.icon-content-aside {
    width: 300px;
    background: #f7f8fb;
    overflow-y: auto;
}
.icon-store-feedback {
    text-align: center;
    margin-top: 60px;
    &-chart {
        margin-top: 24px;
    }
    &-tip {
        margin-bottom: 20px;
        color: var(--text-color-placeholder);
        height: 20px;
    }
}
</style>
