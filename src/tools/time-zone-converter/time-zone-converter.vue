<script setup lang="ts">
import { nextTick } from 'vue';
import { TIMEZONES, convertToTimezone, isValidISO } from './time-zone-converter.service';
import { useValidation } from '@/composable/validation';

const israelTime = ref('');
const bangaloreTime = ref('');
const nlTime = ref('');

const refs: Record<string, ReturnType<typeof ref<string>>> = {
  'Asia/Jerusalem': israelTime,
  'Asia/Kolkata': bangaloreTime,
  'Europe/Amsterdam': nlTime,
};

let updating = false;

function propagate(sourceId: string, value: string) {
  if (updating) {
    return;
  }
  if (!isValidISO(value)) {
    return;
  }
  updating = true;
  for (const tz of TIMEZONES) {
    if (tz.id !== sourceId) {
      refs[tz.id].value = convertToTimezone(value, tz.id);
    }
  }
  nextTick(() => { updating = false; });
}

watch(israelTime, v => propagate('Asia/Jerusalem', v));
watch(bangaloreTime, v => propagate('Asia/Kolkata', v));
watch(nlTime, v => propagate('Europe/Amsterdam', v));

function seedCurrentTime() {
  israelTime.value = convertToTimezone(new Date().toISOString(), 'Asia/Jerusalem');
}

const israelValidation = useValidation({
  source: israelTime,
  rules: [{ message: 'Invalid ISO date', validator: v => !v || isValidISO(v) }],
});
const bangaloreValidation = useValidation({
  source: bangaloreTime,
  rules: [{ message: 'Invalid ISO date', validator: v => !v || isValidISO(v) }],
});
const nlValidation = useValidation({
  source: nlTime,
  rules: [{ message: 'Invalid ISO date', validator: v => !v || isValidISO(v) }],
});
</script>

<template>
  <c-card>
    <div flex flex-col gap-4>
      <c-input-text
        v-model:value="israelTime"
        label="Israel (IST)"
        placeholder="e.g. 2024-06-15T14:30:00+03:00"
        clearable
        :validation="israelValidation"
      />
      <c-input-text
        v-model:value="bangaloreTime"
        label="Bangalore (IST)"
        placeholder="e.g. 2024-06-15T17:00:00+05:30"
        clearable
        :validation="bangaloreValidation"
      />
      <c-input-text
        v-model:value="nlTime"
        label="Netherlands (CET)"
        placeholder="e.g. 2024-06-15T13:30:00+02:00"
        clearable
        :validation="nlValidation"
      />
    </div>

    <n-divider />

    <div flex justify-center>
      <c-button @click="seedCurrentTime">
        Use current time
      </c-button>
    </div>
  </c-card>
</template>

<style lang="less" scoped></style>
