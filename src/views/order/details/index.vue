<template>
    <div>
        <div>
            <el-steps :active="order.status" finish-status="success" align-center>
                <el-step title="提交订单" :description="formatTime(order.submit_time)"></el-step>
                <el-step title="订单审核" :description="formatTime(order.audit_time)"></el-step>
                <el-step title="审核通过,实验进行中" :description="formatTime(order.complete_time)"></el-step>
                <el-step title="实验完成" :description="formatTime(order.complete_time)"></el-step>
            </el-steps>
        </div>
        <el-card shadow="never" style="margin-top: 15px">
            <div class="operate-container">
                <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
                <span class="color-danger">当前订单状态：{{order.status | formatStatus}}</span>
                <div class="operate-button-container" v-show="order.status===1">
                    <el-button size="mini" >通过审核</el-button>
                    <el-button size="mini">不通过审核</el-button>
                </div>
                <div class="operate-button-container" v-show="order.status===2 || order.status===3">
                    <el-button size="mini" >查看信息</el-button>
                    <el-button size="mini">删除订单</el-button>
                    <el-button size="mini" >备注订单</el-button>
                </div>
                <div style="margin-top: 20px">
                    <!--<svg-icon icon-class="marker" style="color: #606266"></svg-icon>-->
                    <span class="font-small">基本信息</span>
                </div>
                <div class="table-layout">
                    <el-row>
                        <el-col :span="4" class="table-cell-title">订单编号</el-col>
                        <el-col :span="4" class="table-cell-title">房间号</el-col>
                        <el-col :span="4" class="table-cell-title">预约位置个数</el-col>
                        <el-col :span="4" class="table-cell-title">实验开始时间</el-col>
                        <el-col :span="4" class="table-cell-title">实验结束时间</el-col>
                        <el-col :span="4" class="table-cell-title">实验类型类型</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" class="table-cell">{{order.orderNO}}</el-col>
                        <el-col :span="4" class="table-cell">{{order.tower}}</el-col>
                        <el-col :span="4" class="table-cell">{{order.seatNumber}}</el-col>
                        <el-col :span="4" class="table-cell">{{order.startTime}}</el-col>
                        <el-col :span="4" class="table-cell">{{order.endTime}}</el-col>
                        <el-col :span="4" class="table-cell">{{order.labType}}</el-col>
                    </el-row>
                </div>
                <div style="margin-top: 20px">
                    <!--<svg-icon icon-class="marker" style="color: #606266"></svg-icon>-->
                    <span class="font-small">实验用户信息</span>
                </div>
                <div class="table-layout">
                    <el-row>
                        <el-col :span="6" class="table-cell-title">用户名</el-col>
                        <el-col :span="6" class="table-cell-title">姓名</el-col>
                        <el-col :span="6" class="table-cell-title">电话</el-col>
                        <el-col :span="6" class="table-cell-title">邮箱</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" class="table-cell">{{userInfo.username}}</el-col>
                        <el-col :span="6" class="table-cell">{{userInfo.realName}}</el-col>
                        <el-col :span="6" class="table-cell">{{userInfo.phone}}</el-col>
                        <el-col :span="6" class="table-cell">{{userInfo.email}}</el-col>
                    </el-row>
                </div>
                <div style="margin-top: 20px">
                 <!--   <svg-icon icon-class="marker" style="color: #606266"></svg-icon>-->
                    <span class="font-small">商品信息</span>
                </div>
                <el-table  ref="InstructTable" :data="InstructTable"  style="width: 100%;margin-top: 20px" >
                    <el-table-column label="仪器图片" width="120" align="center">
                        <template slot-scope="scope">
                            <img :src="scope.row.instruct_image" style="height: 80px">
                        </template>
                    </el-table-column>
                    <el-table-column label="仪器名称" prop="instructName" align="center">
                    </el-table-column>
                    <el-table-column label="仪器编码" width="120"  prop="instruct_code" align="center">
                    </el-table-column>
                    <el-table-column label="属性" width="120"  prop="lab_type" align="center"/>
                    <el-table-column label="数量" width="120" align="center">
                        <template slot-scope="scope">
                            {{scope.row.number}}
                        </template>
                    </el-table-column>
                    <el-table-column label="仪器管理人员" width="120" prop="manager" align="center"/>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {selectOrderDetails,selectInstructByOrderNo} from "../../../api/request";
    export default {
        name: "index",
        data(){
           return{
               InstructTable:[],//订单下实验仪器信息
             order:{
                 orderNO:'', //订单号
                 status:'', //订单状态     //显示步骤条
                 submit_time:'',//订单提交的时间
                 audit_time:'', //订单审核的时间
                 complete_time:'',//订单完成的时间
                 tower:'', //实验房间
                 seatNumber:'',//预约的走位个数
                 startTime:'',//实验开始时间
                 endTime:'',//实验结束时间
                 labType:'',//实验类型
                 orderName:'',//订单名称也是实验名称
             },
               userInfo:{
                 username:'', //用户名
                   realName:'', //姓名
                   phone:'',//电话
                   email:'',//邮箱
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
        methods:{
            getOrder(){
                //"o"name":"镁燃烧的实验","id":1,"tower_room":"A3_2-10","username":"allen3
                var  order =this.$route.query.order;
                console.log("订单数据"+JSON.stringify(order))
               this.order.status =order.order_status;
                this.order.orderNO =order.order_no;
                this.order.tower = order.tower_room
                this.order.submit_time = order.submit_time;
                this.order.startTime = order.start_time;
                this.order.endTime = order.end_time;
                this.order.orderName =order.name;
            },
            selectOrderDetailsByOrderNo(){
                //用订单编号查询订单详情
                var args ={orderNo: this.order.orderNO};
                selectOrderDetails(args).then(res =>{
                    if (res.code == 0){
                      var result = res.data;
                      this.userInfo.username = result.userInfo.username;
                      this.userInfo.realName = result.userInfo.real_name;
                      this.userInfo.phone =result.userInfo.phone;
                      this.userInfo.email = result.userInfo.email;
                    }
                });
            },
            //查询此订单使用啦多少仪器
            getInstructTable(){
                var args={orderNo: this.order.orderNO,pageNumber:this.pageParam.page.pageNumber,pageSize:this.pageParam.page.pageSize}
                selectInstructByOrderNo(args).then(res =>{
                    var result =res.data;
                if (res.code == 0){
                    this.InstructTable = result.data;
                }
                //添加分页的数据
                    this.pageParam.page.pageNumber = result.page;
                    this.pageParam.page.pageSize = result.size;
                    this.pageParam.page.total = result.count;
                });
            },
            formatTime(time) {
                if (time == null || time === '') {
                    return '';
                }
            }
        },
        filters:{
            formatStatus(value) {
                if (value === 0) {
                    return '提交实验订单';
                } else if (value === 1) {
                    return '等待审核';
                } else if (value === 2) {
                    return '审核通过';
                } else if (value === 3) {
                    return '实验完成';
                } else if (value === 4) {
                    return '审核未通过';
                } else {
                    return '其他类型订单';
                }
            }
        },
        mounted() {
            this.selectOrderDetailsByOrderNo();
            this.getInstructTable();
        },
        created() {
            this.getOrder();
        }
    }
</script>

<style scoped>
    .detail-container {
        width: 80%;
        padding: 20px 20px 20px 20px;
        margin: 20px auto;
    }

    .operate-container {
        background: #F2F6FC;
        height: 80px;
        margin: -20px -20px 0;
        line-height: 80px;
    }

    .operate-button-container {
        float: right;
        margin-right: 20px
    }

    .table-layout {
        margin-top: 20px;
        border-left: 1px solid #DCDFE6;
        border-top: 1px solid #DCDFE6;
    }

    .table-cell {
        height: 60px;
        line-height: 40px;
        border-right: 1px solid #DCDFE6;
        border-bottom: 1px solid #DCDFE6;
        padding: 10px;
        font-size: 14px;
        color: #606266;
        text-align: center;
        overflow: hidden;
    }

    .table-cell-title {
        border-right: 1px solid #DCDFE6;
        border-bottom: 1px solid #DCDFE6;
        padding: 10px;
        background: #F2F6FC;
        text-align: center;
        font-size: 14px;
        color: #303133;
    }
</style>