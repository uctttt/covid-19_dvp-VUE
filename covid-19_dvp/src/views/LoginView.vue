<template>
    <div>
        <el-card>
        <div class="title">登陆疫情时刻</div>
            <el-input v-model="userName" placeholder="请输入用户名" clearable />
            <el-input type="password" v-model="password" placeholder="请输入用户密码" clearable show-password />
            <div class="buttonBox">
            <el-button>注册</el-button>
            <el-button type="primary">登陆</el-button>
        </div>
        </el-card>
        
    </div>
</template>

<style lang="less" scoped>
.title{
    margin: 1.3rem 0.5rem;
    font-size: 1.5rem;
    color:cornflowerblue;
    font-weight: bold;
}
.el-card{
    margin: 1.5rem;
    .el-input{
        margin: .625rem 0;
    }
.buttonBox {
    margin: .625rem;

    .el-button {
        height: 2rem;
        font-size: 1rem;
        border: 1px solid rgb(164, 193, 247);
        margin: 0 .9375rem;
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

    data(){
        return{
            userName:'',
            password:'',
        }
    },

    methods: {
    },

    props: {
    },
}
</script>