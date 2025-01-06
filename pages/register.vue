<template>
  <div class="md:container mx-0 lg:mx-auto pt-5">
    <div
      class="grid grid-cols-1 md:grid-cols-2 p-0 gap-10 items-center lg:pl-10 lg:pr-32 w-full"
    >
      <div class="hidden md:block">
        <img src="../assets/images/bg.png" />
        <h1 class="text-lg">
          <span class="text-active">FlickerAds</span> Post locally and Connect
          locally
        </h1>
      </div>
      <div
        class="w-full bg-none md:bg-white p-5 rounded-xl flex flex-col gap-5 md:shadow-xl card-height"
      >
        <h1 class="text-2xl">
          Welcome to <span class="text-active underline">FlickerAds</span>
        </h1>
        <div class="flex flex-col gap-2 md:gap-1">
          <div class="flex flex-col md:flex-row gap-2 w-full justify-between">
            <div class="icon-prefix-input text-base w-full">
              <Icon name="user" />
              <input
                v-model="form.first_name"
                class="form-control font-normal border w-full p-2"
                type="text"
                name="name"
                autocomplete="username"
                placeholder="First name"
                maxlength="128"
                required
                :onchange="(e:any) => onInput(e,'first_name','isVaildName') "
              />
            </div>
            <div class="icon-prefix-input text-base w-full">
              <Icon name="user" />
              <input
                v-model="form.last_name"
                class="form-control font-normal border w-full p-2"
                type="text"
                name="name"
                autocomplete="username"
                placeholder="Last name(optional)"
                maxlength="128"
              />
            </div>
          </div>
          <div style="color: red" v-if="!validateStatus?.isVaildName?.status">
              {{ validateStatus?.isVaildName?.msg }}
            </div>
          <div v-if="isEmailUse" class="icon-prefix-input text-base">
            <Icon name="email" />
            <input
              v-model="form.email"
              type="email"
              name="email"
              class="form-control font-normal border w-full p-2"
              placeholder="Enter your email "
              required
              maxlength="256"
              :onchange="(e:any) => onInput(e,'email','isVaildEmail') "
            />
          </div>
          <div style="color: red" v-if="!validateStatus?.isVaildEmail?.status">
            {{ validateStatus?.isVaildEmail?.msg }}
          </div>
          <div v-if="!isEmailUse" class="mb-2">
            <div class="phone-number-input has-info">
              <PhoneNumber
                v-model="phoneNumberObj"
                :required="!isEmailUse"
                :placeholder="'Phone Number'"
              />
            </div>
          </div>
          <div
            v-if="isEmailUse"
            class="flex justify-end items-center gap-2 md:gap-3"
          >
            <span class="mr-2">Don't have an email?</span>
            <div class="flex items-center gap-2">
              <img src="../assets//images//icons/mobile.svg" width="22" />
              <a
                href="javascript:;"
                tabindex="-1"
                @click="isEmailUse = false"
                class="text-color-2"
                >Use phone number.</a
              >
            </div>
          </div>
          <div
            v-if="!isEmailUse"
            class="flex justify-end items-center gap-2 md:gap-3"
          >
            <span class="mr-2">Having trouble with phone?</span>
            <div class="flex items-center gap-2">
              <img src="../assets//images//icons/mobile.svg" width="22" />
              <a
                href="javascript:;"
                tabindex="-1"
                @click="isEmailUse = true"
                class="text-color-2"
                >Use email address.</a
              >
            </div>
          </div>
          <div class="flex flex-col gap-2 md:gap-1">
            <div class="icon-prefix-input text-base">
              <Icon name="user" />
              <input
                v-model="form.username"
                class="form-control font-normal border w-full p-2 indent-3"
                type="text"
                name="username"
                autocomplete="username"
                placeholder="Choose username"
                maxlength="128"
                required
                :onchange="(e:any) => onInput(e,'username','isVaildUsername') "
              />
            </div>
            <div
              style="color: red"
              v-if="!validateStatus?.isVaildUsername?.status"
            >
              {{ validateStatus?.isVaildUsername?.msg }}
            </div>
            <div class="icon-prefix-input text-base">
              <Icon name="lock" />
              <input
                v-model="form.password"
                class="form-control font-normal border w-full p-2 indent-3"
                type="password"
                name="password"
                autocomplete="password"
                placeholder="Choose password"
                maxlength="128"
                required
                :onchange="(e:any) => onInput(e,'password','isStrongPassword') "
              />
            </div>
            <div
              style="color: red"
              v-if="!validateStatus?.isStrongPassword?.status"
            >
              {{ validateStatus?.isStrongPassword?.msg }}
            </div>
          </div>
          <div class="text-color-3">
            <input type="checkbox" class="w-5" />
            <div class="w-95 inline">
              By clicking Register, you agree to our
              <NuxtLink target="_blank" class="text-color-2"
                >Terms of use</NuxtLink
              >
              and
              <NuxtLink class="text-color-2 indent-3" target="_blank"
                >Privacy policy</NuxtLink
              >
            </div>
          </div>
          <div class="flex items-center justify-center">
            <button
              class="flex btn-default rounded-lg items-center justify-center gap-3 bg-active text-white w-60"
            >
              <Icon name="sign-in" />
              Register
            </button>
          </div>
          <div class="flex gap-1 justify-center md:justify-start mt-1">
            <Icon name="user-check" class="w-6" />
            <span>Already have an account?</span>
            <NuxtLink to="/login" class="text-color-2">Sign in here</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Icon from "~/components/Icon.vue";
import PhoneNumber from "~/components/PhoneNumber.vue";

const phoneNumberObj = ref({
  country_id: 231,
  code: "+1",
  number: "",
});

const form = ref({
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  con_password: "",
});

const isEmailUse = ref(true);

const onInput = (e: any, k: string, v: any) => {
  console.log("on input :::", k, v);
  const value = e.target.value;
  const validation = () => {
    if (k === "first_name") {
      if (!value) {
        return { status: false, msg: "First name is required!" };
      }
      return { status: true, msg: "" };
    }
    if (k === "username") {
      if (!value) {
        return { status: false, msg: "Username is required!" };
      }
      return { status: true, msg: "" };
    }

    if (k === "email") {
      return emailValidator(value);
    }
    if (k === "password") {
      return strongPasswordValidator(value);
    }
  };
  const res = validation();
  validateStatus.value[v] = res;
};

const validateStatus = ref({
  isVaildName: {
    msg: "",
    status: false,
  },
  isValidUsername: {
    msg: "",
    status: false,
  },
  isValidEmail: {
    msg: "",
    status: false,
  },
  isStrongPassword: {
    msg: "",
    status: false,
  },
  isMatch: {
    msg: "",
    status: false,
  },
  isDate: {
    msg: "",
    status: false,
  },
} as any);
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
