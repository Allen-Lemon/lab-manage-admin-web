<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/index'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>预约订单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table    highlight-current-row style="width: 100%;" :data="tableData"  :row-style="{height: 0+ 'px'}" :cell-style="{padding: 10+'px', fontSize:5+'px'}">
            <el-table-column type="selection" width="55" />
            <el-table-column     prop="order_no" label="订单号"/>
            <el-table-column    prop="name" label="实验订单名称"/>
            <el-table-column    prop="tower_room" label="房间号"/>
            <el-table-column    prop="username" label="用户名"/>
            <el-table-column    prop="submit_time" label="订单提交时间"/>
            <el-table-column    prop="order_status" label="订单状态" :formatter="formatterOrderStatus"/>
            <el-table-column    prop="start_time" label="订单开始时间"/>
            <el-table-column    prop="end_time" label="订单结束时间"/>
            <el-table-column  label="操作" width="450px" align="center"
                              fixed="right">
                <template slot-scope="scope">
                    <el-button  class="filter-item" size="mini" type="primary" icon="el-icon-zoom-in"  @click="checkOrderDetails(scope.row)">查看</el-button>
                    <el-button  size="mini" type="success" icon="el-icon-check" >审核通过</el-button>
                    <el-button  class="filter-item" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--添加分页-->
        <pagination :params="pageParam.page" :parentMethod="getAllOrders"></pagination>
    </div>
</template>

<script>
    import {selectAllOrder} from "../../api/request";
    import pagination  from "../../components/pagination";
    export default {
        name: "reserve",
        data(){
            return{
                //页面数据
                tableData:[],
                //form表单
                froms:{
                    id:'',
                    order_no:'',
                    name:'',
                    room_id:'',
                    user_id:'',
                    submit_time:'',
                    order_status:'',
                    start_time:'',
                    end_time:''
                },
                //分页的参数
                pageParam: {
                    page: {
                        pageNumber: 1,
                        pageSize: 10,
                        total: 0
                    }
                }
            }
        },
        components:{
            pagination
        },
        mounted() {
            this.getAllOrders();
        },
        methods:{
            getAllOrders(){
                var args = this.forms;
                selectAllOrder(args).then(res =>{
                    if (res.code == 0){
                        var result = res.data;
                        if (result.count > 0){
                            this.tableData =result.data;
                        }
                        //配置分页参数
                        this.pageParam.page.total = result.count;
                        this.pageParam.page.pageNumber = result.page;
                        this.pageParam.page.pageSize = result.size;
                    }
                });
            },
            formatterOrderStatus(row){
                //订单状态(1:预约待审核，2:审核通过，3:订单完成，4：订单取消)
                if (row.order_status == 1){
                    return "预约待审核";
                }else  if (row.order_status == 2){
                    return  "审核通过";
                }else  if (row.order_status == 3){
                    return  "订单完成";
                }else  if (row.order_status == 4){
                    return "订单取消";
                }else {
                    return "其他状态";
                }
            },
            //查看订单详情
            checkOrderDetails(row){
             //获取订单号
               // var  orderNo = row.order_no;
                this.$router.push({path: '/order/details',query:{order: row}})
            }

        }
    }
</script>

<style scoped>

</style>