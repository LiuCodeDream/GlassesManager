<template>
    <div class="ele-body">
        <a-card :bordered="false">
            <app-search />
            <ele-pro-table
                ref="tableRef"
                :columns="columns"
                :datasource="datasource">
                <template #toolbar>
                    <a-space>
                        <a-button type="primary">
                            <template #icon>
                                <plus-outlined />
                            </template>
                            <span>新建</span>
                        </a-button>
                    </a-space>
                </template>
            </ele-pro-table>
        </a-card>
    </div>
</template>
<script setup>
    import { ref, reactive } from 'vue';
    import { PlusOutlined } from '@ant-design/icons-vue';
    import appSearch from './components/app-search.vue';
    import { pageApps }  from '../../../api/system/app/index';


    const tableRef = ref(null);
    const columns = ref([
        {
            key: 'index',
            title: '序号',
            width: 48,
            align: 'center',
            fixed: 'left',
            hideInSetting: true,
            customRender: ({index}) => index + (tableRef.value?.tableIndex ?? 0)
        },
        {
            title: '应用名称',
            dataIndex: 'name',
            sorter: true,
            showSorterTooltip: false
        },
        {
            title: '应用代码',
            dataIndex: 'code',
            sorter: true,
            showSorterTooltip: false
        }
    ]);

    const  datasource = async ({where}) => {
        var datas = [];
        try {
            datas = (await pageApps({...where})).rows;
        }catch(error) {

        }
        return datas;
    };
    
</script>
<style lang="less" scoped>

</style>
