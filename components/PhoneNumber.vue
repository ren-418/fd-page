<template>
  <div class="input-group phone-number-input">
    <div class="input-group-prepend">
      <button
        type="button"
        class="btn flex items-center gap-1 dropdown-toggle border border-color-1 pr-5 py-2 px-2 rounded-lg rounded-r-none"
        :class="btnClass"
        data-toggle="dropdown"
        @click.prevent="toggleDropDown = !toggleDropDown"
      >
        <img
          v-if="selectedCountry"
          :src="getFlag(selectedCountry)"
          width="24"
          height="16"
        />
        +{{ selectedCountry?.phone_code }}
        <div v-if="selectedCountry">
          <Icon
            name="chevron-down"
            class="text-active w-5"
          />
        </div>
      </button>
      <div
        v-if="toggleDropDown"
        class="dropdown-menu rounded-lg border-color-1 px-0 py-1"
      >
        <a
          href="javascript:;"
          v-for="item in countries"
          :key="item.id"
          class="dropdown-item"
          @click.prevent="selectCountry(item)"
        >
          <img
            :src="getFlag(item)"
            :alt="item.abbreviation"
            width="24"
            height="16"
          />
          <span class="ml-1">+{{ item.phone_code }} ({{ item.name }})</span>
        </a>
      </div>
    </div>
    <input
      v-model="number"
      type="text"
      class="form-control w-full border border-color-1 rounded-l-none text-base indent-3 font-normal"
      name="phone_number"
      :class="inputClass"
      :placeholder="placeholder"
      maxlength="10"
      :required="required"
      @keypress="numbersOnly"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";

const runtimeConfig = useRuntimeConfig();

interface Country {
  id: number;
  phone_code: string;
  abbreviation: string;
  name: string;
  flag: string;
}

interface PhoneNumber {
  country_id: number;
  code: string;
  number: string;
}

const props = defineProps<{
  inputClass?: string | Record<string, unknown>;
  btnClass?: string | Record<string, unknown>;
  required?: boolean;
  value?: PhoneNumber;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "input", phoneNumber: PhoneNumber): void;
}>();

const countryId = ref(231);
const number = ref("");
const toggleDropDown = ref(false);

const { countries } = useCountries() as any;

const selectedCountry: any = computed(() => {
  return countries.value.find((i: any) => i.id === countryId.value);
});

const phoneNumberObj = computed(
  (): PhoneNumber => ({
    country_id: selectedCountry.value ? selectedCountry.value.id : 231,
    code: selectedCountry.value ? `+${selectedCountry.value.phone_code}` : "+1",
    number: number.value,
  })
);

watch(
  () => props.value,
  (val: any) => {
    countryId.value = val.country_id;
    number.value = val.number;
  },
  { deep: true }
);

watch(number, () => {
  emit("input", phoneNumberObj.value);
});

watch(countryId, () => {
  emit("input", phoneNumberObj.value);
});

const getFlag = (item: Country) => {
  const authApi = runtimeConfig.public.authApiUrl;
  return `${authApi?.match(/^(https?:\/\/[^/]+)\//)?.[1]}/${item.flag}`;
};

const selectCountry = (item: Country) => {
  toggleDropDown.value = false;
  countryId.value = item.id;
};

const numbersOnly = (evt: KeyboardEvent) => {
  const charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode < 48 || charCode > 57) {
    evt.preventDefault();
  }
};
</script>

<style lang="scss" scoped>
.phone-number-input {
  display: flex;

  .dropdown-toggle {
    border-color: #d3ddeb !important;
  }
  .dropdown-menu {
    max-height: 200px;
    z-index: 10;
    position: absolute;
    overflow-y: scroll;
    .dropdown-item {
      color: #64748b;
      display: flex;
      align-items: center;
      font-size: 13.2px;
      padding: 2px 8px;
      span {
        display: inline-block;
        max-width: calc(100% - 30px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
