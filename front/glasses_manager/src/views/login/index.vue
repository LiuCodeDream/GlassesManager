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
            <a-form-item name="name">
              <a-input placeholder="请输入账号" size="large" v-model:value="loginState.name">
                <template #prefix>
                  <UserOutlined class="login-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password">
              <a-input placeholder="请输入密码" size="large" v-model:value="loginState.password">
                <template #prefix>
                  <LockOutlined class="login-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" class="login-button" size="large" @click="onSubmit">
                登&nbsp;&nbsp;&nbsp;&nbsp;录
              </a-button>
            </a-form-item>
          </a-form>
          <div class="login-text" style="color: rgba(0,0,0,.25)">
            Copyright © {{year}} 翔基软件工作室 All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  import { onMounted, reactive, ref } from 'vue'

  // 年份
  var year = ref(0);
  
  // 验证规则
  var rules = reactive({
    'name': {
      required: true,
      message: '请输入账号'
    },
    'password': {
      required: true,
      message: '请输入密码'
    }
  });

  var loginState = reactive({
    name: '',
    password: ''
  });

  var loginRef = ref({});

  var onSubmit = async () => {
    try {
      let value = await loginRef.value.validateFields();
    } catch (error) {
      console.log('验证失败：',error); 
    }
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