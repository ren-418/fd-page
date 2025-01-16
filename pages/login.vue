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
        <div class="flex gap-3 items-center justify-start md:justify-between">
          <h2 class="text-base">Quick Sign-in</h2>
          <div class="flex gap-2">
            <div class="flex gap-1 bg-color-1 rounded-lg p-2 social-btn border-color-1 border cursor-pointer"
              @click="handleGoogleLogin">
              <img src="../assets//images//google.png" width="20" height="10" />
              <span class="hidden md:inline">Gmail</span>
            </div>
            <div class="flex gap-1 bg-color-1 rounded-lg p-2 social-btn border-color-1 border cursor-pointer">
              <img src="../assets//images//facebook.png" width="20" />
              <span class="hidden md:inline">Facebook</span>
            </div>
            <div class="flex gap-1 bg-color-1 rounded-lg p-2 social-btn border-color-1 border cursor-pointer">
              <img src="../assets//images//linkedin.png" width="20" />
              <span class="hidden md:inline">Linkedin</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <h3>Username</h3>
              <NuxtLink to="forgot-username" class="text-color-2">Forgot username?</NuxtLink>
            </div>
            <div class="icon-prefix-input text-base">
              <Icon name="user" />
              <input v-model="form.username" class="form-control font-normal border w-full p-2" type="text"
                name="username" autocomplete="username" placeholder="Enter username" maxlength="128" required />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <h3>Password</h3>
              <NuxtLink to="forgot-password" class="text-color-2">Forgot password?</NuxtLink>
            </div>
            <div class="icon-prefix-input text-base">
              <Icon name="lock" />
              <input v-model="form.password" class="form-control font-normal border w-full p-2" type="password"
                name="password" autocomplete="username" placeholder="Enter password" maxlength="128" required />
            </div>
          </div>
        </div>
        <div class="flex gap-3 flex-col md:flex-row justify-between">
          <button
            class="flex btn-default rounded-lg items-center gap-3 justify-center bg-active text-white w-full md:w-45"
            :class="!!loading && 'btn-loading'" @click="handleLogin">
            <Icon name="sign-in" />
            Sign In
          </button>
          <NuxtLink to="register"
            class="flex btn-default bg-non text-color-1 rounded-lg items-center gap-3 justify-center w-full md:w-45">
            <img src="../assets/images/icons/user-plus.svg" width="22" />
            Sign Up
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Icon from "~/components/Icon.vue";
import axios from "axios";
import { useRuntimeConfig } from "#app";
import { useCookie } from '#app'
import 'sweetalert2/src/sweetalert2.scss'
import 'sweetalert2/dist/sweetalert2.css'
const { $swal } = useNuxtApp()

const useToken = useCookie('auth_token', { maxAge: 6000 });

const setToken = (val: any) => {
  useToken.value = val;
}
if (useToken.value) {
  navigateTo('/');
}
const config = useRuntimeConfig();

const form = ref({
  username: "",
  password: "",
});


const loading = ref(false);
const { user, setUser } = useUserData();

const handleGoogleLogin = () => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.public.googleClientId}&redirect_uri=${encodeURIComponent(
    `${window.location.origin}`
  )}&response_type=code&scope=email profile`;

  const popup = window.open(
    googleAuthUrl,
    "GoogleAuthPopup",
    "width=500,height=600,scrollbars=yes"
  );

  if (!popup) {
    $swal.fire({
      text: 'Please enable popups for this site to continue.',
      icon: 'warning'
    })
    return;
  }

  const interval = setInterval(() => {
    if (popup.closed) {
      clearInterval(interval);
      console.log("Popup closed");
    }
  }, 500);


  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin) {
      console.warn("Invalid origin:", event.origin);
      return;
    }

    const { code, error } = event.data;
    if (code) {
      console.log("Authorization code received:", code);

    } else if (error) {
      console.error("Error during Google login:", error);
    }
  });
};

const handleLogin = async () => {

  try {
    console.log("form.value ::", form.value)
    loading.value = true;
    const res = await axios.post('login', form.value)
    console.log("res . status", res.data.status)
    if (res.data.status === "Success") {
      setToken(res.data.data.token);
      setUser(res.data.data.user);
      await $swal.fire({
        text: 'Logged in successfully',
        icon: 'success'
      })
      navigateTo('/')
    }
    loading.value = false;
  } catch (err: any) {

    console.log("eroror ", err.message)

  } finally {
    loading.value = false;
  }
};

</script>

<style lang="scss" scoped>
.social-btn {
  background-color: #fafafc;
}

.bg-non {
  background: none !important;
}
</style>
