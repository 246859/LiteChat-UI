<template>
  <common-page>
    <template v-slot:default>
      <div ref="card" class="form-container-card slide-in-left">
        <logo-title/>
        <div class="login-form-box">
          <div class="form-box">
            <el-form
                ref="registerFormRef"
                :model="registerForm"
                :rules="registerRules"
                label-position="top"
                label-width="100px"
                style="max-width: 300px;">

              <el-form-item label="输入用户名" prop='userName'>
                <el-input
                    v-model="registerForm.userName"
                    clearable
                    size="large"/>
              </el-form-item>

              <el-form-item label="输入昵称" prop='nickName'>
                <el-input
                    v-model="registerForm.nickName"
                    clearable
                    size="large"/>
              </el-form-item>

              <el-form-item label="输入密码" prop='password'>
                <el-input
                    v-model="registerForm.password"
                    clearable
                    show-password
                    size="large"
                    type="password"/>
              </el-form-item>

              <el-form-item label="再次输入密码" prop='repassword'>
                <el-input
                    v-model="registerForm.repassword"
                    clearable
                    show-password
                    size="large"
                    type="password"/>
              </el-form-item>

              <el-form-item class="login-foot">

                <div>
                  <el-button
                      id='register'
                      color='rgb(93,203,129)'
                      round
                      size='large'
                      style="align-items: center;justify-content: center"
                      type="primary" @click='$router.push({name:"login"})'>返回
                  </el-button>
                </div>

                <div>
                  <el-button
                      id='login'
                      round
                      size='large'
                      type="primary"
                      @click="submitForm(registerFormRef)">注册
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
import logoTitle from "@/components/logoTitle";
import {reactive, ref} from "vue";
import CommonPage from "@/components/commonPage";
import '../../assets/style/common.css';
import '../../assets/style/loginCard.css';
import {useAuthStore} from "@/sotre/authStore";
import '../../assets/style/animate.css';
import {errorTips, successTips} from "@/utils/messageTips";
import {enOrNum} from '@/utils/regex';
import {useRouter} from "vue-router";
import {LANG} from "@/config/lang";

export default {
  name: "register-page",
  components: {
    CommonPage,
    logoTitle
  },
  setup() {

    const router = useRouter();
    const authStore = useAuthStore();

    const data = reactive({
      card: ref(null),
      registerFormRef: ref(null),
      registerForm: authStore.$state.registerForm,//绑定pinia中的数据缓存
    })


    const validateRePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(LANG.FORM.PASSWORD.RE_ENTER))
      } else if (value !== data.registerForm.password) {
        callback(new Error(LANG.FORM.PASSWORD.RE_INVALID))
      } else {
        callback()
      }
    };

    const enOrNumValidate = (rule, value, callback) => {//英文数字校验
      callback(
          enOrNum(value) ?
              undefined :
              new Error(LANG.FORM.USERNAME.INVALID)
      )
    };

    const registerRules = reactive({
      userName: [
        {required: true, message: LANG.FORM.USERNAME.ENTER, trigger: 'blur'},
        {min: 3, max: 10, message: LANG.FORM.USERNAME.BEYOND_LENGTH, trigger: 'blur'},
        {validator: enOrNumValidate, trigger: 'blur'}
      ],
      nickName: [
        {required: true, message: LANG.FORM.NICKNAME.ENTER, trigger: 'blur'},
        {min: 3, max: 10, message: LANG.FORM.NICKNAME.BEYOND_LENGTH, trigger: 'blur'},
      ],
      password: [
        {required: true, message: LANG.FORM.PASSWORD.ENTER, trigger: 'blur'},
        {min: 6, max: 20, message: LANG.FORM.PASSWORD.BEYOND_LENGTH, trigger: 'blur'},
      ],
      repassword: [
        {required: true, validator: validateRePass, trigger: 'blur'}
      ]
    });

    const submitForm = (formEl) => {//注册表单验证
      if (!formEl) return
      formEl.validate(valid => {
        if (valid) {
          authStore.register().then(res => {
            if (res.data.code === 200) {
              successTips(res.data.msg);
              router.push({name: "login"});
              authStore.reSetRegisterForm();
            } else {
              errorTips(res.data.msg);
            }
          }).catch(err => {
            console.log(err)
          });
        } else {
          errorTips("请填写正确的用户信息!");
          return false
        }
      })
    }


    return {
      registerRules,
      submitForm,
      ...data,
    }
  }
}
</script>

<style scoped>
.form-container-card {
  height: 620px !important;
}

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

.form-container-card {
  height: 515px;
}

</style>