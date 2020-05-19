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
                 <el-form-item label="类型" prop="lab_type">
                     <el-input size="small" v-model="form.lab_type" auto-complete="off"
                               placeholder="请选择实验室类型"></el-input>
                 </el-form-item>
                 <el-form-item label="行数" prop="row" >
                     <el-input size="small" v-model="form.row" auto-complete="off"
                               placeholder="请输入实验楼"></el-input>
                 </el-form-item>
                 <el-form-item label="列数" prop="col">
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
         <div style="width: 30%;margin-left: 5px;margin-top: 25px ;margin-bottom: 15px">
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
             <el-table-column label="实验室" prop="tower" width="100px"></el-table-column>
             <el-table-column label="实验类型" prop="lab_type" :formatter="formatterType" sortable width="120px"></el-table-column>
             <el-table-column label="实验室地址" prop="lab_address" width="160px" :show-overflow-tooltip="true"></el-table-column>
             <el-table-column label="实验室开放时间" prop="open_time" width="170px" :show-overflow-tooltip="true"></el-table-column>
             <el-table-column label="实验室负责人" prop="manager" width="120px"></el-table-column>
             <el-table-column label="实验室状态" prop="status" :formatter="formatterStatus" sortable width="140px"></el-table-column>
             <el-table-column label="创建时间" prop="create_time" width="160px" sortable :show-overflow-tooltip="true"></el-table-column>
             <el-table-column label="操作" width="460px">
                 <template slot-scope="scope">
                     <el-button  class="filter-item"
                                 size="mini"
                                 type="primary"
                                 icon="el-icon-edit"
                                 @click="handleEditFrom(scope.$index,scope.row)">修改</el-button>
                     <el-button  class="filter-item"
                                 size="mini"
                                 type="primary"
                                 icon="el-icon-edit"
                                 @click="addCourse(scope.row)">添加课程</el-button>
                     <el-button  class="filter-item"
                                 size="mini"
                                 type="primary"
                                 icon="el-icon-edit"
                                 @click="handleEditFrom(scope.$index,scope.row)">查看课程</el-button>
                     <el-button  class="filter-item"
                                 type="danger"
                                 icon="el-icon-delete"
                                 size="mini"
                                 @click="handleDeleteFrom(scope.$index,scope.row)">删除</el-button>
                 </template>
             </el-table-column>
         </el-table>
         <!--添加分页-->
         <pagination :params="pageParam.page" :parentMethod="getLaboratoryRoom"></pagination>
         <!-- 实验室添加课程 -->
         <el-dialog :title="titles" :visible.sync="addCourseInfo" width="30%" @click='closeAddTypeDialog'>
             <el-form label-width="80px" ref="addCourseForm" :model="addCourseForm" :rules="courseRules">
                 <el-form-item label="实验室" prop="tower_room">
                     <el-input size="small" v-model="addCourseForm.tower_room" auto-complete="off"
                               placeholder="请输入实验室类型"></el-input>
                 </el-form-item>
                 <el-form-item label="课程" prop="course_id">
                     <el-select v-model="addCourseForm.course_id" clearable placeholder="请选择">
                         <el-option
                                 v-for="item in courseInfo"
                                 :key="item.id"
                                 :label="item.name"
                                 :value="item.id"
                                 auto-complete="off">
                         </el-option>
                     </el-select>
                 </el-form-item>
                 <el-form-item label="课程开始时间" prop="startTime">
                     <el-date-picker
                             v-model="addCourseForm.startTime"
                             type="datetime"
                             placeholder="选择课程开始日期时间"
                             value-format="yyyy-MM-dd HH:mm:ss"
                             default-time="09:00:00"
                             auto-complete="off">
                     </el-date-picker>
                 </el-form-item>
                 <el-form-item label="课程结束时间" prop="endTime">
                     <el-date-picker
                             v-model="addCourseForm.endTime"
                             type="datetime"
                             placeholder="选择课程结束日期时间"
                             value-format="yyyy-MM-dd HH:mm:ss"
                             default-time="18:00:00"
                             auto-complete="off">
                     </el-date-picker>
                 </el-form-item>
                 <el-form-item label="班级" prop="class">
                     <el-input size="small" v-model="addCourseForm.class" auto-complete="off"
                               placeholder="请输入实验班级"></el-input>
                 </el-form-item>
             </el-form>
             <div slot="footer" class="dialog-footer">
                 <el-button size="small" type="primary" class="title" @click="submitCourseInfoForm('addCourseForm')">
                     保存
                 </el-button>
                 <el-button size="small" @click='closeAddTypeDialog'>取消</el-button>
             </div>
         </el-dialog>
     </div>
</template>

<script>
    import {selectLaboratoryRoom,saveLaboratoryData,selectCourseInfoByLabType,addCourseInfoByLab} from "../../api/request";
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
                addCourseInfo: false,
                courseInfo:[], //课程信息
                //添加课程的from
                addCourseForm:{
                    tower_room:'',
                    lab_room_id:'',
                    course_id:'',
                    startTime:'',
                    endTime:'',
                    class:''
                },
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
                },
                courseRules:{
                    tower_room: [{ required: true, message: '请输入实验室', trigger: 'blur' }],
                    course_id:[{ required: true, message: '请选择课程', trigger: 'blur'}],
                    startTime:[{ required: true, message: '请选择课程开始时间', trigger: 'blur'}],
                    endTime:[{ required: true, message: '请选择课程结束时间', trigger: 'blur'}],
                    class:[{ required: true, message: '请输入实验班级', trigger: 'blur'}]
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
            //添加课程
            addCourse(row){
              this.addCourseInfo = true;
              this.addCourseForm.lab_room_id = row.id;
              this.addCourseForm.tower_room= row.tower;
              this.addCourseForm.course_id ="";
              this.addCourseForm.class ="";
              this.addCourseForm.startTime="";
              this.addCourseForm.endTime="";
              var args = {labType: row.lab_type}
                selectCourseInfoByLabType(args).then(res =>{
                    if (res.code == 0){
                        this.courseInfo = res.data;
                    }
                });
            },
            //提交课程信息
            submitCourseInfoForm(addCourseForm){
                this.$refs[addCourseForm].validate((valid) =>{
                    if (valid){
                        var args={courseId: this.addCourseForm.course_id,layRoomId: this.addCourseForm.lab_room_id,
                            classInfo: this.addCourseForm.class,startTime: this.addCourseForm.startTime,endTime: this.addCourseForm.endTime};
                        addCourseInfoByLab(args).then(res => {
                            if (res.code == 0) {
                                this.$toast.success({title:"成功提示",message:"提交的实验室课程信息成功"});
                            }else {
                                this.$toast.error({title:"错误提示",message:"提交的实验室课程信息失败"});
                            }
                        });
                    }else {
                        this.$toast.error({title:"错误提示",message:"需要填写完页面数据"});
                    }
                })
            },
            //关闭添加课程的模态框
            closeAddTypeDialog(){
                this.addCourseInfo = false;
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
    .el-date-editor.el-input, .el-date-editor.el-input__inner,.el-select{
        width: 100%;
    }
</style>