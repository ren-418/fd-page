<template>
  <div class="md:container mx-0 lg:mx-auto pt-5">
    <div class="grid grid-cols-1 md:grid-cols-2 p-0  gap-10 items-center lg:pl-10 lg:pr-32 w-full">
      <div class="hidden md:block w-full">
        <img src="../assets/images/bg.png" />
        <h1 class="text-lg">
          <span class="text-active">FlickerAds</span> Post locally and Connect
          locally
        </h1>
      </div>
      <div class="w-full bg-none md:bg-white p-5 rounded-xl flex flex-col gap-8 md:shadow-xl card-height">
        <div class="flex flex-col gap-3 border border-color-2 rounded-lg">
          <h1 class="text-center text-2xl p-3 card-bg-2">Forgot username</h1>
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
            <div v-if="!isEmailUse" class="phone-number-input">
              <PhoneNumber v-model="phoneNumberObj" :required="!isEmailUse" @input="handlePhoneNumberInput"
                :placeholder="'Enter Registered Phone Number'" />
            </div>
            <div class="flex justify-center">
              <button
                class="flex btn-default rounded-lg items-center gap-3 justify-center bg-active text-white text-base w-full md:w-40"
                @click="send">
                Send username
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div class="flex gap-1 justify-start mt-1">
            <Icon name="user" class="w-6" />
            <span>Forgot password?</span>
            <NuxtLink to="/forgot-password" class="text-color-2">Click here</NuxtLink>
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
const isEmailUse = ref(true);
const { $swal } = useNuxtApp();

const field = computed(() => isEmailUse.value ? 'email' : 'phone_number');
const email = ref('')

const phoneNumberObj = ref({
  country_id: 231,
  code: "+1",
  number: "",
});

const handlePhoneNumberInput = (value: any) => {
  console.log('Phone number updated:', value);
  phoneNumberObj.value = value;
};

const send = async () => {

  if (isEmailUse.value) {
    console.log('Current email:', email.value);
    if (!email.value || !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      $swal.fire({
        text: 'Please enter a valid email address',
        icon: 'warning'
      })
      return;
    }
  }

  try {
    const requestBody = {
      field: field.value,
      email: email.value,
      phone_number: !isEmailUse.value ? `${phoneNumberObj.value.code}${phoneNumberObj.value.number}` : '',
    }

    console.log('Sending request:', requestBody);

    const { data, error } = await useFetch('/api/v01/username/email', {
      baseURL: 'https://auth.flickerpage.com',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody
    });

    if (error.value) {
      throw error.value;
    }

    if (data.value) {
      $swal.fire({
        text: (data.value as any).message || 'Username has been sent successfully',
        icon: 'success'
      });
    }
  } catch (error: any) {
    $swal.fire({
      text: error?.data?.errors.phone_number[0] || 'Failed to send username. Please try again.',
      icon: 'error'
    });
  }
};
</script>
<style lang="scss" scoped></style>
