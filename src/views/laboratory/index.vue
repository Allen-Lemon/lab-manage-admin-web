<template>
     <div>
         <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 20px;margin-top: 20px">
             <el-breadcrumb-item :to="{path: '/index'}">首页</el-breadcrumb-item>
             <el-breadcrumb-item>实验房间管理</el-breadcrumb-item>
         </el-breadcrumb>
         <!--添加弹出框-->
         <el-dialog :title="title" :visible.sync="formVisible" width="30%" @click='closeDialog("edit")' >
             <el-form label-width="80px" ref="form" :model="form" :rules="rules">
                 <el-form-item label="实验室" prop="tower"  v-if="!addLaboratory">
                     <el-input size="small" v-model="form.tower" auto-complete="off"
                               placeholder="请输入实验室"></el-input>
                 </el-form-item>
                 <el-form-item label="实验楼" prop="addTower"  v-if="addLaboratory">
                     <el-input size="small" v-model="form.addTower" auto-complete="off"
                               placeholder="请输入实验楼"></el-input>
                 </el-form-item>
                 <el-form-item label="房间号" prop="room_number" v-if="addLaboratory">
                     <el-input size="small" v-model="form.room_number" auto-complete="off"
                               placeholder="请输入实验室房间号"></el-input>
                 </el-form-item>
                 <el-form-item label="实验类型" prop="lab_type">
                     <el-input size="small" v-model="form.lab_type" auto-complete="off"
                               placeholder="请选择实验室类型"></el-input>
                 </el-form-item>
                 <el-form-item label="实验室行" prop="row" >
                     <el-input size="small" v-model="form.row" auto-complete="off"
                               placeholder="请输入实验楼"></el-input>
                 </el-form-item>
                 <el-form-item label="实验室列" prop="col">
                     <el-input size="small" v-model="form.col" auto-complete="off"
                               placeholder="实验室房间号"></el-input>
                 </el-form-item>
                 <el-form-item label="地址" prop="lab_address">
                     <el-input size="small" v-model="form.lab_address" placeholder="请输入实验室地址"></el-input>
                 </el-form-item>
                 <el-form-item label="开放时间" prop="open_time">
                     <el-input size="small" v-model="form.open_time" placeholder="请输入实验室开放时间"></el-input>
                 </el-form-item>
                 <el-form-item label="负责人" prop="manager">
                     <el-input size="small" v-model="form.manager" placeholder="请输入实验室负责人"></el-input>
                 </el-form-item>
             </el-form>
             <div slot="footer" class="dialog-footer">
                 <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
                 <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('form')">
                     保存
                 </el-button>
             </div>
         </el-dialog>
         <!--添加操作按钮-->
         <div style="width: 25%;margin-left: 5px;margin-top: 5px ;margin-bottom: 5px">
             <el-button
                     class="filter-item"
                     size="mini"
                     type="primary"
                     icon="el-icon-plus"
                     @click="handleEditFrom">
                 新增
             </el-button>
             <el-button
                     class="filter-item"
                     size="mini"
                     type="success"
                     icon="el-icon-edit">
                 修改
             </el-button>
             <el-button
                     slot="reference"
                     class="filter-item"
                     type="danger"
                     icon="el-icon-delete"
                     size="mini">
                 删除
             </el-button>
             <el-button
                     class="filter-item"
                     size="mini"
                     type="warning"
                     icon="el-icon-download">导出</el-button>
         </div>
         <el-table
                 :data="tableData"
                 highlight-current-row
                 style="width: 100%" :cell-style="{padding: 2+'px', fontSize:12+'px'}">
             <el-table-column type="selection" width="55" />
             <el-table-column type="expand">
                 <template slot-scope="props">
                     <el-form label-position="left" inline class="demo-table-expand">
                         <el-form-item label="实验室房间">
                             <span>{{props.row.tower}}</span>
                         </el-form-item>
                         <el-form-item label="实验室负责人">
                             <span>{{props.row.manager}}</span>
                         </el-form-item>
                         <el-form-item label="房间位置总数">
                             <span>{{props.row.countSeat}}</span>
                         </el-form-item>
                         <el-form-item label="可以使用位置总数">
                             <span>{{props.row.accessUseSeat}}</span>
                         </el-form-item>
                         <el-form-item label="已预约的位置总数">
                             <span>{{props.row.type1}}</span>
                         </el-form-item>
                         <el-form-item label="已损坏的位置总数">
                             <span>{{props.row.type2}}</span>
                         </el-form-item>
                     </el-form>
                 </template>
             </el-table-column>
             <el-table-column label="实验室" prop="tower"></el-table-column>
             <el-table-column label="实验类型" prop="lab_type" :formatter="formatterType" sortable></el-table-column>
             <el-table-column label="实验室地址" prop="lab_address"></el-table-column>
             <el-table-column label="实验室开放时间" prop="open_time"></el-table-column>
             <el-table-column label="实验室负责人" prop="manager"></el-table-column>
             <el-table-column label="实验室状态" prop="status" :formatter="formatterStatus" sortable></el-table-column>
             <el-table-column label="创建时间" prop="create_time" sortable></el-table-column>
             <el-table-column label="操作" width="150px">
                 <template slot-scope="scope">
                     <el-button  class="filter-item"
                                 size="mini"
                                 type="primary"
                                 icon="el-icon-edit"
                                 @click="handleEditFrom(scope.$index,scope.row)"></el-button>
                     <el-button  class="filter-item"
                                 type="danger"
                                 icon="el-icon-delete"
                                 size="mini"
                                 @click="handleDeleteFrom(scope.$index,scope.row)"></el-button>
                 </template>
             </el-table-column>
         </el-table>
         <!--添加分页-->
         <pagination :params="pageParam.page" :parentMethod="getLaboratoryRoom"></pagination>
     </div>
