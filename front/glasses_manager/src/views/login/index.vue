<template>
  <div class="bg-fater">
    <div class="left" />
    <div class="right">
      <div class="login-father">
        <div class="login">
          <a-form :rules="rules" :model="loginState" ref="loginRef">
            <a-form-item>
              <a-typography-title :level="2" class="login-text">
                晨光眼镜管理系统
              </a-typography-title>
            </a-form-item>
            <a-form-item name="account">
              <a-input placeholder="请输入账号" size="large" v-model:value="loginState.account">
                <template #prefix>
                  <UserOutlined class="login-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password">
              <a-input-password placeholder="请输入密码" size="large" v-model:value="loginState.password">
                <template #prefix>
                  <LockOutlined class="login-icon" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" class="login-button" size="large" @click="onSubmit">
                {{t('login.login')}}
              </a-button>
            </a-form-item>
          </a-form>
          <div>
            <a-divider style="color: rgba(0,0,0,.25)">其它方式登录</a-divider>
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
            Copyright © {{year}} 翔基软件工作室 All Rights Reserved
          </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { UserOutlined, LockOutlined,WechatOutlined } from '@ant-design/icons-vue';
  import { onMounted, reactive, ref } from 'vue';
  import service from '@/utils/request';
  import { message } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  // 年份
  var year = ref(0);
  
  // 验证规则
  var rules = reactive({
    'account': {
      required: true,
      message: '请输入账号'
    },
    'password': {
      required: true,
      message: '请输入密码'
    }
  });

  var loginState = reactive({
    account: '',
    password: ''
  });

  var loginRef = ref({});

  var onSubmit = async () => {
    try {
      let value = await loginRef.value.validateFields();
      await userLogin();
    } catch (error) {
      console.log('验证失败：',error); 
    }
  }

  var userLogin = async () =>  {
    try {
      let response = await service.post('/login', loginState);

    } catch (error) {
      message.error('服务错误：', error.message);
    }
  }

  var onWechatClick = async () => {
    message.warning('该功能暂未开放，请稍后');
  }

  onMounted(() =>  {
    year.value = new Date().getFullYear();
  })
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
    color: rgba(0, 0, 0, 0.25)
  }
  .login-button {
    width: 100%;
  }
</style>