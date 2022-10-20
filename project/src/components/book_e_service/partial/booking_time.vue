<template>
	<Listbox as='div'>
		<div class='mt-3 relative'>
			<ListboxButton
				class='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'>
				<span class='block truncate'>{{ this.formatTime(this.booking.booking_at) }}</span>
				<span class='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
          <SelectorIcon aria-hidden='true' class='h-5 w-5 text-gray-400' />
        </span>
			</ListboxButton>

			<transition leave-active-class='transition ease-in duration-100' leave-from-class='opacity-100'
									leave-to-class='opacity-0'>
				<ListboxOptions
					class='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
					<ListboxOption v-for='hour in this.salonAvailabilityHours' :key='hour[0]'
												 v-slot='{ active, selected }' :value='hour[0]' as='template'
												 @click='this.updateTime(hour)'>
						<li
							:class="[active &&  hour[1] === true ? 'text-white bg-main-color-600 cursor-pointer' : 'cursor-not-allowed text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
							<div class='flex items-center'>
								<span
									:class="[hour[1] === true ? 'bg-green-400' : 'bg-gray-200', 'flex-shrink-0 inline-block h-4 w-4 rounded-full']"
									aria-hidden='true' />
								<span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                  {{ this.formatTime(hour[0]) }}
                  <span class='sr-only'> is {{ hour[1] === true ? 'available' : 'unavailable' }}</span>
                </span>
							</div>

							<span v-if='selected'
										:class="[active &&  hour[1] === true ? 'text-white' : 'text-main-color-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
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
import dayjs from 'dayjs'

import { mapActions, mapState } from 'vuex'

export default {
	name: 'BookingTime',
	components: {
		Listbox,
		ListboxButton,
		ListboxOption,
		ListboxOptions,
		CheckIcon,
		SelectorIcon,
	},
	async mounted() {
		await this.getSalonAvailabilityHours({ salonId: this.$route.params.id })
	},
	computed: {
		...mapState('salon', {
			salonAvailabilityHours: state => state.salonAvailabilityHours,
		}),
		...mapState('bookEService', {
			booking: state => state.booking,
		}),
	},
	methods: {
		...mapActions('salon', ['getSalonAvailabilityHours']),
		...mapActions('bookEService', ['updateBookingAtAction']),
		formatTime(hour) {
			// if length of hour is more than 10, then it is a timestamp
			if (hour.length === 10) {
				return 'Select a time';
			}
			// remove last 6 digits from string
			hour = hour.toString().slice(0, -6)
			return dayjs(hour).format('HH:mm') + ' - ' + dayjs(hour).add(30, 'm').format('HH:mm')
		},

		updateTime(hour) {
			if(hour[1]){
				this.updateBookingAtAction(hour[0])
			}
		},
	},
}
</script>