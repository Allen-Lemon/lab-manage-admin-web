/*分页组件*/
<template>
    <div class="block">
        <el-pagination class="page-box" @size-change = 'handleSizeChange' @current-change= 'handleCurrentChange' :current-page="currentPage" :page-sizes="[10,15,20]" background
                       :page-size="100" layout="total,sizes,prev,pager,next,jumper" :total="400">

        </el-pagination>
    </div>
    
</template>

<script>
    export default {
        name: "page",
        data(){
            return {
                currentPage:2
            }
        },
        methods: {
            handleSizeChange(val){
                console.log(`当前每页显示都是${val}条`)
            },
            handleCurrentChange(val){
                console.log(`当前第几页${val}`)
            }

        }
    }
</script>

<style scoped>
.page-box{
    margin: 10px auto;
}
</style>