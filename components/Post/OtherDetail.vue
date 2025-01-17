<template>
    <div class="flex w-full bg-transparent p-5 md:bg-white px-[30px] lg:px-[140px]">
        <div v-if="category?.name === 'Services'"
            class="flex flex-col w-full h-auto items-start px-[10px] md:px-[30px] lg:px-[100px] gap-5">
            <div class="flex flex-col w-full h-auto gap-5 sm:flex-row">
                <div class="flex flex-col w-full h-full gap-2">
                    <div class="flex flex-col w-full gap-2 ">
                        <label class="text-[14px]">
                            Business or your name <span class="text-[#dc3545]">&nbsp;*</span>
                        </label>
                        <input v-model="businessName"
                            class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Enter business or your name" />
                    </div>

                    <div class="flex flex-col w-full gap-2">
                        <label class="text-[14px]">
                            List of Services <span class="text-[#dc3545]">&nbsp;*</span>
                        </label>
                        <div class="flex flex-row gap-2 justify-between">
                            <input v-model="newService" type="text"
                                class="py-2 px-4 w-[80%] block outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Enter service" @keyup.enter="addService" />
                            <div class="flex btn btn-active items-center justify-center text-center cursor-pointer min-w-[80px]"
                                @click="addService">
                                + Add
                            </div>
                        </div>
                    </div>

                    <ul class="flex md:hidden flex-wrap w-full gap-3">
                        <li v-for="(service, index) in services" :key="index"
                            class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                            <span>{{ service }}</span>
                            <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                                @click="removeService(service)" />
                        </li>
                    </ul>
                </div>
                <div class="flex w-full flex-col gap-2">
                    <label class="text-[14px]">
                        Open hours
                    </label>
                    <textarea v-model="openHours"
                        class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[135px]"
                        placeholder="Enter open hours"></textarea>
                </div>
            </div>
            <ul class="hidden md:flex flex-wrap w-full gap-3">
                <li v-for="(service, index) in services" :key="index"
                    class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                    <span>{{ service }}</span>
                    <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                        @click="removeService(service)" />
                </li>
            </ul>
        </div>
        <div v-if="category?.name === 'For Sale'" class="flex flex-col w-full h-auto items-start gap-4">
            <div class="flex flex-col md:flex-row w-full gap-4">
                <div class="flex flex-col w-full gap-2 ">
                    <label class="text-[14px]">
                        Item for sale <span class="text-[#dc3545]">&nbsp;*</span>
                    </label>
                    <input
                        class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                        placeholder="Ex. Macbook Pro" />
                </div>
                <div class="flex flex-col w-full gap-2 ">
                    <label class="text-[14px]">
                        Sale by
                    </label>
                    <select
                        class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1">
                        <option value="individualOwner">Individual/Owner</option>
                        <option value="localStore">Local Store</option>
                        <option value="dealer">Dealer</option>
                        <option value="wholesaleMarket">Wholesale Market</option>
                        <option value="other">Other</option>
                    </select>
                </div>

            </div>
            <div class="flex flex-col md:flex-row w-full gap-4">
                <div class="flex flex-col w-full gap-2 ">
                    <label class="text-[14px]">
                        Condition
                    </label>
                    <select
                        class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1">
                        <option value="new">New</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="likeNew">Like New</option>
                        <option value="openBox">Open Box</option>
                    </select>
                </div>
                <div class="flex flex-col w-full gap-2 ">
                    <label class="text-[14px]">
                        Asking price
                    </label>
                    <div class="relative">
                        <input
                            class="py-2 px-7 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Ex. 1050" />
                        <span class="absolute left-3 top-2 z-10 text-base">$</span>
                    </div>
                </div>

            </div>
            <div class="flex flex-col md:flex-row w-full gap-4">
                <div class="flex flex-col w-full gap-2 ">
                    <label class="text-[14px]">
                        Make
                    </label>
                    <input
                        class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                        placeholder="Enter " />
                </div>
                <div class="flex flex-col w-full gap-2 ">
                    <label class="text-[14px]">
                        Item for sale
                    </label>
                    <input
                        class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                        placeholder="Ex. Macbook Pro" />
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <label class="text-[14px]">
                    Additional Info
                </label>
                <textarea
                    class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[85px]"
                    placeholder="Enter details here..."></textarea>
            </div>
        </div>
        <div v-if="category?.name === 'Jobs'" class="flex flex-col w-full h-auto items-start gap-6">
            <div class="flex flex-col w-full gap-2">
                <p class="text-[20px]">Key Details</p>
                <div class="flex flex-col w-full gap-4 border border-color-1 p-4 rounded-lg">
                    <div class="flex flex-col md:flex-row w-full gap-4">
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Item for sale <span class="text-[#dc3545]">&nbsp;*</span>
                            </label>
                            <input
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Ex. Macbook Pro" />
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Sale by
                            </label>
                            <select
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1">
                                <option value="individualOwner">Individual/Owner</option>
                                <option value="localStore">Local Store</option>
                                <option value="dealer">Dealer</option>
                                <option value="wholesaleMarket">Wholesale Market</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                    </div>
                    <div class="flex flex-col md:flex-row w-full gap-4">
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Condition
                            </label>
                            <select
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1">
                                <option value="new">New</option>
                                <option value="excellent">Excellent</option>
                                <option value="good">Good</option>
                                <option value="average">Average</option>
                                <option value="likeNew">Like New</option>
                                <option value="openBox">Open Box</option>
                            </select>
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Asking price
                            </label>
                            <div class="relative">
                                <input
                                    class="py-2 px-7 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                    placeholder="Ex. 1050" />
                                <span class="absolute left-3 top-2 z-10 text-base">$</span>
                            </div>
                        </div>

                    </div>
                    <div class="flex flex-col md:flex-row w-full gap-4">
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Make
                            </label>
                            <input
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Enter " />
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Item for sale
                            </label>
                            <input
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Ex. Macbook Pro" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full gap-2">
                <p class="text-[20px]">Benefits</p>
                <div class="flex flex-wrap w-full gap-4 border border-color-1 p-4 rounded-lg">
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        401(k)plan
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        Dental Insurance
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        Paid Time Off(PTO)
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        Life Insurance
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        Health Insurance
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        Paid Sick Leave
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        Vision Insurance
                    </span>
                    <div v-for="(benefit, index) in benefits" :key="index" class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        <span>{{ benefit }}</span>
                    </div>
                    <div class="flex flex-row gap-2 justify-between">
                        <input type="text"
                            class="py-2 px-4 max-w-[150px] block outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Ex. Retirement Benefits" v-model="newBenefit"
                            @keyup.enter="() => { addBenefit(newBenefit); newBenefit = ''; }" />
                        <div class="flex btn btn-active items-center justify-center text-center cursor-pointer min-w-[80px]"
                            @click="() => { addBenefit(newBenefit); newBenefit = ''; }">
                            Add
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full gap-2">
                <p class="text-[20px]">Work authorization required</p>
                <div class="flex flex-wrap w-full gap-4 border border-color-1 p-4 rounded-lg">
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        Any Valid Work Visa
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        US Citizen
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        Green Card
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        EAD TN
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        H1B
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        L1
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        L2
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        CPT
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        OPT/STEM
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        M1
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        J1
                    </span>
                    <span class="flex flex-row gap-2 items-center">
                        <input type="checkbox" />
                        Other
                    </span>
                </div>
            </div>
            <div class="flex flex-col w-full gap-4">
                <span class="flex flex-row gap-2 items-center">
                    <input type="checkbox" />
                    We are e-verified and Equal Opportunity Employer(EOE)
                </span>
                <span class="flex flex-row gap-2 items-center">
                    <input type="checkbox" />
                    Invite people with disabilities for this position
                </span>
                <span class="flex flex-row gap-2 items-center">
                    <input type="checkbox" />
                    Work visa sponsership available for this position
                </span>
                <span class="flex flex-row gap-2 items-center">
                    <input type="checkbox" />
                    Direct applicants only. No third party recruiters allowed apply.
                </span>
            </div>
        </div>
        <div v-if="category?.name === 'Accommodation'" class="flex flex-col w-full h-auto items-start gap-6">
            <div class="flex flex-col w-full gap-4">
                <p class="text-[20px]">Housing Details</p>
                <div class="flex flex-col w-full gap-4 border border-color-1 p-4 rounded-lg">
                    <div class="flex flex-col md:flex-row w-full gap-4">
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Accommodation Type <span class="text-[#dc3545]">&nbsp;*</span>
                            </label>
                            <input
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Ex. Apartment or Condo" />
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Bed Rooms#
                            </label>
                            <input
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Ex. 2 bed" />
                        </div>

                    </div>
                    <div class="flex flex-col md:flex-row w-full gap-4">
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Bath Rooms#
                            </label>
                            <input
                                class="py-2 px-7 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Ex. 2 bath" />
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Furnished?
                            </label>
                            <select
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1">
                                <option value="new">Semi-Furnished</option>
                                <option value="excellent">Fully-Furnished</option>
                                <option value="good">Not Furnished</option>
                            </select>
                        </div>


                    </div>
                    <div class="flex flex-col md:flex-row w-full gap-4">
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Make
                            </label>
                            <input
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Enter " />
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Item for sale
                            </label>
                            <input
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Ex. Macbook Pro" />
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row w-full gap-4">
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Property Area Size
                            </label>
                            <input
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Ex. 1450sq.ft " />
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Rent+Utilities
                            </label>
                            <div class="relative">
                                <input
                                    class="py-2 px-7 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                    placeholder="Ex. 2,100" />
                                <span class="absolute left-3 top-2 z-10 text-base">$</span>
                                <select class="absolute right-3 top-2 z-10 text-[13px] outline-none cursor-pointer">
                                    <option value="day">Day</option>
                                    <option value="month">Month</option>
                                    <option value="3month">3 Month</option>
                                    <option value="6month">6 Month</option>
                                    <option value="year">Year</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row w-full gap-4">
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Available For
                            </label>
                            <div class="flex flex-row gap-4">
                                <div class="flex flex-row gap-2 items-center">
                                    <input type="checkbox" />
                                    <span>Any Stay</span>
                                </div>
                                <div class="flex flex-row gap-2 items-center">
                                    <input type="checkbox" />
                                    <span>Long Term</span>
                                </div>
                                <div class="flex flex-row gap-2 items-center">
                                    <input type="checkbox" />
                                    <span>Short Term</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Available From
                            </label>
                            <input type="date"
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="01/1/2000" />
                            <div class="flex flex-row gap-2 items-center">
                                <input type="checkbox" />
                                <span>Available from today</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row w-full gap-4">
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Smoking Allowed
                            </label>
                            <div class="flex flex-row gap-4 items-center">
                                <div class="flex flex-row gap-2 items-center">
                                    <input type="radio" />
                                    <span>Yes</span>
                                </div>
                                <div class="flex flex-row gap-2 items-center">
                                    <input type="radio" />
                                    <span>No</span>
                                </div>
                                <div class="flex flex-row gap-2 items-center">
                                    <input type="radio" />
                                    <span>Outside only</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Pets Allowed
                            </label>
                            <div class="flex flex-row gap-4 items-center">
                                <div class="flex flex-row gap-2 items-center">
                                    <input type="radio" />
                                    <span>Yes</span>
                                </div>
                                <div class="flex flex-row gap-2 items-center">
                                    <input type="radio" />
                                    <span>No</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-full gap-2 pt-2">
                    <p class="text-[20px]">Additional Info</p>
                    <div class="flex flex-col md:flex-row w-full gap-4 border border-color-1 p-4 rounded-lg">
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Near by Places
                            </label>
                            <div class="flex flex-row gap-2 justify-between">
                                <input v-model="newPlace" type="text"
                                    class="py-2 px-4 w-[80%] block outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                    placeholder="Ex. Airport - 5 miles" @keyup.enter="addPlace" />
                                <div class="flex btn btn-active items-center justify-center text-center cursor-pointer min-w-[80px]"
                                    @click="addPlace">
                                    + Add
                                </div>
                            </div>
                            <ul class="flex flex-wrap w-full gap-3">
                                <li v-for="(place, index) in places" :key="index"
                                    class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                                    <span>{{ place }}</span>
                                    <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                                        @click="removePlace(place)" />
                                </li>
                            </ul>
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Property Amenities
                            </label>
                            <div class="flex flex-row gap-2 justify-between">
                                <input v-model="newAmenity" type="text"
                                    class="py-2 px-4 w-[80%] block outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                    placeholder="Ex. Airport - 5 miles" @keyup.enter="addAmenity" />
                                <div class="flex btn btn-active items-center justify-center text-center cursor-pointer min-w-[80px]"
                                    @click="addAmenity">
                                    + Add
                                </div>
                            </div>
                            <ul class="flex flex-wrap w-full gap-3">
                                <li v-for="(amenity, index) in amenities" :key="index"
                                    class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                                    <span>{{ amenity }}</span>
                                    <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                                        @click="removeAmenity(amenity)" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div v-if="category?.name === 'Real Estate'" class="flex flex-col w-full h-auto items-start gap-6">
            <div class="flex flex-col w-full gap-4">
                <p class="text-[20px]">Housing Details</p>
                <div class="flex flex-col w-full gap-4 border border-color-1 p-4 rounded-lg">
                    <div class="flex flex-col w-full gap-4 md:flex-row">
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Property Type
                            </label>
                            <input
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Ex. 1450sq.ft " />
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Property Area Size
                            </label>
                            <div class="relative">
                                <input
                                    class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                    placeholder="Ex. 2,100" />
                                <select class="absolute right-3 top-2 z-10 text-[13px] outline-none cursor-pointer">
                                    <option value="sqFt">Sq.ft</option>
                                    <option value="sqYd">Sq.yd</option>
                                    <option value="sqMt">Sq.mt</option>
                                    <option value="acer">Acer</option>
                                    <option value="hector">Hector</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row w-full gap-4 md:w-1/2">
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Estimated/Selling price
                            </label>
                            <input
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Ex. 1450sq.ft " />
                        </div>

                    </div>
                </div>
                <div class="flex flex-col w-full gap-2 pt-2">
                    <p class="text-[20px]">Additional Info</p>
                    <div class="flex flex-col w-full gap-4 border border-color-1 p-4 rounded-lg md:flex-row">
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Near by Places
                            </label>
                            <div class="flex flex-row gap-2 justify-between">
                                <input v-model="newPlace" type="text"
                                    class="py-2 px-4 w-[80%] block outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                    placeholder="Ex. Airport - 5 miles" @keyup.enter="addPlace" />
                                <div class="flex btn btn-active items-center justify-center text-center cursor-pointer min-w-[80px]"
                                    @click="addPlace">
                                    + Add
                                </div>
                            </div>
                            <ul class="flex flex-wrap w-full gap-3">
                                <li v-for="(place, index) in places" :key="index"
                                    class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                                    <span>{{ place }}</span>
                                    <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                                        @click="removePlace(place)" />
                                </li>
                            </ul>
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Property Amenities
                            </label>
                            <div class="flex flex-row gap-2 justify-between">
                                <input v-model="newAmenity" type="text"
                                    class="py-2 px-4 w-[80%] block outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                    placeholder="Ex. Airport - 5 miles" @keyup.enter="addAmenity" />
                                <div class="flex btn btn-active items-center justify-center text-center cursor-pointer min-w-[80px]"
                                    @click="addAmenity">
                                    + Add
                                </div>
                            </div>
                            <ul class="flex flex-wrap w-full gap-3">
                                <li v-for="(amenity, index) in amenities" :key="index"
                                    class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                                    <span>{{ amenity }}</span>
                                    <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                                        @click="removeAmenity(amenity)" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-full gap-2 pt-2">
                    <p class="text-[20px]">Realtor Details</p>
                    <div class="flex flex-col w-full gap-4 border border-color-1 p-4 rounded-lg">
                        <div class="flex flex-col w-full gap-4 md:flex-row">
                            <div class="flex flex-col w-full gap-2 ">
                                <label class="text-[14px]">
                                    Realtor
                                </label>
                                <input
                                    class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                    placeholder="Ex. Business/Realtor name" />
                            </div>
                            <div class="flex flex-col w-full gap-2 ">
                                <label class="text-[14px]">
                                    License#
                                </label>
                                <input
                                    class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                    placeholder="Ex. XX-0000-XX" />
                            </div>
                        </div>
                        <div class="flex flex-col w-full gap-2">
                            <p class="text-[14px]">
                                Business Location
                            </p>
                            <div class="flex flex-col w-full gap-2 border border-color-1 p-4 rounded-lg">
                                <div class="flex flex-col w-full gap-2 ">
                                    <label class="text-[14px]">
                                        Street Address
                                    </label>
                                    <input
                                        class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                        placeholder="Enter street address" />
                                </div>
                                <div class="flex flex-col w-full gap-4 md:flex-row">
                                    <div class="flex flex-col w-full gap-2 ">
                                        <label class="text-[14px]">
                                            Zip Code
                                        </label>
                                        <input
                                            class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                            placeholder="Zip" />
                                    </div>
                                    <div class="flex flex-col w-full gap-2 ">
                                        <label class="text-[14px]">
                                            City
                                        </label>
                                        <input
                                            class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                            placeholder="City" />
                                    </div>
                                    <div class="flex flex-col w-full gap-2 ">
                                        <label class="text-[14px]">
                                            State
                                        </label>
                                        <input
                                            class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                            placeholder="State" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Services provide in
                            </label>
                            <input
                                class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Select State" />
                        </div>
                        <div class="flex flex-col w-full gap-2 ">
                            <label class="text-[14px]">
                                Hours of Operation
                            </label>
                            <textarea
                                class="py-2 px-4 block w-full outline-none min-h-[85px] border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Enter Business Hours">
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="category?.name === 'Legal/Lawyers'"
            class="flex flex-col w-full h-auto items-start px-[10px] md:px-[30px] lg:px-[100px] gap-5">
            <div class="flex flex-col w-full gap-4">
                <div class="flex flex-col w-full gap-4 md:flex-row">
                    <div class="flex flex-col w-full gap-2 ">
                        <label class="text-[14px]">
                            Legal firm or lawyer name
                        </label>
                        <input
                            class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Ex. ABC organization" />
                    </div>
                    <div class="flex flex-col w-full gap-2 ">
                        <label class="text-[14px]">
                            License Info
                        </label>
                        <input
                            class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Ex. #2563A01" />
                    </div>
                </div>
                <div class="flex flex-col w-full gap-4">
                    <div class="flex flex-col w-full gap-4 md:flex-row">
                        <div class="flex flex-col w-full gap-2">
                            <div class="flex flex-col w-full gap-2">
                                <label class="text-[14px]">
                                    List of Services
                                </label>
                                <div class="flex flex-row gap-2 justify-between">
                                    <input v-model="newService" type="text"
                                        class="py-2 px-4 block w-[78%] outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                        placeholder="Enter service" @keyup.enter="addService" />
                                    <div class="flex btn btn-active items-center justify-center text-center cursor-pointer min-w-[120px]"
                                        @click="addService">
                                        + Add
                                    </div>
                                </div>
                            </div>
                            <ul class="flex md:hidden flex-wrap w-full gap-3">
                                <li v-for="(service, index) in services" :key="index"
                                    class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                                    <span>{{ service }}</span>
                                    <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                                        @click="removeService(service)" />
                                </li>
                            </ul>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <label class="text-[14px]">
                                Open hours
                            </label>
                            <textarea v-model="openHours"
                                class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[135px]"
                                placeholder="Enter open hours"></textarea>
                        </div>
                    </div>
                    <ul class="hidden md:flex flex-wrap w-full gap-3">
                        <li v-for="(service, index) in services" :key="index"
                            class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                            <span>{{ service }}</span>
                            <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                                @click="removeService(service)" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="category?.name === 'Repairs'" class="flex flex-col w-full h-auto items-start gap-6">
            <div class="flex flex-col w-full h-auto gap-5 md:flex-row">
                <div class="flex flex-col w-full h-full gap-2">
                    <div class="flex flex-col w-full gap-2 pb-2">
                        <label class="text-[14px]">
                            Business or your name <span class="text-[#dc3545]">&nbsp;*</span>
                        </label>
                        <input v-model="businessName"
                            class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Enter business or your name" />
                    </div>

                    <div class="flex flex-col w-full gap-2">
                        <label class="text-[14px]">
                            List of Services <span class="text-[#dc3545]">&nbsp;*</span>
                        </label>
                        <div class="flex flex-row gap-2 justify-between">
                            <input v-model="newService" type="text"
                                class="py-2 px-4 w-[80%] block outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Enter service" @keyup.enter="addService" />
                            <div class="flex btn btn-active items-center justify-center text-center cursor-pointer min-w-[80px]"
                                @click="addService">
                                + Add
                            </div>
                        </div>
                    </div>

                    <ul class="flex md:hidden flex-wrap w-full gap-3">
                        <li v-for="(service, index) in services" :key="index"
                            class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                            <span>{{ service }}</span>
                            <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                                @click="removeService(service)" />
                        </li>
                    </ul>
                </div>
                <div class="flex w-full flex-col gap-2">
                    <label class="text-[14px]">
                        Open hours
                    </label>
                    <textarea v-model="openHours"
                        class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[135px]"
                        placeholder="Enter open hours"></textarea>
                </div>
            </div>
            <ul class="hidden md:flex flex-wrap w-full gap-3">
                <li v-for="(service, index) in services" :key="index"
                    class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                    <span>{{ service }}</span>
                    <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                        @click="removeService(service)" />
                </li>
            </ul>
        </div>
        <div v-if="category?.name === 'Skilled Trades'"
            class="flex flex-col w-full h-auto items-start px-[10px] md:px-[30px] lg:px-[100px] gap-5">
            <div class="flex flex-col w-full gap-4">
                <div class="flex flex-col w-full gap-4 md:flex-row">
                    <div class="flex flex-col w-full gap-2 ">
                        <label class="text-[14px]">
                            Legal firm or lawyer name
                        </label>
                        <input
                            class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Ex. ABC organization" />
                    </div>
                    <div class="flex flex-col w-full gap-2 ">
                        <label class="text-[14px]">
                            License Info
                        </label>
                        <input
                            class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Ex. #2563A01" />
                    </div>
                </div>
                <div class="flex flex-col w-full gap-4 md:flex-row">
                    <div class="flex flex-col w-full gap-2">
                        <div class="flex flex-col w-full gap-2">
                            <label class="text-[14px]">
                                List of Services
                            </label>
                            <div class="flex flex-row gap-2 justify-between">
                                <input v-model="newService" type="text"
                                    class="py-2 px-4 block w-[78%] outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                    placeholder="Enter service" @keyup.enter="addService" />
                                <div class="flex btn btn-active items-center justify-center text-center cursor-pointer min-w-[120px]"
                                    @click="addService">
                                    + Add
                                </div>
                            </div>
                        </div>
                        <ul class="flex md:hidden flex-wrap w-full gap-3">
                            <li v-for="(service, index) in services" :key="index"
                                class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                                <span>{{ service }}</span>
                                <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                                    @click="removeService(service)" />
                            </li>
                        </ul>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <label class="text-[14px]">
                            Open hours
                        </label>
                        <textarea v-model="openHours"
                            class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[135px]"
                            placeholder="Enter open hours"></textarea>
                    </div>
                </div>
                <ul class="hidden md:flex flex-wrap w-full gap-3">
                    <li v-for="(service, index) in services" :key="index"
                        class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                        <span>{{ service }}</span>
                        <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                            @click="removeService(service)" />
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="category?.name === 'Rent/Lease'"
            class="flex flex-col w-full h-auto items-start px-[10px] md:px-[30px] lg:px-[100px] gap-5">
            <div class="flex flex-col w-full gap-4 md:flex-row">
                <div class="flex flex-col w-full gap-2 ">
                    <label class="text-[14px]">
                        Property or item
                    </label>
                    <div class="relative">
                        <input
                            class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Ex. 2,100" />
                        <!-- <span class="absolute left-3 top-2 z-10 text-base">$</span> -->
                        <select class="absolute right-3 top-2 z-10 text-[13px] outline-none cursor-pointer">
                            <option value="forRent">For Rent</option>
                            <option value="forLease">For Lease</option>
                        </select>
                    </div>
                </div>
                <div class="flex flex-col w-full gap-2 ">
                    <label class="text-[14px]">
                        Rent or lease cost
                    </label>
                    <div class="relative">
                        <input
                            class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Ex. 2,100" />
                        <!-- <span class="absolute left-3 top-2 z-10 text-base">$</span> -->
                        <select class="absolute right-3 top-2 z-10 text-[13px] outline-none cursor-pointer">
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="3month">3 Month</option>
                            <option value="6month">6 Month</option>
                            <option value="year">Year</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2 md:w-1/2">
                <label class="text-[14px]">
                    Terms or duration
                </label>
                <textarea
                    class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[85px]"
                    placeholder="Enter open hours"></textarea>
            </div>
        </div>
        <div v-if="category?.name === 'Training/Lessons'"
            class="flex flex-col w-full h-auto items-start px-[10px] md:px-[30px] lg:px-[100px] gap-5">
            <div class="flex flex-col w-full gap-4 md:flex-row">
                <div class="flex flex-col w-full gap-2 ">
                    <label class="text-[14px]">
                        Trainer or institute
                    </label>
                    <input
                        class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                        placeholder="Ex. ABC institute" />
                </div>
                <div class="flex flex-col w-full gap-2">
                    <label class="text-[14px]">
                        Training offered
                    </label>
                    <div class="flex flex-row gap-2 justify-between">
                        <input v-model="newService" type="text"
                            class="py-2 px-4 w-[78%] block outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Ex. Spanish classes" @keyup.enter="addService" />
                        <div class="flex btn btn-active items-center justify-center text-center cursor-pointer min-w-[80px]"
                            @click="addService">
                            + Add
                        </div>
                    </div>
                </div>
            </div>
            <ul class="flex flex-wrap w-full gap-3">
                <li v-for="(service, index) in services" :key="index"
                    class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                    <span>{{ service }}</span>
                    <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                        @click="removeService(service)" />
                </li>
            </ul>
            <div class="flex w-full flex-wrap gap-4">
                <div class="flex flex-row gap-2">
                    <input type="checkbox" />
                    <span>
                        Online
                    </span>
                </div>

                <div class="flex flex-row gap-2">
                    <input type="checkbox" />
                    <span>
                        Onsite
                    </span>
                </div>
                <div class="flex flex-row gap-2">
                    <input type="checkbox" />
                    <span>
                        Hybrid
                    </span>
                </div>
                <div class="flex flex-row gap-2">
                    <input type="checkbox" />
                    <span>
                        Trainee preferred
                    </span>
                </div>
            </div>
            <div class="flex flex-col w-full gap-4">
                <div class="flex w-full flex-col gap-2">
                    <label class="text-[14px]">
                        Training or course fee
                    </label>
                    <textarea
                        class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[85px]"
                        placeholder="Explain fee details"></textarea>
                </div>
                <div class="flex w-full flex-col gap-2">
                    <label class="text-[14px]">
                        Open hours
                    </label>
                    <textarea v-model="openHours"
                        class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[85px]"
                        placeholder="Enter open hours"></textarea>
                </div>
            </div>
        </div>
        <div v-if="category?.name === 'Pets'" class="flex flex-col w-full h-auto items-start gap-6">
            <div class="flex flex-col w-full h-auto gap-5 sm:flex-row">
                <div class="flex flex-col w-full h-full gap-2">
                    <div class="flex flex-col w-full gap-2 pb-4">
                        <label class="text-[14px]">
                            Business or your name <span class="text-[#dc3545]">&nbsp;*</span>
                        </label>
                        <input v-model="businessName"
                            class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Enter business or your name" />
                    </div>

                    <div class="flex flex-col w-full gap-2">
                        <label class="text-[14px]">
                            List of Services <span class="text-[#dc3545]">&nbsp;*</span>
                        </label>
                        <div class="flex flex-row gap-2 justify-between">
                            <input v-model="newService" type="text"
                                class="py-2 px-4 w-[80%] block outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Enter service" @keyup.enter="addService" />
                            <div class="flex btn btn-active items-center justify-center text-center cursor-pointer min-w-[80px]"
                                @click="addService">
                                + Add
                            </div>
                        </div>
                    </div>

                    <ul class="flex md:hidden flex-wrap w-full gap-3">
                        <li v-for="(service, index) in services" :key="index"
                            class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                            <span>{{ service }}</span>
                            <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                                @click="removeService(service)" />
                        </li>
                    </ul>
                </div>
                <div class="flex w-full flex-col gap-2">
                    <label class="text-[14px]">
                        Open hours
                    </label>
                    <textarea v-model="openHours"
                        class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[135px]"
                        placeholder="Enter open hours"></textarea>
                </div>
            </div>
            <ul class="hidden md:flex flex-wrap w-full gap-3">
                <li v-for="(service, index) in services" :key="index"
                    class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                    <span>{{ service }}</span>
                    <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                        @click="removeService(service)" />
                </li>
            </ul>
        </div>
        <div v-if="category?.name === 'Gigs/Freelancers'" class="flex flex-col w-full h-auto items-start gap-6">
            <div class="flex flex-col w-full h-auto gap-5 sm:flex-row">
                <div class="flex flex-col w-full h-full gap-2">
                    <div class="flex flex-col w-full gap-2 pb-4">
                        <label class="text-[14px]">
                            Freelancer/ Service provider
                        </label>
                        <input
                            class="py-2 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                            placeholder="Enter business or your name" />
                    </div>

                    <div class="flex flex-col w-full gap-2">
                        <label class="text-[14px]">
                            List of Services <span class="text-[#dc3545]">&nbsp;*</span>
                        </label>
                        <div class="flex flex-row gap-2 justify-between">
                            <input v-model="newService" type="text"
                                class="py-2 px-4 w-[80%] block outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1"
                                placeholder="Enter service" @keyup.enter="addService" />
                            <div class="flex btn btn-active items-center justify-center text-center cursor-pointer min-w-[80px]"
                                @click="addService">
                                + Add
                            </div>
                        </div>
                    </div>

                    <ul class="flex md:hidden flex-wrap w-full gap-3">
                        <li v-for="(service, index) in services" :key="index"
                            class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                            <span>{{ service }}</span>
                            <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                                @click="removeService(service)" />
                        </li>
                    </ul>
                </div>
                <div class="flex w-full flex-col gap-2">
                    <label class="text-[14px]">
                        Open hours
                    </label>
                    <textarea v-model="openHours"
                        class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[135px]"
                        placeholder="Enter open hours"></textarea>
                </div>
            </div>
            <ul class="hidden md:flex flex-wrap w-full gap-3">
                <li v-for="(service, index) in services" :key="index"
                    class="flex flex-row justify-between items-center py-2 px-2 bg-gray-100 rounded-md border border-color-1 gap-2">
                    <span>{{ service }}</span>
                    <Icon name="plus" class="w-5 h-5 transform rotate-45 text-center cursor-pointer"
                        @click="removeService(service)" />
                </li>
            </ul>
        </div>
        <div v-if="category?.name === 'Community'" class="flex flex-col w-full h-auto items-start gap-6">
            <div class="flex w-full flex-col gap-2">
                <label class="text-[14px]">
                    Quick Comments
                </label>
                <textarea
                    class="py-3 px-4 block w-full outline-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-color-1 min-h-[85px]"
                    placeholder="Enter key details in few words"></textarea>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Icon from '../Icon.vue';
