<template>
    <div id="module">
        <el-form ref="from" :model="from" label-width="20%"  class="login-container">
            <h3 class="login-title">用户登录</h3>
            <el-form-item label="用户名">
                <label slot="label">用户名:</label>
                <el-input
                        type="text"
                        v-model="from.username"
                        placeholder="用户名"
                        auto-complete="off"
                        clearable>
                </el-input>
            </el-form-item>
            <!-- <el-form-item label="密码">
                 <label slot="label">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
                 <el-input placeholder="密码" v-model="from.password" show-password/>
             </el-form-item>-->
            <el-form-item label="密 码:"  prop="password">
                <label slot="label">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
                <el-input
                        type="password"
                        v-model="from.password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        show-password>
                </el-input>
            </el-form-item>
            <el-button round @click="login()">登录</el-button>
            <el-button round @click="reset()">重置</el-button>
        </el-form>
    </div>
</template>
<script>
    import {login} from "../api/request";
    export default {
        name: 'login',
        data() {
            return {
                from: {
                    username:'',
                    password: ''
                }
            }
        },
        methods: {
            login(){
                if (this.from.username.length > 0 && this.from.password.length > 0){
                    // eslint-disable-next-line no-console
                    console.log("用户名："+ this.from.username + "密码：" + this.from.password);
                    // eslint-disable-next-line no-undef
                    login(this.from).then(res => {
                        if (res.code == 200){
                            //跳转到到主页
                           /* this.$router.push('/index');*/
                            var userInfo = {};
                            userInfo.userId = res.userId;
                            userInfo.token = res.token;
                            //响应中出现错误
                            this.$toast.success({
                                title: "登录提示",
                                message: "恭喜你登录成功",
                                timeout:5000,
                                showMethod: 'slideInDown',
                                hideMethod: 'jello'
                            });
                            this.$store.commit('login', userInfo);
                            this.$router.push({path:'/index'})
                        }else {
                            this.$toast.error({
                                title: '登录失败提示：',
                                message: res.data.message,
                                timeout: 5000
                            })
                           console.log(res)
                        }
                    })
                }
                else {
                    // eslint-disable-next-line no-console
                    console.log("请输入用户名密码！！！");
                }

            },
            reset(){
                this.from.username='',
                    this.from.password=''
            }
        }
    }
</script>

<style scoped>
    #module{
        height: 100%;
        width: 100%;
        background: url("../images/2.jpg") center;
        background-size: cover;
        position: fixed;
    }
    .login-container{
        border-radius: 15px;
        background-clip: padding-box;
        /*这个div在这个页面相对应的距离，前面是相对与上边距的距离 后面的左右的距离*/
        margin: 300px auto;
        /*内边距：里面的元素在这个div中的四边的距离*/
        padding: 20px 30px 10px 5px;
        width: 400px;
        background: #FAC696B0;
        border: 1px solid #FAC696;
        box-shadow: 0 5px #9E7652;
    }
</style>