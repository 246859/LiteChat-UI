<template>
  <common-page>
    <template v-slot:default>
      <div class="form-container-card">
        <logo-title/>
        <div class="login-form-box">
          <div class="form-box">
            <el-form
                label-position="top"
                label-width="100px"
                :model="registerForm"
                :rules="registerRules"
                style="max-width: 300px;">

              <el-form-item label="输入用户名" prop='account'>
                <el-input
                    clearable
                    size="large"
                    v-model="registerForm.account"/>
              </el-form-item>

              <el-form-item label="输入密码" prop='password'>
                <el-input
                    type="password"
                    clearable
                    show-password
                    size="large"
                    v-model="registerForm.password"/>
              </el-form-item>

              <el-form-item label="再次输入密码" prop='repassword'>
                <el-input
                    type="password"
                    clearable
                    show-password
                    size="large"
                    v-model="registerForm.repassword"/>
              </el-form-item>

              <el-form-item class="login-foot">

                <el-button
                    type="primary"
                    round
                    color='rgb(93,203,129)'
                    id='register'
                    @click='$router.push({name:"login"})'
                    size='large' style="align-items: center;justify-content: center">返回
                </el-button>

                <el-button
                    type="primary"
                    round
                    id='login'
                    size='large' style="align-items: center;justify-content: center">注册
                </el-button>

              </el-form-item>
            </el-form>

          </div>
        </div>
      </div>
    </template>
  </common-page>
</template>

<script>
import logoTitle from "@/components/logoTitle";
import {reactive} from "vue";
import CommonPage from "@/components/commonPage";
import '../../assets/style/common.css';
import '../../assets/style/loginCard.css';
import {useLoginStore} from "@/sotre/loginStore";

export default {
  name: "register-page",
  components: {
    CommonPage,
    logoTitle
  },
  setup() {
    const registerForm = useLoginStore().$state.registerForm;//绑定pinia中的数据缓存

    const validateRePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码!'))
      } else if (value !== registerForm.password) {
        callback(new Error("两次输入的密码不一致!"))
      } else {
        callback()
      }
    }

    const registerRules = reactive({
      account: [
        {required: true, message: '请输入用户名!', trigger: 'blur'},
        {min: 3, max: 10, message: '用户名长度须大于3个字符且小于10个字符', trigger: 'blur'},
      ],
      password: [
        {required: true, message: '请输入密码!', trigger: 'blur'},
        {min: 6, max: 20, message: '密码长度须大于6个字符且小于20个字符', trigger: 'blur'},
      ],
      repassword: [
        {required: true, validator: validateRePass, trigger: 'blur'}
      ]
    })

    return {
      registerForm,
      registerRules
    }
  }
}
</script>

<style scoped>
:deep(.el-form-item__label) {
  font-size: 18px;
  font-weight: bold;
}

:deep(.el-button--large.is-round) {
  padding: 25px 130px;
}

:deep(.el-button) {
  color: white;
}
</style>