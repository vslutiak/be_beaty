<template>
	<div class='flex-1'>

		<div class='py-6 space-y-8 sm:py-8 sm:space-y-0 sm:divide-y sm:divide-gray-100'>

			<!-- Employee -->
			<div class='px-4 space-y-1 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-8 sm:items-center'>
				<label class='block text-sm font-medium text-second-color-600 sm:mt-px sm:pt-2' for='date'>
					{{ $t('Employee') }}
					<div class='font-normal text-second-color-400'>{{ $t('Choose the employee you want to book') }}
					</div>
				</label>
				<div class='sm:col-span-2'>
					<BookingEmployee />
				</div>
			</div>

			<!-- Date -->
			<div class='px-4 space-y-1 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-8 sm:items-center'>
				<label class='block text-sm font-medium text-second-color-600 sm:mt-px sm:pt-2' for='date'>
					{{ $t('Date time') }}
					<div class='font-normal text-second-color-400'>{{ $t('When the provider will come to the selected address ')
						}}
					</div>
				</label>
				<div class='sm:col-span-2'>
					<BookingDate />
					<BookingTime />
				</div>
			</div>

			<!-- Address -->
			<fieldset>
				<div class='px-4 space-y-2 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:px-6 sm:py-5'>
					<label class='text-sm font-medium text-second-color-600'>
						{{ $t('Location') }}
					</label>
					<div class='space-y-5 sm:col-span-2'>
						<BookingAddress/>
					</div>
				</div>
			</fieldset>

			<!-- Coupon Code -->
			<div class='px-4 space-y-1 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-8'>
				<div>
					<label class='block text-sm font-medium text-second-color-600 sm:mt-px sm:pt-2' for='project-name'>
						{{ $t('Coupon Code') }}
					</label>
				</div>
				<div class='flex rounded-md sm:col-span-2' dir='ltr'>
					<div class='flex relative flex-grow items-stretch focus-within:z-10'>
						<input id='coupon'
									 :placeholder='$t("COUPON")'
									 :value='booking.coupon.code'
									 class='block w-full rounded-none rounded-l-md border-gray-300 focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
									 name='coupon'
									 type='text'
									 @input='updateCoupon' />
					</div>
					<button
						class='inline-flex relative items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-r-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-main-color-500 focus:border-main-color-500'
						type='button'
						@click='validateCoupon(booking)'>
						{{ $t('Apply') }}
					</button>
				</div>
			</div>
			<!-- Hint -->
			<div class='px-4 space-y-1 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-8'>
				<div>
					<label class='block text-sm font-medium text-second-color-600 sm:mt-px sm:pt-2' for='hint'>
						{{ $t('Hint') }}
					</label>
				</div>
				<div class='sm:col-span-2'>
                        <textarea id='hint'
																	:placeholder='$t("Is there anything else you would like to share with the salon employees?")'
																	:value='booking.hint'
																	class='block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm focus:ring-main-color-500 focus:border-main-color-500'
																	name='hint'
																	rows='3'
																	@input='updateHint' />
				</div>
			</div>
		</div>
	</div>
	<!-- Action buttons -->
	<div class='flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6'>
		<div class='flex justify-end space-x-3 rtl:space-x-reverse'>
			<button
				class='px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
				type='button'
				@click='$router.push({name:"Salon"})'>
				{{ $t('Cancel') }}
			</button>
			<button
				:disabled='!this.canMakeBooking'
				class='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-main-color-600 disabled:opacity-60 rounded-md border border-transparent shadow-sm hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
				dir='ltr'
				type='button'
				@click='$router.push({name:"BookEService",params:{action:"summary"}})'>
				{{ $t('Continue') }}
				<ChevronRightIcon aria-hidden='true' class='-mr-1 ml-3 w-5 h-5' />
			</button>
		</div>
	</div>
</template>

<script>
import { ChevronRightIcon } from '@heroicons/vue/outline'
import { mapActions, mapGetters, mapState } from 'vuex'
import BookingDate from './partial/booking_date.vue'
import BookingTime from './partial/booking_time.vue'
import BookingEmployee from './partial/booking_employee.vue'
import BookingAddress from './partial/booking_address.vue'


export default {
	name: 'BookEServiceForm',
	components: {
		ChevronRightIcon,
		BookingDate,
		BookingTime,
		BookingEmployee,
		BookingAddress,
	},
	mounted() {
		this.updateEServiceAction()
	},
	computed: {
		...mapState('bookEService', {
			booking: state => state.booking,
		}),
		...mapGetters('bookEService', [
			'canMakeBooking',
		]),

	},
	methods: {
		...mapActions('bookEService', ['updateHintAction', 'updateEServiceAction', 'validateCouponAction', 'updateCouponAction']),
		...mapActions('snackbar', ['toggleSnackBarAction']),
		updateHint(e) {
			this.updateHintAction(e.target.value)
		},
		updateCoupon(e) {
			this.updateCouponAction(e.target.value)
		},
		validateCoupon(booking) {
			this.validateCouponAction(booking).then(result => {
				this.toggleSnackBarAction(result)
			})
		},
	},
}

</script>