import { ref, watch } from 'vue';
import { Category } from '../../.nuxt/components';

const { $swal } = useNuxtApp()
const benefits = ref<Array<string>>([]);
const newBenefit = ref<string>("");
const places = ref<Array<any>>([]);
const newPlace = ref<string>("");
const amenities = ref<Array<any>>([]);
const newAmenity = ref<string>("");

const addBenefit = (benefitValue: string) => {
    benefits.value.push(benefitValue);
    console.log(benefits.value, ":: benefits");
}

const props = defineProps<{
    businessName: string | null;
    services: string[];
    openHours: string | null;
    currentCategory: Category | null;
}>();


interface Category {
    id: number;
    name: string;
    slug: string;
}

const emit = defineEmits<{
    (event: 'updateOtherDetails', data: { businessName: string | null, services: string[], openHours: string | null }): void;
}>();

const businessName = ref<string | null>(props.businessName);
const services = ref<Array<any>>([...props.services]);
const openHours = ref<string | null>(props.openHours);
const newService = ref<string>("");
const category = ref<Category | null>(props.currentCategory);

watch([businessName, services, openHours, category], ([newBusinessName, newServices, newOpenHours, newCategory]) => {
    emit('updateOtherDetails', {
        businessName: newBusinessName,
        services: newServices,
        openHours: newOpenHours
    });
}, { immediate: true });

