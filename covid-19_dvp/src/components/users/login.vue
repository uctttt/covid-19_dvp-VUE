<template>
    <div class="login">
        <el-card @touchmove.prevent @mousewheel.prevent>
            <div class="title">登录疫情实时，获取更多资讯</div>
            <el-form class="loginForm" :model="loginForm" :rules="loginRules" ref="loginFormRef">
                <el-form-item label="" prop="username">
                    <el-input v-model.trim="loginForm.username" placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input v-model.trim="loginForm.password" type="password" placeholder="请输入密码" clearable
                        show-password></el-input>
                </el-form-item>
                <el-form-item class="buttonBox">
                    <el-button class="registerBtn" @click="goRegister">注册</el-button>
                    <el-button class="loginBtn" type="primary" @click="loginCheck">登录</el-button>
                </el-form-item>
            </el-form>
            <a class="goReset" href="/reset">忘记密码？</a>
        </el-card>
        <div class="blackBackground" @click="closeContent" @touchmove.prevent @mousewheel.prevent>
        </div>
    </div>
</template>

<style lang="less" scoped>
.login {
    z-index: 99;
    width: 22rem;
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
        margin: 1.2rem auto;
        font-size: 1.2rem;
        color: cornflowerblue;
        font-weight: bold;
    }

    .el-card {
        position: relative;
        z-index: 99;
        margin: 1.1rem;

        .el-input {
            margin: .325rem 0;
            height: 2.2rem;
            width: 20rem;
            font-size: 1.1rem;
        }

        .goReset {
            text-decoration: none;
            color: rgb(100, 148, 237);
            font-size: .8rem;
            font-weight: normal;
            position: absolute;
            right: .2rem;
            bottom: .3rem;
        }

        .goReset:hover {
            color: rgb(78, 130, 226);
            cursor: pointer;
        }

        /deep/.el-form-item__content {
            display: flex;
            justify-content: center;

            .registerBtn {
                color: cornflowerblue;
            }

            .el-button {
                height: 2.3rem;
                width: 4rem;
                font-size: 1rem;
                border: 1px solid rgb(164, 193, 247);
                margin: .6rem;
            }
        }
    }
}
</style>

<script>
// @ is an alias to /src
import userSystem from '@/api/userSystemAPI'

export default {
    name: 'Login',

    components: {
    },

    data() {
        return {
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
        goRegister() {
            this.$refs.loginFormRef.resetFields();
            this.$router.push('/register');
        },

        closeContent() {
            this.$refs.loginFormRef.resetFields();
            this.$emit('showLogin');
        },

        loginCheck() {
            this.$refs.loginFormRef.validate(async result => {
                if (result) {
                    const { data: res } = await userSystem.login(this.loginForm)
                    if (res.code === 200) {
                        console.log(res);
                        this.$message.success(res.msg)
                        this.$store.commit("loginIn", true)
                        let userInfo = {
                            isLogin: true,
                            username: res.data[0].username,
                            name: res.data[0].name,
                        };
                        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
                        this.closeContent();
                        location.reload();
                    } else {
                        this.$message.error(res.msg)
                    }
                } else {
                    return false
                }
            }
            );
        },
    },

    props: {
    },

    mounted() {
        console.log(this.$store);
    },
}
</script>