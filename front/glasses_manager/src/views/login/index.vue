<template>
  <div class="bg-fater">
    <div class="left" />
    <div class="right">
      <div class="login-father">
        <div class="login">
          <a-form :rules="rules" :model="loginState" ref="loginRef">
            <a-form-item>
              <a-typography-title :level="2" class="login-text">
                {{ t('login.title') }}
              </a-typography-title>
            </a-form-item>
            <a-form-item name="account">
              <a-input :placeholder="t('login.username')" size="large" v-model:value="loginState.account" :disabled="loading">
                <template #prefix>
                  <UserOutlined class="login-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password">
              <a-input-password :placeholder="t('login.password')" size="large" v-model:value="loginState.password" :disabled="loading">
                <template #prefix>
                  <LockOutlined class="login-icon" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-checkbox v-model:checked="loginState.remember" style="font-weight: 800" :disabled="loading">{{ t('login.remember') }}</a-checkbox>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" class="login-button" size="large" @click="onLoginClick" :loading="loading">
                {{ loading ? t('login.loading') : t('login.login')}}
              </a-button>
            </a-form-item>
          </a-form>
          <div>
            <a-divider style="color: rgba(0,0,0,.25);font-size: 14px">{{ t('login.otherLogin') }}</a-divider>
            <div style="text-align:center">
              <a-button type="primary" shape="circle" style="background-color:#28C445;border: 0px" @click="onWechatClick">
                <template #icon>
                  <wechat-outlined style="font-size: 20px;" />
                </template>
              </a-button>
            </div>
          </div>
        </div>
        <div class="login-text copyright">
            {{ t('layout.footer.copyright') }}
          </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { UserOutlined, LockOutlined,WechatOutlined } from '@ant-design/icons-vue';
  import { onMounted, reactive, ref, unref } from 'vue';
  import { login } from '@/api/login/index';
  import { message } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  import { removeRefreshToken, removeToken, setToken } from '@/utils/token-util';
  import { useRouter } from 'vue-router';
  import { cleanPageTabs, goHomeRoute } from '@/utils/page-tab-util';
  import { inputMinLength } from '@/utils/form-rules-util';

  const { t } = useI18n();
  const { currentRoute } = useRouter();
  const loading = ref(false);

  // ??????
  var year = ref(new Date().getFullYear());
  
  // ????????????
  var rules = reactive({
    'account': {
      required: true,
      message: t('login.username')
    },
    'password': {
      validator: (_rule, value) => {
        return inputMinLength(value, 6, t('login.password'), `????????????????????????6???`);
      },
      trigger: 'blur'
    }
  });

  var loginState = reactive({
    account: '',
    password: '',
    remember: false
  });

  var loginRef = ref({});

  var onLoginClick = () => {
    try {
      loginRef.value.validateFields()
        .then(() => {
          loading.value = true;
          login(loginState)
            .then(() => {
              loading.value = false;
              cleanPageTabs();
              goHome();
            })
            .catch((err) => {
              message.warn(err);
              loading.value = false;
            })
        });
    } catch (error) {
      console.log('???????????????',error); 
    }
  }

  var goHome = () => {
    let { query } = unref(currentRoute);
    goHomeRoute( query.from );
  }

  
  var onWechatClick = async () => {
    message.warning('?????????????????????????????????');
  }
  onMounted(() => {
    removeToken();
    removeRefreshToken();
  });
</script>
<style lang="less" scoped>
  .bg-fater {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .left {
    background-image: url('../../assets/bg-login.jpg');
    background-size:cover;
    width: 100%;
    height: 100%;
    flex: 40%;
  }
  .right {
    flex: 60%;
  }
  .login-father {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .copyright {
    color: rgba(0,0,0,.25);
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .login {
    width: 40%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .login-text {
    text-align: center;
  }
  .login-icon {
    // color: rgba(0, 0, 0, 0.25)
    color: #1890ff;
  }
  .login-button {
    width: 100%;
  }
</style>