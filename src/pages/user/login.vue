<template>
  <div class="login-body">
    <div class="loginWarp"
         v-loading="load_data"
         element-loading-text="正在登陆中...">
      <div class="login-title">
        <img src="./images/login_logo.png"/>
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="0">
          <el-form-item prop="user_name" class="login-item">
            <el-input v-model="form.user_name" placeholder="请输入账户名：" class="form-input"></el-input>
          </el-form-item>
          <el-form-item prop="user_password" class="login-item">
            <el-input type="password" v-model="form.user_password" placeholder="请输入账户密码：" class="form-input"></el-input>
          </el-form-item>
          <el-form-item class="login-item">
            <el-button size="large" icon="check" class="form-submit" @click="submit_form"></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {portUser} from 'common/port_uri'

  export default{
    data () {
      return {
        form: {
          user_name: '',
          user_password: ''
        },
        rules: {
          user_name: [{required: true, message: '请输入账户名！', trigger: 'blur'}],
          user_password: [{required: true, message: '请输入账户密码！', trigger: 'blur'}]
        },
        // 请求时的loading效果
        load_data: false
      }
    },
    mounted () {
      document.onkeydown = (event) => {
        // var e = event || window.event || arguments.callee.caller.arguments[0]
        var e = event || window.event || this.caller.arguments[0]
        if (e && e.keyCode === 13) {
          this.submit_form()
        }
      }
    },
    methods: {
      submit_form () {
        let self = this
        self.$refs.form.validate((valid) => {
          if (valid) {
            this.load_data = true
            // 登录提交
            self.$http.post(portUser.login, this.form)
              .then(({data: {data, msg}}) => {
                let isNull = data !== null
                self.$store.dispatch('set_user_info', {
                  user: isNull ? data : null,
                  is_login: isNull
                })
                self.$message({
                  message: msg,
                  type: 'success'
                })
                setTimeout(() => {
                  self.$router.replace({path: '/'})
                  self.load_data = false
                }, 500)
              })
          } else {
            return false
          }
        })
      }
    },
    destroyed () {
      document.onkeydown = null
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .login-body {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(./images/login_bg.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .loginWarp {
      width: 300px;
      padding: 25px 15px;
      margin: 100px auto;
      background-color: #fff;
      border-radius: 5px;
      .login-title {
        margin-bottom: 25px;
        text-align: center;
      }
      .login-item {
        .el-input__inner {
          margin: 0 !important;
        }
      }
      .form-input {
        input {
          margin-bottom: 15px;
          font-size: 12px;
          height: 40px;
          border: 1px solid #eaeaec;
          background: #eaeaec;
          border-radius: 5px;
          color: #555;
        }
      }
      .form-submit {
        width: 100%;
        color: #fff;
        border-color: #6bc5a4;
        background: #6bc5a4;
        &:active, &:hover {
          border-color: #6bc5a4;
          background: #6bc5a4;
        }
      }
    }
  }
</style>
