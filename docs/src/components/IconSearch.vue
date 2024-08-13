<template>
    <div>
        <t-row>
            <t-col :span="6">
                <t-input size="large" v-model="value" clearable placeholder="请输入图标关键词" @change="onInput">
                    <template #prefixIcon>
                        <SearchIcon />
                    </template>
                </t-input>
            </t-col>
            <t-col :span="4">
                <div class="add-collect-box">
                    <t-badge :count="count" color="var(--activeColor)">
                        <t-button size="large" variant="outline" @click="onClickFavorite">
                            <img slot="icon" src="@/assets/images/icon-folder.svg" />
                        </t-button>
                    </t-badge>
                </div>
            </t-col>
        </t-row>
    </div>
</template>

<script>
import { SearchIcon } from 'tdesign-icons-vue'
import { debounce } from 'lodash'
export default {
    components: {
        SearchIcon
    },
    props: {
        searchValue: {
            type: String,
            default: ''
        },
        count: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            value: this.searchValue
        }
    },
    methods: {
        onInput: debounce(function (value) {
            this.$emit('change', value)
        }, 500),
        onClickFavorite() {
            this.$emit('click')
        }
    }
}
</script>
<style lang="scss" scoped>
.add-collect-box {
    margin-left: 20px;
}
</style>
