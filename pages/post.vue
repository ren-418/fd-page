<template>
    <div class="w-full mx-auto">
        <UStepper ref="stepper" :items="items" :linear="true">
            <template #content="{ item }">
                <div class="p-4 border rounded-lg bg-gray-50">
                    
                    <div class="mt-4">
                        <div v-if="item.slot === 'address'" class="space-y-4">
                            first
                        </div>

                        <div v-if="item.slot === 'shipping'" class="space-y-4">
                            second
                        </div>

                        <div v-if="item.slot === 'checkout'" class="space-y-4">
                            third
                        </div>
                    </div>
                </div>
            </template>
        </UStepper>

        <div class="flex gap-2 justify-between mt-4">
            <UButton 
                leading-icon="i-lucide-arrow-left" 
                :disabled="!stepper?.hasPrev" 
                @click="stepper?.prev()"
                variant="outline"
            >
                Previous
            </UButton>

            <UButton
            trailing-icon="i-lucide-arrow-right"
            :disabled="!stepper?.hasNext"
            @click="stepper?.next()"
          >
            Next
          </UButton>
        </div>
    </div>
</template>

<script setup lang="ts">

const stepper = useTemplateRef('stepper')
const shippingMethod = ref('standard')

const items = [
    {
        slot: 'address',
        title: 'Address',
        description: 'Add your shipping address details',
        icon: 'i-lucide-house'
    }, 
    {
        slot: 'shipping',
        title: 'Shipping',
        description: 'Choose your preferred shipping method',
        icon: 'i-lucide-truck'
    }, 
    {
        slot: 'checkout',
        title: 'Checkout',
        description: 'Review and confirm your order',
        icon: 'i-lucide-check-circle'
    }
]
</script>