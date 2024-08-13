<template>
    <div class="icon-store-content-list-wrapper">
        <div class="icon-store-content-list" v-for="rowItem in iconsData" :key="rowItem.category" :id="rowItem.category">
            <h2 class="icon-store-content-list-title">
                {{ rowItem.categoryCN }}
                <span>{{ rowItem.list.length }}</span>
            </h2>
            <div class="icon-store-content-list-inner">
                <IconItem v-for="item in rowItem.list" :key="item.name" :item-data="item" :config="config" @checked="onChecked" />
            </div>
        </div>
    </div>
</template>

<script>
import IconItem from './IconItem'
export default {
    components: {
        IconItem
    },
    props: {
        iconsData: {
            type: Array,
            default: () => []
        },
        config: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        onChecked(curItem, checked) {
            this.$emit('checked', curItem, checked)
        }
    }
}
</script>

<style lang="scss" scoped>
.icon-store-content-list-wrapper {
    flex: 1;
    overflow: hidden auto;
    padding: 0 var(--homeSpace) 100px;
}
.icon-store-content-list-title {
    font-size: 16px;
    color: #000000;
    line-height: 20px;
    font-weight: 500;
    margin: 0 0 20px;
    padding: 0;
    border: none;
    span {
        font-size: 12px;
        color: #000000;
        line-height: 14px;
        font-weight: 400;
    }
}
.icon-store-content-list-inner {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
}
</style>
