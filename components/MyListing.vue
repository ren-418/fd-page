<template>
    <div class="flex flex-col w-full">
        <div class="w-full p-5 shadow-md sm:rounded-lg">
            <div class="flex flex-col justify-between w-full gap-3 pb-4 lg:flex-row lg:gap-0 mx-20px">
                <div class="flex flex-row w-full gap-4 items-center justify-between sm:justify-center">
                    <p>Manage Listing</p>
                    <div class=" bg-white">
                        <label for="table-search" class="sr-only">Search</label>
                        <div class="relative mt-1">
                            <div
                                class="absolute inset-y-0 rtl:inset-l-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="table-search"
                                class="flex text-center p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-25 sm:w-80 bg-white outline-none"
                                placeholder="Search for items">
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-3 items-center justify-center w-full sm:gap-7 sm:flex-row">
                    <div class="flex w-full flex-row gap-4 items-center justify-between sm:justify-center">
                        <p>Location</p>
                        <div class=" bg-white">
                            <label for="table-search" class="sr-only">Search</label>
                            <div class="relative mt-1">
                                <div
                                    class="absolute inset-y-0 rtl:inset-l-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <Icon name="location" class="w-4 h-4 text-gray-500" />
                                </div>
                                <input type="text" id="table-search"
                                    class="flex text-center p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-25 bg-white outline-none"
                                    placeholder="Enter City Name">
                            </div>
                        </div>
                    </div>
                    <div class="flex w-full flex-row gap-4 items-center justify-between sm:justify-center">
                        <p>Status</p>
                        <div class=" bg-white">
                            <select
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none">
                                <option value="all">All Posts</option>
                                <option value="inactive">Inactive</option>
                                <option value="active">Active</option>
                                <option value="expired">Expired</option>
                                <option value="blocked">Blocked</option>
                                <option value="Deleted">Deleted</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex w-full overflow-auto lg:overflow-hidden">
                <table class="text-sm text-left w-full rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-white bg-[#008080]">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Subject
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Posted
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Expires
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b hover:bg-gray-50">
                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-color-2">
                                Microsoft Surface Pro
                            </th>
                            <td class="px-6 py-4">
                                White
                            </td>
                            <td class="px-6 py-4">
                                Laptop PC
                            </td>
                            <td class="px-6 py-4">
                                $1999
                            </td>
                            <td class="px-6 py-4">
                                $1999
                            </td>
                            <td class="px-6 py-4">
                                $1999
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    <Icon name="trash" class="w-5 h-5" />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex w-full justify-end pt-8 text-[12px]">
                <nav class="flex items-center gap-x-1" aria-label="Pagination">
                    <button type="button"
                        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                        aria-label="Previous">
                        <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="m15 18-6-6 6-6"></path>
                        </svg>
                        <span>Previous</span>
                    </button>
                    <div class="flex items-center gap-x-1">
                        <button type="button"
                            class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                            aria-current="page">1</button>
                        <button type="button"
                            class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">2</button>
                        <button type="button"
                            class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">3</button>
                    </div>
                    <button type="button"
                        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                        aria-label="Next">
                        <span>Next</span>
                        <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import { ref } from 'vue';
const page = ref(1)
const items = ref(Array(55))

</script>

<style scoped></style>