</template>

<script>
    import {selectLaboratoryRoom,saveLaboratoryData} from "../../api/request";
    //引入分页组件
  import pagination from "../../components/pagination";
    export default {
        name: "index",
        data(){
            return{
                //实验楼的数据信息
                tableData:[],
                //设置弹出框的标题
                title: '',
                //弹出框是否弹出
                formVisible: false,
                //是否显示loading
                loading: false,
                //添加实验室，显示行列
                addLaboratory: false,
                titles: '',
                //表单数据
                form: {
                    id:'',
                    tower: '',
                    addTower:'',
                    lab_type: '',
                    lab_address: '',
                    row:'',
                    col: '',
                    room_number:'',
                    open_time: '',
                    manager: ''
                },
                //分页的参数
                pageParam: {
                    page: {
                        pageNumber: 1,
                        pageSize: 10,
                        total: 0
                    }
                },
                //表单验证
                rules: {
                    tower: [{ required: true, message: '请输入实验室', trigger: 'blur' }],
                    addTower:[{ required: true, message: '请输入实验楼', trigger: 'blur'}],
                    room_number:[{ required: true, message: '请输入实验室房间号', trigger: 'blur'}],
                    row:[{ required: true, message: '请输入实验室行数', trigger: 'blur'}],
                    col:[{ required: true, message: '请输入实验室列数', trigger: 'blur'}],
                    lab_type:[{ required: true, message: '请输入实验类型', trigger: 'blur'}],
                    lab_address:[{ required: true, message: '请输入实验室地址', trigger: 'blur'}],
                    open_time:[{ required: true, message: '请输入实验室开放时间', trigger: 'blur'}],
                    manager:[{ required: true, message: '请输入实验室负责人', trigger: 'blur'}]
                }
            }
        },
        mounted() {
               this.getLaboratoryRoom();
        },
        components:{
            pagination
        },
        methods:{
            //获取所有的实验室房间信息
            getLaboratoryRoom(){
                //设置参数
                var ages ={pageNumber: this.pageParam.page.pageNumber,
                                        pageSize: this.pageParam.page.pageSize};
                selectLaboratoryRoom(ages).then(res =>{
                //请求成功
                    if (res.code == 0){
                        console.log(JSON.stringify(res.data))
                        var result = res.data;
                        if (result.count  > 0){
                            //请求的数据加入带vue中渲染
                            this.tableData =result.data;
                        }else {
                            //当前没有实验室的信息
                            this.$toast.info({
                                title:"提示",
                                message: "当前没有实验室信息"
                            })
                        }
                        //配置分页信息
                        this.pageParam.page.pageSize =result.size;
                        this.pageParam.page.pageNumber =result.page;
                        this.pageParam.page.total = result.count;
                    }
                });
            },
            //关闭弹出框
            closeDialog(val){
                this.formVisible = false;
            },
            //编辑或者添加显示界面
            handleEditFrom(index,row){
                this.formVisible=true;
                if (row != undefined && row != 'undefined') {
                                this.title = "编辑实验室";
                                this.addLaboratory =false;
                                this.form.id =row.id;
                                this.form.tower = row.tower;
                                this.form.lab_type =  row.lab_type;
                                this.form.lab_address = row.lab_address;
                                this.form.row =row.row;
                                this.form.col =row.col;
                                this.form.manager = row.manager;
                                this.form.open_time = row.open_time;
                }else {
                    this.title = "添加实验室";
                    this.addLaboratory = true;
                    this.form.id = '';
                    this.form.tower ='';
                    this.form.lab_type =  '';
                    this.form.lab_address = '';
                    this.form.row ='';
                    this.form.col ='';
                    this.form.manager = '';
                    this.form.open_time = '';
                }
            },
            //删除form
            handleDeleteFrom(index,row){

            },
            //编辑或者添加实验室的弹出框中提交按钮
            submitForm(from){
                this.$refs[from].validate((valid) =>{
                    if (valid){
                        saveLaboratoryData(this.form).then(res =>{
                                if (res.code == 0){
                                    this.$toast.success({title:"成功提示",message:"实验室数据成功更新"});
                                    this.formVisible =false;
                                    this.getLaboratoryRoom();
                                }
                        });
                    }else {
                        this.$toast.error({title:"错误提示",message:"需要填写完页面数据"});
                    }
                });

            },
            //格式化表格中实验类型的参数
            formatterType(rows,index){
                if (rows.lab_type == 1){
                    return "软件类";
                }else if (rows.lab_type == 2) {
                    return "化学类";
                }else  if (rows.lab_type == 3){
                    return "物理类";
                }else {
                    return "其他类";
                }
            },
            //格式化使用类型
            formatterStatus(rows, index){
                if (rows.status == 0){
                    return '启用';
                }else if (rows.s == 1){
                    return '维修中';
                }else {
                    return '禁用';
                }
            }
        }
    }
</script>
<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 180px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
</style>
<style scoped>

</style>