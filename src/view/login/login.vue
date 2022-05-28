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
                :model="loginForm"
                :rules = "loginRules"
                style="max-width: 300px;">

              <el-form-item label="用户" prop='account'>
                <el-input
                    clearable
                    size="large"
                    v-model="loginForm.account"/>
              </el-form-item>

              <el-form-item label="密码" prop='password'>
                <el-input
                    type="password"
                    clearable
                    show-password
                    size="large"
                    v-model="loginForm.password"/>
              </el-form-item>

              <el-form-item class="login-foot">

                <div>
                  <el-button
                      type="primary"
                      round
                      id='login'
                      size='large' style="align-items: center;justify-content: center">登陆
                  </el-button>
                </div>

                <div>
                  <el-button
                      type="primary"
                      round
                      color='rgb(93,203,129)'
                      id='register'
                      @click = '$router.push({name:"register"})'
                      size='large' style="align-items: center;justify-content: center">注册
                  </el-button>
                </div>


              </el-form-item>

            </el-form>

          </div>
        </div>
      </div>
    </template>
  </common-page>
</template>

<script>
import '../../assets/style/common.css';
import '../../assets/style/loginCard.css';
import {reactive} from "vue";
import logoTitle from "@/components/logoTitle";
import CommonPage from "@/components/commonPage";
import {useLoginStore} from "@/sotre/loginStore";


export default {
  name: "login",
  components: {
    CommonPage,
    logoTitle
  },
  setup() {

    const loginForm = useLoginStore().$state.loginForm;

    const loginRules = reactive({
      account:[
        {required:true,message:'请输入用户名!',trigger:'blur'},
      ],
      password:[
        {required:true,message:'请输入密码!',trigger:'blur'},
      ]
    });

    return {
      loginForm,
      loginRules
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
  margin: 5px 0;
}

:deep(.el-button) {
  color: white;
}
</style>