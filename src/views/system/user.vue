<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 20px;margin-top: 20px">
            <el-breadcrumb-item :to="{path: '/index'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!--添加操作按钮-->
        <div style="width: 23%;margin-left: 5px;margin-top: 25px ;margin-bottom: 15px">
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

        <!--stripe：可以设置带斑马纹的表格，更容易区分两行数据-->
              <el-table :data="tableData"   highlight-current-row
                        style="width: 100%" stripe >
                  <el-table-column type="selection" width="55" />
                  <el-table-column type="number" label="编号" width="100"></el-table-column>
                  <el-table-column prop="username" label="用户名" width="120"></el-table-column>
                  <el-table-column prop="realName" label="真实姓名" width="150"></el-table-column>
                  <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
                  <el-table-column prop="sex" label="性别" :formatter="formatSex" width="92"></el-table-column>
                  <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
                  <el-table-column prop="updateTime" label="修改时间" width="240"></el-table-column>
                  <el-table-column label="状态" sortable prop="status"  width="240">
                      <template slot-scope="scope">
                          <el-switch
                                  v-model="scope.row.status ==0  ? show:nshow"
                                  active-color="#00A854"
                                  inactive-color="#F04134"
                                  @change="userStatusChange(scope.$index,scope.row)"/>
                      </template>
                  </el-table-column>
                  <el-table-column label="操作" width="150">
                      <template slot-scope="scope">
                          <el-button
                                  size="small"
                                  type="default"
                                  icon="el-icon-edit"
                                  @click="handleEdit(scope.$index,scope.row)">
                          </el-button>
                          <el-button
                                  size="small"
                                  type="danger"
                                  icon="el-icon-delete-solid"
                                  @click="handleDelete(scope.$index, scope.row)">
                          </el-button>
                      </template>
                  </el-table-column>
              </el-table>
        <!--添加分页-->
        <pagination :params="pageParam.page" :parentMethod="getUserData"></pagination>
        <!-- 用户编辑界面 -->
        <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
            <el-form label-width="80px" ref="editForm" :model="editForm">
                <el-form-item label="用户名" prop="username">
                    <el-input size="small" v-model="editForm.username" auto-complete="off"
                              placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realName">
                    <el-input size="small" v-model="editForm.realName" auto-complete="off"
                              placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input size="small" v-model="editForm.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮件" prop="email">
                    <el-input size="small" v-model="editForm.email" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>
                <el-row>
                           <el-col style="width: 50%">
                               <el-form-item label="性别">
                                   <el-radio-group v-model="editForm.sex">
                                       <el-radio  label="0">男</el-radio>
                                       <el-radio  label="1">女</el-radio>
                                   </el-radio-group>
                               </el-form-item>
                           </el-col>
                                <el-col style="width: 50%">
                                    <el-form-item label="状态"  >
                                        <el-radio-group v-model="editForm.status">
                                            <el-radio  label="0">激活</el-radio>
                                            <el-radio  label="1">禁用</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                </el-row>
                <el-form-item style="margin-bottom: 0;" label="角色" prop="roles">
                    <el-select
                            v-model="editForm.roles"
                            style="width: 437px"
                            multiple
                            placeholder="请选择"
                    >
                        <el-option
                                v-for="item in roles"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <!--   @remove-tag="deleteTag"
                            @change="changeRole"-->
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
                <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">
                    保存
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {queryUserData,querySysAllRole,queryUserHavaRole} from "../../api/request";
    import pagination from "../../components/pagination";
    export default {
        name: "user",
        data() {
            return {
                //表格显示的数据
                tableData: [],
                editFormVisible: false, //控制编辑页面的显示与隐藏
                loading: false, //是显示加载
                title: '编辑用户',
                show: true,  //设置用户状态的switch显示
                nshow: false,
                // 编辑与添加
                editForm: {
                    userId: '',
                    username: '',
                    realName: '',
                    phone: '',
                    email: '',
                    sex: '',
                    role:[],
                },
                //编辑用户在弹出框中添加角色的信息
                roles:[],
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
        components: {
            /* page,*/
            pagination
        },
        mounted() {
            this.getUserData()
        },
        //组件加载创建的时候请求创建数据
       /* created() {
            //组件加载的时候获取用户数据
            this.getUserData();
        },*/
        methods: {
            //获取所有的用户信息
            getUserData() {
                queryUserData(this.pageParam.page).then(res => {
                    //返回的data
                    if (res.code == 0) {
                        var data = res.data;
                        this.tableData = data.data;
                        this.pageParam.page.pageNumber = data.page;
                        this.pageParam.page.pageSize = data.size;
                        this.pageParam.page.total = data.count;
                    } else {
                        //请求用户数据失败
                        this.$toast.error({
                            title: '错误提示',
                            message: '获取用户管理数据失败',
                            timeout: 5000
                        });
                    }
                })
            },

            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true
                //获取系统中所有的角色
                querySysAllRole(null).then(res => {
                    //查询所有角色成功
                    if (res.code == 0){
                        this.roles =res.data
                    }else {
                        console.log("查询所有角色失败")
                    }
                });
                if (row != undefined && row != 'undefined') {
                //查询当前用户用于的角色
                    console.log(row)
                    var args ={userId:  row.uid};
                    console.log(args)
                    queryUserHavaRole(args).then(res =>{
                        console.log(res);
                    });
                    this.title = '修改用户'
                    this.editForm.uid = row.uid
                    this.editForm.username = row.username
                    this.editForm.realName = row.realName
                    this.editForm.phone = row.phone
                    this.editForm.email = row.email
                    this.editForm.sex = row.sex
                } else {
                    this.title = '添加用户'
                    this.editForm.uid = ''
                    this.editForm.username = ''
                    this.editForm.realName = ''
                    this.editForm.phone = ''
                    this.editForm.email = ''
                    this.editForm.sex = ''
                }
            },
            // 关闭编辑、增加弹出框
            closeDialog(dialog) {
                if (dialog == 'edit') {
                    this.editFormVisible = false
                } else if (dialog == 'perm') {
                    this.dataAccessshow = false
                } else if (dialog == 'unit') {
                    this.unitAccessshow = false
                }
            },
            //switch的改变，把用户的状态也改变
            userStatusChange(index, row) {
                console.log("测试：" + index)
                console.log("data:" + row)
            },
            //配置用户的角色
            handleRoleConfig(){

            },
            handleDelete(){},
            //格式化显示性别
            formatSex(row,index){
                if (row.sex ==0){
                    return "男";
                }else {
                    return  "女";
                }
            }
        }
    }
</script>

<style scoped>

</style>