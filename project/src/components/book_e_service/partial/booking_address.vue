<template>
	<div class='px-5 py-3 rounded-lg flex relative items-center bg-accent-color-50 '>
		<div class='flex absolute items-center h-5'>
			<input id='at-customer-address' checked class='w-4 h-4 text-main-color-600 border-gray-300 focus:ring-main-color-500'
						 name='address'
						 type='radio' @change='updateAtSalonAddress()' />
		</div>
		<div class='px-6 text-sm'>
			<label class='font-medium text-second-color-600' for='at-customer-address-description'>
				{{ booking.salon?.address?.description }}
				<span id='at-customer-address-description' class='block font-normal text-gray-500'>
                      {{ booking.salon?.address?.address }}
                    </span>
			</label>
		</div>
	</div>
	<div class='px-5 py-3 rounded-lg flex relative items-center bg-accent-color-50 '>
		<div class='flex absolute items-center h-5'>
			<input id='at-salon-address' class='w-4 h-4 text-main-color-600 border-gray-300 focus:ring-main-color-500'
						 name='address'
						 type='radio' @change='updateAtCustomerAddress()' />
		</div>
		<div class='px-6 text-sm'>
			<label class='font-medium text-second-color-600' for='at-salon-address-description'>
				{{ getAddress.description }}
				<span id='at-salon-address-description' class='block font-normal text-gray-500'>
                      {{ getAddress.address }}
                    </span>
			</label>
		</div>
	</div>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex'

export default {
	name: 'BookingAddress',
	components: {
	},
	computed: {
		...mapState('bookEService', {
			booking: state => state.booking,
		}),
		...mapGetters('user', ['getAddress']),
	},
	methods: {
		...mapActions('bookEService', ['updateAddressAction']),
		updateAtSalonAddress() {
			this.updateAddressAction(this.booking.salon?.address)
		},
		updateAtCustomerAddress() {
			this.updateAddressAction(this.getAddress)
		},
	},
}
</script>