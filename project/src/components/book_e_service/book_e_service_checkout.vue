<template>
	<!-- Details -->
	<div class='flex flex-col flex-1 gap-8 w-full text-base text-left sm:py-8 sm:px-6 lg:px-8 min-h-0 overflow-y-scroll'>
		<PaymentMethodsLoader v-if='paymentMethods.length === 0' />
		<RadioGroup v-else>
			<div class='relative bg-white'>
				<RadioGroupOption v-for='paymentMethod in paymentMethods' :key='paymentMethod.id' as='template'
													@click='this.selectPaymentMethodAction(paymentMethod)'>
					<div
						:class="[ paymentMethod.id === this.selectedPaymentMethod.id ? 'bg-main-color-100' : ' ', 'relative bg-gray-50 p-4 flex justify-between rounded-lg cursor-pointer mb-2 md:pl-4 md:pr-6 focus:outline-none']">
						<div class='flex items-center text-sm'>
              <span
								:class="[paymentMethod.id === this.selectedPaymentMethod.id ? 'bg-main-color-600 border-transparent' : 'bg-white border-gray-300', 'h-6 w-6 rounded-full border flex items-center justify-center']"
								aria-hidden='true'>
                <span class='rounded-full bg-white w-2 h-2' />
              </span>
							<div class='mx-4'>
								<RadioGroupLabel
									:class="[paymentMethod.id === this.selectedPaymentMethod.id ? 'text-main-color-600' : 'text-second-color-600', 'font-bold']"
									as='span'>
									{{ this.$filters.transString(paymentMethod.name) }}
								</RadioGroupLabel>
								<RadioGroupDescription as='div'>
                <span
									:class="[paymentMethod.id === this.selectedPaymentMethod.id ? 'text-main-color-600' : 'text-second-color-600']">{{ this.$filters.transString(paymentMethod.description)
									}} </span>
								</RadioGroupDescription>
							</div>
						</div>
						<img :alt='this.$filters.transString(paymentMethod.name)'
								 :src='this.$filters.getFirstMediaThumb(paymentMethod)' class='w-16 h-16 rounded-xl'>
					</div>
				</RadioGroupOption>
			</div>
		</RadioGroup>
	</div>

	<!-- Action buttons -->
	<div class='flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6'>
		<div class='flex justify-between space-x-3'>

			<button
				class='inline-flex justify-center bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
				type='button'
				@click='$router.push({name:"Salon"})'>
				<ChevronLeftIcon aria-hidden='true' class='w-5 h-5 mr-2' />
				{{ $t('Cancel') }}
			</button>
			<button
				:disabled='selectedPaymentMethod.id === undefined'
				class='ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500 disabled:opacity-60'
				dir='ltr'
				type='button'
				@click='addBooking(this.booking)'>
				{{ $t('Confirm & Booking Now') }}
				<ChevronRightIcon aria-hidden='true' class='-mr-1 ml-3 w-5 h-5' />
			</button>
		</div>
	</div>
</template>

<script>
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline'
import PaymentMethodsLoader from './partial/payment_methods_loader.vue'
import { mapActions, mapState } from 'vuex'


export default {
	name: 'BookEServiceCheckout',
	components: {
		PaymentMethodsLoader,
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption,
		ChevronLeftIcon,
		ChevronRightIcon,
	},
	async mounted() {
		//await this.getBookingDetailsAction(this.$route.params.id)
		this.getPaymentMethodsAction()
		this.getWalletsAction()
	},
	computed: {
		...mapState('booking', {
			paymentMethods: state => state.paymentMethods,
			selectedPaymentMethod: state => state.selectedPaymentMethod,
		}),
		...mapState('bookEService', {
			booking: state => state.booking,
		}),
	},
	methods: {
		...mapActions('snackbar', ['toggleSnackBarAction']),
		...mapActions('booking', ['getPaymentMethodsAction', 'selectPaymentMethodAction', 'getBookingDetailsAction', 'getWalletsAction']),
		...mapActions('bookEService', ['addBookingAction']),
		addBooking(booking) {
			this.addBookingAction(booking).then(result => {
				if (result.type === 'success') {
					if (this.selectedPaymentMethod.route === '/Cash') {
						this.$router.push({ name: 'BookEService', params: { action: 'cash' } })
					} else if(this.selectedPaymentMethod.route === '/Wallet'){
						this.$router.push({ name: 'BookEService', params: { action: 'wallet' } })
					} else {
						this.$router.push({ name: 'BookEService', params: { action: 'native' } })
					}
				}
			})
		},
	},
}

</script>