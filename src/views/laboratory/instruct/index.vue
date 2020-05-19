<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 20px;margin-top: 20px">
            <el-breadcrumb-item :to="{path: '/index'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>实验仪器管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row  style="margin-left: 10px; margin-top: 25px " :gutter="20">
        <!--实验室类型管理-->
        <el-col :xs="20" :sm="20" :md="11" :lg="11" :xl="9">
            <el-card class="box-card" >
                <div slot="header" class="clearfix">
                    <span>实验类型</span>
                    <el-button
                            class="filter-item"
                            size="mini"
                            style="float: right;padding: 4px 10px"
                            type="primary"
                            icon="el-icon-plus"
                            @click="addLabsType">新增</el-button>
                </div>
                <el-table    highlight-current-row style="width: 100%;" :data="labsTypeData"  :row-style="{height: 0+ 'px'}" :cell-style="{padding: 0+'px', fontSize:10+'px'}"
                             @current-change = "handleCurrentChange">
                    <el-table-column type="selection" width="55" />
                    <el-table-column     prop="lab_type" label="实验室类型"/>
                    <el-table-column    prop="lab_type_code" label="实验类型编码"/>
                    <el-table-column prop="lab_type_number" label="实验室类型编号"/>
                    <el-table-column    prop="lab_type_description" label="描述"/>
                    <el-table-column  label="操作"  align="center"
                                      fixed="right" width="150px">>
                        <template slot-scope="scope">
                            <el-button  class="filter-item"
                                        size="mini"
                                        type="primary"
                                        icon="el-icon-edit"
                                        @click="addLabsType(scope.$index,scope.row)"></el-button>
                            <el-button  class="filter-item"
                                        type="danger"
                                        icon="el-icon-delete"
                                        size="mini"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
             </el-card>
         </el-col>
                <el-col  :xs="24" :sm="24" :md="10" :lg="13" :xl="15" style="margin-bottom: 10px">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span class="role-span">仪器列表</span>
                            <el-button
                                    class="filter-item"
                                    size="mini"
                                    style="float: right;padding: 4px 10px"
                                    type="primary"
                                    icon="el-icon-plus"
                                    @click="addInstructData">新增</el-button>
                        </div>
                        <el-table    highlight-current-row style="width: 100%;" :data="tableData"  :row-style="{height: 0+ 'px'}" :cell-style="{padding: 0+'px', fontSize:5+'px'}">
                            <el-table-column prop="name" label="仪器名"></el-table-column>
                            <el-table-column prop="instruct_code" label="仪器编码"></el-table-column>
                            <el-table-column prop="instruct_number" label="仪器编号"></el-table-column>
                            <el-table-column prop="number" label="仪器数量"></el-table-column>
                            <el-table-column prop="lab_type_number" label="所属实验类型"></el-table-column>
                            <el-table-column prop="manager" label="负责人"></el-table-column>
                            <el-table-column prop="c_time" label="创建时间"></el-table-column>
                            <el-table-column  label="操作"  align="center"
                                              fixed="right" width="150px">>
                                <template slot-scope="scope">
                                    <el-button  class="filter-item"
                                                size="mini"
                                                type="primary"
                                                icon="el-icon-edit"
                                                @click="addInstruct(scope.$index,scope.row)"></el-button>
                                    <el-button  class="filter-item"
                                                type="danger"
                                                icon="el-icon-delete"
                                                size="mini"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--添加分页-->
                        <pagination :params="pageParam.page" :parentMethod="handleCurrentChange"></pagination>
                    </el-card>
                </el-col>
        </el-row>
        <!-- 实验室类型的添加或者编辑的模态框 -->
        <el-dialog :title="titles" :visible.sync="addLabsTypeDisplay" width="30%" @click='closeAddTypeDialog'>
            <el-form label-width="80px" ref="addForm" :model="addForm" :rules="typeRules">
                <el-form-item label="类型" prop="lab_type">
                    <el-input size="small" v-model="addForm.lab_type" auto-complete="off"
                              placeholder="请输入实验室类型"></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="lab_type_code">
                    <el-input size="small" v-model="addForm.lab_type_code" auto-complete="off"
                              placeholder="请输入实验室编码"></el-input>
                </el-form-item>
                <el-form-item label="编号" prop="lab_type_number">
                    <el-input size="small" v-model="addForm.lab_type_number" auto-complete="off"
                              placeholder="请输入实验室编号"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="lab_type_description">
                    <el-input size="small" v-model="addForm.lab_type_description" placeholder="请输实验室描述"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" class="title" @click="submitTypeForm('addForm')">
                    保存
                </el-button>
                <el-button size="small" @click='closeAddTypeDialog'>取消</el-button>
            </div>
        </el-dialog>

        <!-- 添加实验仪器的模态框 -->
        <el-dialog :title="instructTitle" :visible.sync="addInstructVisible" width="30%" @click='closeAddInstructDialog'>
            <el-form label-width="80px" ref="instructForm" :model="instructForm" :rules="rules">
                <el-form-item label="仪器名" prop="name">
                    <el-input size="small" v-model="instructForm.name" auto-complete="off"
                              placeholder="请输入仪器名"></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="instruct_code">
                    <el-input size="small" v-model="instructForm.instruct_code" auto-complete="off"
                              placeholder="请输入仪器编码"></el-input>
                </el-form-item>
                <el-form-item label="编号" prop="instruct_number">
                    <el-input size="small" v-model="instructForm.instruct_number" auto-complete="off"
                              placeholder="请输入仪器编号"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="number">
                    <el-input size="small" v-model="instructForm.number" placeholder="请输入仪器数量"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="lab_type_number">
                    <el-input size="small" v-model="instructForm.lab_type_number" placeholder="请输入所属实验类型"></el-input>
                </el-form-item>
                <el-form-item label="负责人" prop="manager">
                    <el-input size="small" v-model="instructForm.manager" placeholder="请输入仪器负责人"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" class="title" @click="submitInstructForm('instructForm')">
                    保存
                </el-button>
                <el-button size="small" @click='closeAddInstructDialog'>取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {selectLabType,saveLaboratoryType,selectAllInstruct} from "../../../api/request";
    import  pagination from "../../../components/pagination"
    export default {
        name: "index",
        data(){
            return{
                //实验的类型表单
                labsTypeData:[],
                tableData:[],
                //添加显示实验室类型的模态框
                addLabsTypeDisplay:false,
                //实验类型的模态框的标题
                titles:'',
                //添加实验仪器
                instructTitle:'',
                addInstructVisible:false,
                //添加实验类型的from
                addForm:{
                    id:'',
                    lab_type:'',
                    lab_type_code:'',
                    lab_type_number: '',
                    lab_type_description:''
                },
                instructForm:{
                    id:'',
                    name:'',
                    instruct_code:'',
                    instruct_number:'',
                    number: '',
                    lab_type_number:'',
                    manager:''
                },
                rules: {
                    name: [{ required: true, message: '请输入仪器名称', trigger: 'blur' }],
                    instruct_code:[{ required: true, message: '请输入仪器编码', trigger: 'blur'}],
                    instruct_number:[{ required: true, message: '请输入仪器编号', trigger: 'blur'}],
                    number: [{ required: true, message: '请输入仪器数量', trigger: 'blur' }],
                    lab_type_number:[{ required: true, message: '请输入所属实验类型', trigger: 'blur'}],
                    manager:[{ required: true, message: '请输入仪器负责人', trigger: 'blur'}]
                },
                typeRules: {
                    lab_type: [{ required: true, message: '请输入实验类型', trigger: 'blur' }],
                    lab_type_code:[{ required: true, message: '请输入类型编码', trigger: 'blur'}],
                    lab_type_number:[{ required: true, message: '请输入类型编号', trigger: 'blur'}],
                    lab_type_description: [{ required: true, message: '请输入类型描述', trigger: 'blur' }]
                },
                //实验仪器的分页数据
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
            this.getAllLabType();
            this.handleCurrentChange();
        },
        methods:{
            //获取所有的实验楼的实验类型
            getAllLabType(){
                selectLabType(null).then(res =>{
                    if (res.code ==0){
                        var  result = res.data;
                        this.labsTypeData = result.data;
                    }
                });
            },
            //添加实验室类型
            addLabsType(index,row){
                this.addLabsTypeDisplay = true;
                //编辑实验室
                if (row != undefined && row != 'undefined'){
                    this.titles = "修改实验室类型";
                    this.addForm.lab_type = row.lab_type;
                    this.addForm.id =row.id;
                    this.addForm.lab_type_code = row.lab_type_code;
                    this.addForm.lab_type_number = row.lab_type_number;
                    this.addForm.lab_type_description = row.lab_type_description;
                }else {
                    this.titles = "添加实验室类型";
                    this.addForm.id = '';
                    this.addForm.lab_type = '';
                    this.addForm.lab_type_code = '';
                    this.addForm.lab_type_number =  '';
                    this.addForm.lab_type_description =  '';
                }
            },  //关闭添加实验类型的模态框
            closeAddTypeDialog(){
                this.addLabsTypeDisplay = false;
            },
            closeAddInstructDialog(){
              this.addInstructVisible = false;
            },
            //添加或者编辑实验室类型的数据提交
            submitTypeForm(form){
                this.$refs[form].validate((valid) =>{
                    if (valid){
                        saveLaboratoryType(this.addForm).then(res =>{
                            if (res.code == 0){
                                this.$toast.success({title:"成功提示",message:"实验室类型数据成功更新"});
                                this.addLabsTypeDisplay =false;
                                this.getLaboratoryRoom();
                            }else {
                                this.$toast.error({title:"错误提示",message:"实验室类型数据更新失败"});
                            }
                        });
                    }else {
                        this.$toast.info({title:"信息提示",message:"需要填写完页面数据"});
                    }
                });
            },
            //查找实验仪器
            handleCurrentChange(val){
                var args;
                if (val != undefined && val != 'undefined'){
                     args ={lab_type_number: val.lab_type_number,pageNumber: this.pageParam.page.pageNumber,pageSize:this.pageParam.page.pageSize};
                }
                selectAllInstruct(args).then(res => {
                    if (res.code == 0) {
                        var result =  res.data;
                        //当总条数不为0时
                        if (result.count > 0){
                            this.tableData = result.data;
                        }else {
                            this.tableData ='';
                        }
                        //设置实验仪器的分页信息
                        this.pageParam.page.pageNumber =result.page;
                        this.pageParam.page.pageSize = result.size;
                        this.pageParam.page.total = result.count;
                    }
                });
            },
            //添加实验仪器
            addInstruct(index,row){

            },
            addInstructData(){
               //显示实验仪器界面
                this.addInstructVisible = true;
                this.instructTitle = "添加实验仪器";

            },
            //提交实验仪器的数据
            submitInstructForm(form){
                this.$refs[form].validate((valid) => {
                    if (valid){

                    }else {
                        this.$toast.info({title:"信息提示",message:"需要填写完页面数据"});
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>