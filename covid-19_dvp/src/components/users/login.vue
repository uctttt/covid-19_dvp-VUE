<template>
    <div class="login" v-if="showContent">
        <el-card >
            <div class="title">登陆疫情时刻</div>
            <el-form class="loginForm" :model="loginForm" :rules="loginRules" ref="loginFormRef">
                <el-form-item label="" prop="username">
                    <el-input v-model.trim="loginForm.username" placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input v-model.trim="loginForm.password" type="password" placeholder="请输入密码" clearable
                        show-password></el-input>
                </el-form-item>
                <el-form-item class="buttonBox">
                    <el-button class="registerBtn" @click="">注册</el-button>
                    <el-button class="loginBtn" type="primary" @click="loginCheck">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="blackBackground"  @click="closeContent" @touchmove.prevent @mousewheel.prevent>
        </div>
    </div>
</template>

<style lang="less" scoped>
.login {
    z-index: 99;
    width: 24rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .blackBackground {
        z-index: 97;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.075);
        width: 100vw;
        height: 100vh;
    }

    .title {
        margin: 1.3rem 0.5rem;
        font-size: 1.5rem;
        color: cornflowerblue;
        font-weight: bold;
    }

    .el-card {
        position: relative;
        z-index: 99;
        margin: 1.5rem;

        .el-input {
            margin: .625rem 0;
        }

        /deep/.el-form-item__content{
            display: flex;
            justify-content: center;

            .registerBtn {
                color: cornflowerblue;
            }

            .el-button {
                height: 2rem;
                font-size: 1rem;
                border: 1px solid rgb(164, 193, 247);
                margin:  .9375rem;
            }
        }
    }
}
</style>

<script>
// @ is an alias to /src

export default {
    name: 'LoginView',

    components: {
    },

    data() {
        return {
            showContent:true,
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 3, max: 25, message: '请输入正确格式', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 6, max: 18, message: '请输入正确格式', trigger: 'blur' },
                ],
            },
        }
    },

    methods: {
        closeContent() {
            this.userName = '';
            this.password = '';
            this.showContent = false;
        },

        loginCheck() {

        }
    },

    props: {
    },
}
</script>