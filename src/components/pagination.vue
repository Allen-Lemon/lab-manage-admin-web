<template>
    <div class="pagenation">
        <el-pagination small class="text-center"  @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="params.pageNumber" :page-sizes="pageSizes" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="params.total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        props: {
            // 总条数
            params: {
                type: Object
            },
            parentMethod: {
                type: Function,
                default: null
            }
        },
        data () {
            return {
                pageSizes: [10,15,20]
            }
        },
        methods: {
            // // 每页查看条数变化
            handleSizeChange (pageSize) {
                this.params.pageSize = pageSize
                this.parentMethod()
            },
            // 当前页码变化
            handleCurrentChange (pageNumber) {
                this.params.pageNumber = pageNumber
                this.parentMethod()
            }
        }

    }
</script>

<style scoped>
    .pagenation {
        margin: 20px 0;
    }
    pagenation.el-pager li.active{
        background-color: #409EFF;
        color: #FFF;
    }
</style>