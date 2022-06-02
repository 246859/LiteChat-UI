<template>
  <common-page>
    <template v-slot:default>
      <div class="form-container-card slide-in-right">
        <logo-title/>
        <div class="login-form-box">
          <div class="form-box">
            <el-form
                :model="loginForm"
                :rules="loginRules"
                label-position="top"
                label-width="100px"
                style="max-width: 300px;">

              <el-form-item label="用户" prop='userName'>
                <el-input
                    v-model="loginForm.userName"
                    clearable
                    size="large"/>
              </el-form-item>

              <el-form-item label="密码" prop='password'>
                <el-input
                    v-model="loginForm.password"
                    clearable
                    show-password
                    size="large"
                    type="password"/>
              </el-form-item>

              <el-form-item class="login-foot">

                <div>
                  <el-button
                      id='login'
                      round
                      size='large'
                      style="align-items: center;justify-content: center"
                      type="primary" @click='login'>登陆
                  </el-button>
                </div>

                <div>
                  <el-button
                      id='register'
                      color='rgb(93,203,129)'
                      round
                      size='large'
                      style="align-items: center;justify-content: center"
                      type="primary" @click='$router.push({name:"register"})'>注册
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
import {useAuthStore} from "@/sotre/authStore";
import {useRouter} from "vue-router";
import {errorTips, successTips} from "@/utils/messageTips";
import {LANG} from "@/config/lang";


export default {
  name: "login",
  components: {
    CommonPage,
    logoTitle
  },
  setup() {

    const authStore = useAuthStore();
    const router = useRouter();

    const loginForm = authStore.$state.loginForm;

    const loginRules = reactive({
      userName: [
        {required: true, message: LANG.FORM.USERNAME.ENTER, trigger: 'blur'},
      ],
      password: [
        {required: true, message: LANG.FORM.PASSWORD.ENTER, trigger: 'blur'},
      ]
    });

    const login = () => {
      authStore.login().then(res => {
        if (res.data.code === 200) {//登陆成功
          authStore.reSetLoginForm();//重置authStore
          router.push({name: 'chatIndex'})//跳转首页
          successTips(res.data.msg);
        } else {
          errorTips(res.data.msg);
        }
      })
    }

    return {
      loginForm,
      loginRules,
      login
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