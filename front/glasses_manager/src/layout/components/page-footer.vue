<!-- 全局页脚 -->
<template>
  <div class="ele-text-center" style="padding: 16px 0">
    <div class="ele-text-secondary" style="margin-top: 8px">
      {{ t('layout.footer.copyright') }}
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>
