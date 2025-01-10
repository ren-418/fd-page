<template>
  <div class="md:container mx-0 lg:mx-auto pt-5">
    <div class="grid grid-cols-1 md:grid-cols-2 p-0 gap-10 items-center lg:pl-10 lg:pr-32 w-full">
      <div class="hidden md:block w-full">
        <img src="../assets/images/bg.png" />
        <h1 class="text-lg">
          <span class="text-active">FlickerAds</span> Post locally and Connect
          locally
        </h1>
      </div>
      <div class="w-full bg-none md:bg-white p-5 rounded-xl flex flex-col gap-8 md:shadow-xl card-height">
        <div class="flex flex-col gap-3 border border-color-2 rounded-lg">
          <h1 class="text-center text-2xl p-3 card-bg-2">Forgot password</h1>
          <div class="p-5 flex flex-col gap-5">
            <div v-if="isEmailUse" class="flex justify-start items-center gap-3">
              <div class="flex items-center gap-2">
                <img src="../assets//images//icons/mobile.svg" width="22" />
                <a href="javascript:;" tabindex="-1" @click="isEmailUse = false" class="text-color-2">Use phone
                  number.</a>
              </div>
            </div>
            <div v-if="!isEmailUse" class="flex justify-start items-center gap-3">
              <div class="flex items-center gap-2">
                <img src="../assets//images//icons/mobile.svg" width="22" />
                <a href="javascript:;" tabindex="-1" @click="isEmailUse = true" class="text-color-2">Use email
                  address.</a>
              </div>
            </div>
            <div v-if="isEmailUse" class="icon-prefix-input text-base">
              <Icon name="email" />
              <input v-model="email" type="email" name="email" class="form-control font-normal border w-full p-2"
                placeholder="Enter registered email address" required maxlength="256" />
            </div>
            <div v-if="!isEmailUse" class="phone-number-input has-info">
              <PhoneNumber v-model="phoneNumberObj" :required="!isEmailUse"
                :placeholder="'Enter Registered Phone Number'" />
            </div>
            <div class="flex justify-center">
              <button
                class="flex btn-default rounded-lg items-center gap-3 justify-center bg-active text-white text-base w-full md:w-40"
                @click="send">
                Send reset link
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div class="flex gap-1 justify-start mt-1">
            <Icon name="user" class="w-6" />
            <span>Forgot username?</span>
            <NuxtLink to="/forgot-username" class="text-color-2">Click here</NuxtLink>
          </div>
          <div class="flex gap-1 justify-start mt-1">
            <Icon name="sign-in" class="w-6" />
            <span>Want to login to your account?</span>
            <NuxtLink to="/login" class="text-color-2">Login</NuxtLink>
          </div>
          <div class="flex gap-1 justify-start mt-1">
            <Icon name="user-plus" class="w-6" />
            <span>Don't have an account?</span>
            <NuxtLink to="/register" class="text-color-2">Sign up</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Icon from "~/components/Icon.vue";
import PhoneNumber from "~/components/PhoneNumber.vue";
const isEmailUse = ref(true);
const email = ref("");
const phoneNumberObj = ref({
  country_id: 231,
  code: "+1",
  number: "",
});

const send = () => {
  if (email.value === "" && !!isEmailUse.value) {
    alert("Please input email");
    return;
  }

  if (phoneNumberObj.value.number === "" && !isEmailUse.value) {
    alert("Please input your phonr number");
    return;
  }
};
</script>
<style lang="scss" scoped>
.phone-number-input {
  &.has-info {
    position: relative;

    input {
      padding-right: 34px;
    }

    .info {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 3;
    }
  }
}
</style>
