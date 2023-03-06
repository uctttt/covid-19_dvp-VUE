<template>
    <div class="register">
        <el-card>
            <div class="title">新用户注册</div>
            <el-form class="registerForm" :model="registerForm" :rules="registerRules" ref="registerFormRef">
                <el-form-item label="" prop="username">
                    <el-icon>
                        <User />
                    </el-icon>
                    <el-input v-model.trim="registerForm.username" placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="" prop="name">
                    <el-icon>
                        <EditPen />
                    </el-icon>
                    <el-input v-model.trim="registerForm.name" placeholder="请输入用户昵称" clearable></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-icon>
                        <Lock />
                    </el-icon>
                    <el-input v-model.trim="registerForm.password" type="password" placeholder="请输入密码" clearable
                        show-password></el-input>
                </el-form-item>
                <el-form-item label="" prop="passwordCheck">
                    <el-icon>
                        <Key />
                    </el-icon>
                    <el-input v-model.trim="registerForm.passwordCheck" type="password" placeholder="请确认密码" clearable
                        show-password></el-input>
                </el-form-item>
                <el-form-item label="" prop="key">
                    <el-button class="getKeyBtn" @click="getKey">{{ getKeyTip }}</el-button>
                    <el-input v-model.trim="key" placeholder="请输入验证码" clearable></el-input><br />
                </el-form-item>
                <div class="keyImg" v-if="checkKey != ''">
                    <img :src="imgSource" @click="getKey" />
                </div>
                <el-form-item class="buttonBox">
                    <el-button class="registerBtn" type="primary" @click="registerCheck">注册疫情实时</el-button>
                </el-form-item>
            </el-form>
            <a href="/" class="backHome">返回主页</a>
        </el-card>
    </div>
</template>

<style lang="less" scoped>
.register {
    z-index: 99;
    width: 25rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .title {
        margin: 1.3rem auto;
        font-size: 1.4rem;
        color: cornflowerblue;
        font-weight: bold;
    }

    .el-card {
        position: relative;
        z-index: 99;
        margin: 1.1rem;
        padding: 0;

        .el-input {
            margin: .325rem 0;
            height: 2rem;
            width: 100%;
            font-size: .9rem;
        }

        /deep/.el-card__body {
            padding: .6375rem;
        }

        /deep/.el-form-item__content {
            display: flex;
            justify-content: center;
            flex-wrap: nowrap;
            margin-bottom: .1rem;

            i {
                width: .6rem;
                height: .6rem;

                svg {
                    width: 100%;
                    height: 100%;
                }
            }

            .el-form-item__error {
                font-size: .6rem;
            }

            .el-button {
                height: 2rem;
                max-width: 9rem;
                font-size: 1rem;
                margin: .5rem;
            }

            .getKeyBtn {
                font-size: .9rem;
                margin: 0 .3rem 0;
                color: cornflowerblue;
                border: 1px solid cornflowerblue;
            }
        }

        .backHome {
            text-decoration: none;
            color: rgb(100, 148, 237);
            font-size: .8rem;
            font-weight: normal;
            position: absolute;
            right: .8rem;
            bottom: .5rem;
        }

        .backHome:hover {
            color: rgb(78, 130, 226);
            cursor: pointer;
        }

        .keyImg {
            img {
                margin: 0 auto;
                border: 1px solid cornflowerblue;
            }
        }
    }
}
</style>

<script>
// @ is an alias to /src
import userSystem from '@/api/userSystemAPI'

export default {
    name: 'RegisterView',

    components: {
    },

    data() {
        const checkPassword = (rule, value, callback) => {
            if (!value) {
                callback();
            }
            if (value == this.registerForm.password) {
                callback();
            } else
                return callback(new Error('请输入相同密码'));
        };

        return {
            registerForm: {
                username: '',
                name: '',
                password: '',
                passwordCheck: '',
            },

            key: '',
            checkKey: '',
            getKeyTip: '获取验证码',
            getKeyTipFlag: true,
            imgSource: '',

            registerRules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 3, max: 25, message: '请输入3至25位字符', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '用户昵称不能为空', trigger: 'blur' },
                    { max: 15, message: '请输入15位以下字符', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 6, max: 18, message: '请输入6至18位字符', trigger: 'blur' },
                ],
                passwordCheck: [
                    { validator: checkPassword, trigger: 'blur' },
                    { required: true, message: '请确认密码', trigger: 'blur' },
                ],
            },
        }
    },

    methods: {
         //注册确认
        registerCheck() {
            if (this.checkKey == '') {
                this.$message.error("请先获取验证码");
                return;
            }
            if (this.key !== this.checkKey) {
                this.$message.error("验证码错误，请重新输入");
                this.key = '';
                this.registerForm.password = '';
                this.registerForm.passwordCheck = '';
                return;
            }
            this.$refs.registerFormRef.validate(async result => {
                if (result) {
                    const { data: res } = await userSystem.register(this.registerForm);
                    if (res.code === 200) {
                        this.$message.success(res.msg);
                        this.$router.push('/');
                    } else {
                        this.$message.error(res.msg);
                        return;
                    }
                } else {
                    return false;
                }
            }
            )
        },

        //获取图形验证码，设置获取冷却时间
        getKey() {
            if (this.getKeyTipFlag) {
                userSystem.getKey().then((res) => {
                    if (res.status === 200) {
                        let data = res.data.result;
                        this.checkKey = data.verifyCode;
                        this.imgSource = data.fileName;
                    }
                }).then(() => {
                    this.getKeyTipFlag = false;
                    let timeOut = 9;
                    let timer = setInterval(() => {
                        this.getKeyTip = `${timeOut}秒后再次获取`;
                        timeOut--;
                        if (timeOut == 0) {
                            this.getKeyTipFlag = true;
                            this.getKeyTip = "获取验证码";
                            clearInterval(timer);
                        }
                    }, 1000);
                });
            }
        },
    },

    props: {
    },

    mounted() {
        userSystem.checkAPI().then((res) => {
                        console.log(res);
                })
    },
}
</script>