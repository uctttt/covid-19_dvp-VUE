<template>
    <div class="reset">
        <div class="title">重置用户密码</div>
        <el-card>
            <el-steps :active="actStep - 0" align-center>
                <el-step title="查询用户" />
                <el-step title="修改密码" />
                <el-step title="完成重置" />
            </el-steps>
            <el-tabs v-model=actStep tab-position="left" style="height: 17rem">
                <el-form class="resetForm" :model="resetForm" :rules="resetRules" ref="resetFormRef">
                    <el-tab-pane name="1" label="查询用户">
                        <el-form-item label="" prop="username">
                            <el-input v-model.trim="resetForm.username" placeholder="请输入需要重置的用户名" clearable></el-input>
                        </el-form-item>
                        <el-button round @click="checkUsername">查询用户</el-button>
                    </el-tab-pane>
                    <el-tab-pane name="2" label="修改密码">
                        <el-form-item label="" prop="password">
                            <el-input v-model.trim="resetForm.password" type="password" placeholder="请输入新密码" clearable
                                show-password></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="passwordCheck">
                            <el-input v-model.trim="resetForm.passwordCheck" type="password" placeholder="请确认新密码"
                                clearable show-password></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="key">
                            <el-button class="getKeyBtn" @click="getKey">{{ getKeyTip }}</el-button>
                            <el-input v-model.trim="key" placeholder="请输入验证码" clearable></el-input><br />
                        </el-form-item>
                        <div class="keyImg" v-if="checkKey != ''">
                            <img :src="imgSource" @click="getKey" />
                        </div>
                        <el-button type="primary " @click="resetCheck">确认修改</el-button>
                    </el-tab-pane>
                    <el-tab-pane name="3" label="完成重置">完成重置</el-tab-pane>
                </el-form>
            </el-tabs>
            <a href="/" class="backHome">返回主页</a>
        </el-card>
    </div>
</template>

<style lang="less" scoped>
.reset {
    z-index: 99;
    width: 26rem;
    position: fixed;
    top: 45%;
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

        @media (max-width: 425px) {
            /deep/.el-tabs__item {
                padding: 0;
                font-size: 0;
            }
        }

        @media (min-width: 426px) {
            /deep/.el-tabs__item {
                padding: 0 .5rem;
                font-size: .6rem;
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

        /deep/.el-form-item__content {
            display: flex;
            justify-content: center;
            flex-wrap: nowrap;
            margin-bottom: .1rem;

            .el-form-item__error {
                margin-top: .5rem;
                margin-left: 2rem;
                font-size: .5rem;
            }

            .el-input {
                margin-top: 1rem;
                padding: 0 1rem;
                height: 1.5rem;
                font-size: 1rem;
            }

            i {
                width: .6rem;
                height: .6rem;

                svg {
                    width: 100%;
                    height: 100%;
                }
            }
        }


        .el-button {
            font-size: 1rem;
            margin-top: 1rem;
        }

        .el-steps {
            margin-bottom: .9375rem;

            /deep/.el-step__line {
                top: .625rem;
            }

            /deep/.el-step__icon {
                font-size: .625rem;
                width: 1.25rem;
                height: 1.25rem;
            }
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
    name: 'ResetView',

    components: {
    },

    data() {
        const checkPassword = (rule, value, callback) => {
            if (!value) {
                callback();
            }
            if (value == this.resetForm.password) {
                callback();
            } else

                return callback(new Error('请输入相同密码'));
        };

        return {
            resetForm: {
                username: '',
                password: '',
                passwordCheck: '',
            },

            actStep: "1",
            key: '',
            checkKey: '',
            getKeyTip: '获取验证码',
            getKeyTipFlag: true,
            imgSource: '',

            resetRules: {
                username: [
                    { required: true, message: '请确认用户名', trigger: 'blur' },
                    { min: 3, max: 25, message: '请输入正确用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' },
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
        checkUsername() {
            if (this.resetForm.username) {
                userSystem.checkUser({
                    username: this.resetForm.username,
                }).then((res) => {
                    if (res.status === 200) {
                        console.log('4');
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.actStep = "2";
                        } else {
                            this.$message.error(res.data.msg);
                            return;
                        }
                    }
                }).catch((error) => { });
            } else {
                this.$message.error("请输入要查询的用户名");
            }
        },

        resetCheck() {
            if (this.checkKey == '') {
                this.$message.error("请先获取验证码");
                return;
            }
            if (this.key !== this.checkKey) {
                this.$message.error("验证码错误，请重新输入");
                this.key = '';
                this.resetForm.password = '';
                this.resetForm.passwordCheck = '';
                return;
            }
            this.$refs.resetFormRef.validate(async result => {
                if (result) {
                    const { data: res } = await userSystem.reset({
                        newPassword: this.resetForm.password,
                        username: this.resetForm.username,
                    });
                    if (res.code === 200) {
                        this.$message.success(res.msg);
                        this.actStep = "3";
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
    },
}
</script>