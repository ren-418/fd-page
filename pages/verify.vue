<template>
  <div class="md:container mx-0 lg:mx-auto pt-5">
    <div class="grid grid-cols-1 md:grid-cols-2 p-0 gap-10 items-center lg:pl-10 lg:pr-32 w-full">
      <div class="hidden md:block">
        <img src="../assets/images/bg.png" />
        <h1 class="text-lg">
          <span class="text-active">FlickerAds</span> Post locally and Connect
          locally
        </h1>
      </div>
      <div class="w-full bg-none md:bg-white p-5 rounded-xl flex flex-col gap-10 md:shadow-xl card-height">
        <h1 class="text-2xl">
          Welcome to <span class="text-active underline">FlickerAds</span>
        </h1>
        <div class="flex flex-col gap-3">
          <div v-if="isEmailUse" class="icon-prefix-input text-base email-input-wrapper resend">
            <Icon name="email" />
            <input v-model="email" type="email" name="email" class="form-control font-normal border w-full p-2"
              placeholder="Enter your email " required maxlength="256" />
            <button class="flex btn-default rounded-lg bg-active text-white" @click="send">
              Resend code
            </button>
          </div>
          <div v-if="!isEmailUse" class="phone-number-input text-base email-input-wrapper resend w-100">
            <PhoneNumber v-model="phoneNumberObj" :required="!isEmailUse" :placeholder="'Phone Number'" />
            <button class="flex btn-default rounded-lg bg-active text-white" @click="send">
              Resend code
            </button>
          </div>
          <div v-if="isEmailUse" class="flex justify-start items-center gap-3">
            <span class="mr-2 hidden sm:inline">Don't have an email?</span>
            <div class="flex items-center gap-2">
              <img src="../assets//images//icons/mobile.svg" width="22" />
              <a href="javascript:;" tabindex="-1" @click="isEmailUse = false" class="text-color-2">Use phone
                number.</a>
            </div>
          </div>
          <div v-if="!isEmailUse" class="flex justify-start items-center gap-3 w-96">
            <span class="mr-2 hidden sm:inline">Having trouble with phone?</span>
            <div class="flex items-center gap-2">
              <img src="../assets//images//icons/mobile.svg" width="22" />
              <a href="javascript:;" tabindex="-1" @click="isEmailUse = true" class="text-color-2">Use email
                address.</a>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3 p-5 border border-color-2 rounded-lg">
          <div class="flex gap-1">
            <Icon name="checkbox" class="text-green-600 w-5" />
            <span>Enter the 4 digital verification code</span>
          </div>
          <input class="border border-color-2 p-3 text-xl rounded-lg" placeholder="Enter code here" />
          <div class="flex justify-center">
            <button
              class="flex btn-default rounded-lg items-center gap-3 justify-center bg-active text-white text-base w-full md:w-40">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Icon from "~/components/Icon.vue";
import PhoneNumber from "~/components/PhoneNumber.vue";
const { $swal } = useNuxtApp();
const phoneNumberObj = ref({
  country_id: 231,
  code: "+1",
  number: "",
});
const isEmailUse = ref(true);
const email = ref("")
const send = () => {
  if (email.value === "" && !!isEmailUse.value) {
    $swal.fire({
      text: 'Please input email',
      icon: 'warning'
    })
    return;
  }
  if (phoneNumberObj.value.number === "" && !isEmailUse.value) {
    $swal.fire({
      text: 'Please input your phonr number',
      icon: 'warning'
    })
    return;
  }
};
</script>
<style lang="scss" scoped>
.email-input-wrapper {
  &.resend {
    position: relative;

    button {
      position: absolute;
      top: 1px;
      right: 0px;
      z-index: 3;
    }

    input {
      padding-right: 170px;
    }
  }
}
</style>