const addService = () => {
    const trimmedValue = newService.value.trim();
    if (trimmedValue !== "") {
        if (services.value.includes(trimmedValue)) {
            $swal.fire({
                text: 'Same value',
                icon: 'warning'
            })
        } else {
            services.value.push(trimmedValue);
            newService.value = "";
        }
    }
}

const removeService = (service: string) => {
    services.value = services.value.filter(s => s !== service);
};

const addPlace = () => {
    const trimmedValue = newPlace.value.trim();
    if (trimmedValue !== "") {
        if (places.value.includes(trimmedValue)) {
            $swal.fire({
                text: 'Same value',
                icon: 'warning'
            })
        } else {
            places.value.push(trimmedValue);
            newPlace.value = "";
        }
    }
}

const removePlace = (place: string) => {
    places.value = places.value.filter(s => s !== place);
};

const addAmenity = () => {
    const trimmedValue = newAmenity.value.trim();
    if (trimmedValue !== "") {
        if (amenities.value.includes(trimmedValue)) {
            $swal.fire({
                text: 'Same value',
                icon: 'warning'
            })
        } else {
            amenities.value.push(trimmedValue);
            newAmenity.value = "";
        }
    }
}

const removeAmenity = (amenity: string) => {
    amenities.value = amenities.value.filter(s => s !== amenity);
};
</script>

<style lang="scss" scoped></style>
