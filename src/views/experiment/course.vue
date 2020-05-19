<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 20px;margin-top: 20px">
            <el-breadcrumb-item :to="{path: '/index'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>实验课程管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="courses">
            <!-- <h2>这里是课程界面啊啊啊啊</h2> -->
            <div class="handle">
                <!-- 查询 -->
                <div class="menu">
                    <el-timeline>
                        <el-timeline-item placement="top">
                            <el-card>
                                <h4>课程查询</h4>
                                <el-input placeholder="请输入课程名" class="searchName" v-model="searchName">
                                    <!-- <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button> -->
                                </el-input>
                                <el-button type="primary" icon="el-icon-search" round @click="handleSearchCourse()">搜索</el-button>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item placement="top">
                            <el-card>
                                <h4>添加课程</h4>
                                <el-form
                                        :model="ruleForm"
                                        :rules="rules"
                                        ref="ruleForm"
                                        label-width="80px"
                                        class="coursesForm"
                                >
                                    <el-form-item label="课程名" prop="name">
                                        <el-input v-model="ruleForm.name" placeholder="请输入课程名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="课程类" prop="course_type">
                                        <el-select v-model="ruleForm.course_type" clearable placeholder="请选择" style="width: 100%">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="时间段" prop="course_date">
                                        <el-date-picker
                                                v-model="ruleForm.course_date"
                                                type="monthrange"
                                                align="right"
                                                unlink-panels
                                                range-separator="至"
                                                start-placeholder="开始月份"
                                                end-placeholder="结束月份"
                                                :picker-options="pickerOptions"
                                                style="width: 100%">
                                        </el-date-picker>
                                    </el-form-item>

                                    <el-form-item label="简介" prop="course_describe">
                                        <el-input
                                                type="textarea"
                                                v-model="ruleForm.course_describe"
                                                placeholder="请填写课程信息"
                                                maxlength="50"
                                                :autosize="{ minRows: 4, maxRows: 6}"
                                                show-word-limit
                                        ></el-input>
                                    </el-form-item>

                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
                                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item placement="top">
                            <el-card>
                                <h4>created by©Allen &nbsp;<span style="font-weight:100;font-size:0.7em">深自缄默，如云漂泊</span></h4>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </div>
            <div class="formData">
                <el-table
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        :data="coursesData.filter(data => !searchName || data.name.toLowerCase().includes(searchName.toLowerCase()))"
                        border
                        style="width: 100%;margin-top: 50px"
                        min-height="650"
                        max-height="650"
                >
                    <el-table-column type="index" :index="indexMethod"></el-table-column>
                    <el-table-column prop="name" label="课程名" width="150"></el-table-column>
                    <el-table-column prop="lab_type" sortable label="课程类型" width="110"></el-table-column>
                    <el-table-column prop="course_describe" label="课程简介" :formatter="checkNull" width="160"></el-table-column>
                    <el-table-column prop="course_date" sortable label="课程开设时间段" width="150"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="warning" size="small">修改</el-button>
                            <el-tooltip
                                    content="删除这门课程？"
                                    placement="top"
                                    effect="light"
                                    :hide-after="1000"
                                    :enterable="false"
                            >
                                <el-button
                                        @click="handleDelete(scope.$index, scope.row)"
                                        type="danger"
                                        size="small"
                                        icon="el-icon-delete"
                                        circle
                                        plain
                                ></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <!--添加分页-->
                <pagination :params="pageParam.page" :parentMethod="getAllCourses" class="paginations"></pagination>
                <el-dialog title="课程信息" :visible.sync="dialogFormVisible">
                    <el-form :model="updateForm" class="content" :rules="rules" ref="updateForm">
                        <el-form-item label="课程名" prop="name" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="简介" prop="course_describe" :label-width="formLabelWidth">
                            <el-input
                                    type="textarea"
                                    v-model="updateForm.course_describe"
                                    placeholder="请填写课程信息"
                                    maxlength="50"
                                    :autosize="{ minRows: 4, maxRows: 6}"
                                    show-word-limit
                            ></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="updateStudent('updateForm')">确 定</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import {selectAllCourse,addCourseInfo} from "../../api/request";
    import pagination from "../../components/pagination";

    export default {
        name: "course",
        data() {
            return {
                name: "Allen",
                searchName: "",
                coursesData: [],
                loading: true,
                // 增加课程 表单项设置
                ruleForm: {
                    name: "",
                    course_type: "",
                    course_date: "",
                    course_describe: ""
                },
                //实验仪器的分页数据
                pageParam: {
                    page: {
                        pageNumber: 1,
                        pageSize: 10,
                        total: 0
                    }
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '本月',
                        onClick(picker) {
                            picker.$emit('pick', [new Date(), new Date()]);
                        }
                    }, {
                        text: '今年至今',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date(new Date().getFullYear(), 0);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近六个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setMonth(start.getMonth() - 6);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                course_date:'',
                //设置课程类型的下拉选择
                options: [{
                    value: '001',
                    label: '软件类'
                }, {
                    value: '002',
                    label: '化学类'
                }, {
                    value: '003',
                    label: '物理类'
                }, {
                    value: '004',
                    label: '其它类'
                }],
                course_type: '',
                // 修改时课程信息 表单项设置
                updateForm: {
                    id: "",
                    name: "",
                    lab_type: "",
                    course_describe: ""
                },
                // 校验规则
                rules: {
                    name: [
                        { required: true, message: "请输入课程名", trigger: "change" },
                        { min: 2, max: 10, message: "长度在 2到 10 个字符", trigger: "blur" }
                    ],
                    course_describe: [
                        {
                            required: true,
                            message: "请填写课程信息,否则无法通过喔~",
                            trigger: "change"
                        }
                    ],
                    course_date:[{
                        required: true,
                        message: "请选择课程时间,否则无法通过喔~",
                        trigger: "change"
                    }],
                    course_type:[{
                        required: true,
                        message: "请选择课程类型,否则无法通过喔~",
                        trigger: "change"
                    }]
                },
                dialogFormVisible: false,
                formLabelWidth: "6em"
            };
        },
        components:{
            pagination
        },
        methods: {
            //根据名称查询所有的信息
            handleSearchCourse(){
                this.getAllCourses();
            },
            // 实现添加功能
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 表单验证成功
                        var strData = {
                            name: this.ruleForm.name,
                            courseType: this.ruleForm.course_type,
                            courseDateParam: this.ruleForm.course_date,
                            courseDescribe: this.ruleForm.course_describe
                        };
                        console.log("提交数据："+JSON.stringify(strData));
                        addCourseInfo(strData).then(res => {
                            if (res.code == 0){
                                this.$toast.success({title:"成功提示",message:"添加课程成功"});
                                this.getAllCourses();
                            }else{
                                this.$toast.error({title:"错误提示",message:"添加课程失败"});
                            }
                        });
                        // 改变post的编码格式，适应后台

                    } else {
                        this.$message.error("阁下填写不完整喔！请填写完整再提交！");
                        return false;
                    }
                });
            },
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //为表格添加序号
            indexMethod(index) {
                return index + 1;
            },

            // 实现删除功能
            handleDelete(index, row) {
                // console.log(index, row);
                this.$confirm("此操作将删除该课程所有信息, 是否继续?", "提示", {
                    cancelButtonText: "取消",
                    confirmButtonText: "确定",
                    type: "warning"
                })
                    .then(() => {
                        //删除数据的代码
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },

            handleClick(row) {
                // 数据回显
                console.log(row);
                // this.resetForm(updateForm);
                this.updateForm.name = row.name;
                this.updateForm.course_describe = row.course_describe;
                this.updateForm.id = row.id;
                this.dialogFormVisible = true;
            },
            // 提交修改
            updateStudent(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        var updateData = {
                            id: this.updateForm.id,
                            name: this.updateForm.name,
                            course_describe: this.updateForm.course_describe
                        };
                        this.dialogFormVisible = false;
                        //  改变post的编码格式，适应后台  修改！
                        this.axios
                            .post(
                                "http://localhost:8004/Courses/Edit",
                                qs.stringify(updateData)
                            )
                            .then(result => {
                                if (result.status == 200 || result.status == 302) {
                                    this.$notify({
                                        id: "",
                                        title: "修改成功",
                                        message: "信息已修改完成！请查看",
                                        type: "success"
                                    });
                                    this.getAllcourses();
                                }
                            })
                            .catch(err => {
                                this.$message({
                                    message: "添加失败o(╥﹏╥)o",
                                    type: "danger"
                                });
                            });
                    } else {
                        this.$message.error("阁下网络错误！刘大侠我快马加鞭前来提示！");
                        return false;
                    }
                });
            },

            // 查验简介是否为空
            checkNull(row, column) {
                // console.log(row)
                return row.course_describe == null
                    ? "该课程暂无介绍信息 ￣□￣｜｜"
                    : row.course_describe;
            },
            // 获取全部的课程数据
            getAllCourses() {
                var args = {courseName: this.searchName,pageNumber: this.pageParam.page.pageNumber,pageSize:this.pageParam.page.pageSize};
               selectAllCourse(args).then(res =>{
                   var result = res.data;
                   //设置实验仪器的分页信息
                   this.pageParam.page.pageNumber =result.page;
                   this.pageParam.page.pageSize = result.size;
                   this.pageParam.page.total = result.count;
                   //查询课程信息成功
                   if (res.code == 0){
                       console.log("sdsfa"+JSON.stringify(res.data))
                       this.coursesData = res.data.data;
                       this.loading = false;
                   }else {
                       this.$toast.info({title:"错误提示",message:"没有符合该条件的课程"});
                   }
               });
            }
        },
        mounted() {
            this.getAllCourses();
        }
    };
</script>
<style lang="less" scoped>
    .courses {
        display: flex;
        height: 42em;
        .handle {
            flex: 6;
            // height: 50em;
            // background-color: lightblue;
            .searchName {
                width: 70%;
            }
            .menu {
                padding: 5% 10% 0 10%;
                h4 {
                    margin: 0.2em;
                    padding-bottom: 0.5em;
                }
                .stydentForm {
                    .el-form-item__content {
                        // margin: 0 !important;
                        .el-input__suffix {
                            right: 0 !important;
                        }
                        .el-input {
                            width: 70%;
                        }
                    }
                }
            }
        }
        .formData {
            flex: 3;
            text-align: center;
            .el-table .paginations{
                text-align: center !important;
                float: right;
                // padding: 5%
                margin: 2%;
            }
            // background-color: lightpink;
        }
    }
</style>