<template>
    <div class="app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/index'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="15" style="margin-left: 0px;margin-right: 0px; margin-top: 20px">
            <!--角色管理-->
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span class="role-span">角色列表</span>
                        <el-button
                                class="filter-item"
                                size="mini"
                                style="float: right;padding: 4px 10px"
                                type="primary"
                                icon="el-icon-plus"
                                @click="addRole">新增</el-button>
                    </div>
                    <!--@selection-change=line-height"selectionChangeHandler"-->
                    <!--  @current-change处理当前选中行的，@selection-change是处理前面勾选的多选-->
                    <el-table    highlight-current-row style="width: 100%;" :data="tableData"  :row-style="{height: 0+ 'px'}" :cell-style="{padding: 0+'px', fontSize:5+'px'}"
                    @current-change = "handleCurrentChange">
                        <el-table-column type="selection" width="55" />
                        <el-table-column   prop="name" label="名称"/>
                <!--        <el-table-column     prop="dataScope" label="数据权限"/>-->
                        <el-table-column    prop="code" label="角色权限"/>
                        <el-table-column    prop="level" label="角色级别"/>
                    <!--    <el-table-column    :show-overflow-tooltip="true" prop="remark" label="描述"/>-->
                        <el-table-column   :show-overflow-tooltip="true" width="135px"
                                         prop="createTime" label="创建日期">
                     <!--       <template slot-scope="scope">
                                <span>{{ parseTime(scope.row.createTime) }}</span>
                            </template>-->
                        </el-table-column>
                        <el-table-column  label="操作" width="300px" align="center"
                                         fixed="right">
                            <template slot-scope="scope">
                                <el-button  class="filter-item"
                                            size="mini"
                                            type="primary"
                                            icon="el-icon-edit"
                                            @click="updateRole(scope.row)"></el-button>
                                <el-button  class="filter-item"
                                            type="danger"
                                            icon="el-icon-delete"
                                            size="mini"
                                            @click="deleteRole(scope.row)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--添加分页-->
                    <pagination :params="pageParam.page" :parentMethod="getAllRole"></pagination>
                </el-card>
            </el-col>
            <!-- 菜单授权 -->
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
                            <span class="role-span">菜单分配</span>
                        </el-tooltip>
                        <el-button
                                :disabled="!showButton"
                                :loading="menuLoading"
                                icon="el-icon-check"
                                size="mini"
                                style="float: right; padding: 6px 9px"
                                type="primary"
                                @click="save"
                                >保存
                        </el-button>
                        <!-- @click="saveMenu"-->
                    </div>
                    <el-tree
                            ref="menu"
                            :data="menus"
                            :default-checked-keys="menuIds"
                            :default-expanded-keys="menuIds"
                            node-key="id"
                            :props="defaultProps"
                            @check = "checkedMenu"
                            accordion
                            show-checkbox
                    />
                </el-card>
            </el-col>
        </el-row>

        <!-- 添加实验仪器的模态框 -->
        <el-dialog :title="roleTitle" :visible.sync="addRoleVisible" width="30%" @click='closeAddRoleDialog'>
            <el-form label-width="80px" ref="addRoleForm" :model="addRoleForm" :rules="rules">
                <el-form-item label="名称" prop="name">
                    <el-input size="small" v-model="addRoleForm.name" auto-complete="off"
                              placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="code">
                    <el-input size="small" v-model="addRoleForm.code" auto-complete="off"
                              placeholder="请输入角色编码"></el-input>
                </el-form-item>
                <el-form-item label="等级" prop="level">
                    <el-input size="small" v-model="addRoleForm.level" auto-complete="off"
                              placeholder="请输入角色等级"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" class="title" @click="submitRoleForm('addRoleForm')">
                    保存
                </el-button>
                <el-button size="small" @click='closeAddRoleDialog'>取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import  {queryAllRole,queryAllResource,selectedMenu,addRoleAuth,addOrUpdateRoleInfo} from "../../api/request";
    import pagination  from "../../components/pagination";
    export default {
        name: "role",
        data(){
                        //角色表格中的数据
                       return {
                               tableData:[], //角色表格中的数据
                               menus:[],  //菜单栏的数据
                               menuIds:[], //该角色拥有的菜单权限
                              //菜单上面的按钮是否隐藏跟有loading
                               showButton:false,
                                menuLoading: false,
                            //菜单el-tree中定义的节点数据名称
                           defaultProps:{
                                  children: "children",
                                  label: "name"
                              },
                           addRoleForm:{
                               name: '',
                               code: '',
                               level: ''
                           },
                           rules: {
                               name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
                               code:[{ required: true, message: '请输入角色编码', trigger: 'blur'}],
                               level:[{ required: true, message: '请输入角色等级', trigger: 'blur'}]
                           },
                           roleTitle:'', //添加角色的标题
                           addRoleVisible:false,
                               //存储当前角色的id
                               roleId: null,
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
        //注册组件
        components: {
            //分页组件
            pagination
        },
        mounted() {
            this.getAllRole();
            this.getMenuResource();
        },
        //在这个页面加载的时候执行
        created() {},

        methods: {
            //获取所有角色
            getAllRole(){
                var args =  {pageNumber:this.pageParam.page.pageNumber,
                    pageSize: this.pageParam.page.pageSize };
                queryAllRole(args).then(res => {
                    console.log(JSON.stringify(args))
                    //请求成功
                    if (res.code == 0){
                        //查找的当前数据不为空
                        var data = res.data;
                        //添加分页数据
                        this.pageParam.page.pageNumber = data.page;
                        this.pageParam.page.pageSize = data.size;
                        this.pageParam.page.total = data.count;
                        //取分页里面的数据
                        if (data.data.length  > 0){
                            this.tableData = data.data;
                        }else {
                            this.$toast.error({
                                title: "提示",
                                message: "当前没有角色",
                                timeout:2000
                            })
                        }
                    }else {
                        console.log("请求错误")}
                })
            },
            //获取系统的菜单
                getMenuResource(){
                        queryAllResource(null).then(res => {
                            if (res.code == 0){
                                //请求成功，获取菜单信息
                                var data = res.data;
                                this.menus = data;
                            }else {
                              console.log(res.message);
                            }
                        });
                },
                //当前行选中的时候
            handleCurrentChange(val){
                //获取当前选中行的角色id
                var param ={roleId:   val.id }
                //设置本页面的roleId
                this.roleId  = val.id;
                   selectedMenu(param).then(res =>{
                         if (res.code == 0){
                             //清空上次选择的菜单
                             this.$refs.menu.setCheckedKeys([]);
                             this.menuIds = res.data;
                         }else {
                             console.log("当前角色没有任何权限")
                         }
                   });
            },
            //当对应角色的菜单的复选框被点击
             checkedMenu(data,checkedVal){
                //这个复选框发生变化时，显示提交按钮
                this.showButton = true;
             },
             //当点击菜单上面提交按钮
            save(){
                //获取选中跟半选中的菜单节点
                var checkedKeys =  this.$refs.menu.getCheckedKeys();
                var  halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
                var  arr = [].concat(halfCheckedKeys,checkedKeys);
                var  params = {roleId: this.roleId,resourceIds:JSON.stringify(arr)};
                addRoleAuth(params).then(res => {
                    if (res.code == 0){
                        this.$toast.success({
                            title: "成功提示",
                            message: "角色的权限更新成功",
                            timeout: 1000
                        })
                    }else {
                        //角色添加权限失败
                        this.$toast.error({
                            title:"错误提示",
                            message: "角色权限更改失败",
                            timeout:1000
                        })
                    }
                })
            },
            //添加角色
            addRole(){
                this.roleTitle = "添加角色";
                this.addRoleVisible = true;
                this.addRoleForm.name = '';
                this.addRoleForm.code = '';
                this.addRoleForm.level = '';
            },
            //关闭弹出框
            closeAddRoleDialog(){
                this.addRoleVisible = false;
            },
            //提交添加的角色
            submitRoleForm(form){
                this.$refs[form].validate((valid) =>{
                    if (valid){
                        var params = this.addRoleForm;
                        addOrUpdateRoleInfo(params).then(res => {
                            var info = res.message;
                            if (res.code == 0){
                                this.$toast.success({title:"成功提示",message: info});
                                this.addRoleVisible = false;
                                this.getAllRole();
                            }else {
                                this.$toast.error({title:"",me})
                                this.$toast.error({title:"失败提示",message: info});
                            }
                        });
                    }else {
                        this.$toast.info({title:"信息提示",message:"需要填写完页面数据"});
                    }
                });

            },
            //修改角色信息
            updateRole(row){
                this.addRoleVisible = true;
                this.roleTitle = "修改角色信息";
                this.addRoleForm.name = row.name;
                this.addRoleForm.code = row.code;
                this.addRoleForm.level = row.level;
            },
            deleteRole(index){

            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .role-span {
        font-weight: bold;
        color: #303133;
        font-size: 15px;
    }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    /deep/ .el-input-number .el-input__inner {
        text-align: left;
    }
    element.style{
        margin-right: 5px;
    }
    .el-form-item__content {
        margin-left: 90px;
    }
</style>