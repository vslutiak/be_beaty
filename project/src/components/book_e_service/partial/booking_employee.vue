<template>
	<Listbox as='div'>
		<div class='mt-1 relative'>
			<ListboxButton
				class='relative w-full bg-white border border-gray-300 rounded-md shadow-sm px-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'>
        <span class='flex items-center'>
          <img v-if="this.booking.employee !== undefined" :alt='this.booking.employee?.name' :src='this.$filters.getFirstMediaThumb(this.booking.employee)'
							 class='flex-shrink-0 h-6 w-6 rounded-full' />
          <span class='mx-2 block truncate'>{{ this.booking.employee?.name || $t("Anyone available at salon") }}</span>
        </span>
				<span class='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
          <SelectorIcon aria-hidden='true' class='h-5 w-5 text-gray-400' />
        </span>
			</ListboxButton>

			<transition leave-active-class='transition ease-in duration-100' leave-from-class='opacity-100'
									leave-to-class='opacity-0'>
				<ListboxOptions
					class='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
					<ListboxOption v-slot='{ active, selected }' :value='undefined' as='template'
												 @click='this.selectEmployee(undefined)'>
						<li
							:class="[active ? 'text-white bg-main-color-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
								<span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                  {{ $t("Anyone available at salon") }}
                </span>
							<span v-if='selected'
										:class="[active ? 'text-white' : 'text-main-color-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon aria-hidden='true' class='h-5 w-5' />
              </span>
						</li>
					</ListboxOption>

					<ListboxOption v-for='employee in this.booking.salon.users' :key='employee.id'
												 v-slot='{ active, selected }' :value='employee' as='template'
												 @click='this.selectEmployee(employee)'>
						<li
							:class="[active ? 'text-white bg-main-color-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
							<div class='flex items-center'>
								<img :alt='employee?.name' :src='this.$filters.getFirstMediaThumb(employee)'
										 class='flex-shrink-0 h-6 w-6 rounded-full' />
								<span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                  {{ employee.name }}
                </span>
							</div>

							<span v-if='selected'
										:class="[active ? 'text-white' : 'text-main-color-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon aria-hidden='true' class='h-5 w-5' />
              </span>
						</li>
					</ListboxOption>
				</ListboxOptions>
			</transition>
		</div>
	</Listbox>
</template>

<script>
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('bookEService')

export default {
	name: 'BookingEmployee',
	components: {
		Listbox,
		ListboxButton,
		ListboxOption,
		ListboxOptions,
		CheckIcon,
		SelectorIcon,
	},
	computed: {
		...mapState(['booking']),
	},
	methods: {
		...mapActions(['updateBookingEmployeeAction']),

		selectEmployee(employee) {
			this.updateBookingEmployeeAction(employee)
		},
	},
}
</script>