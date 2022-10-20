<template>
	<div class='fixed inset-x-0 bottom-0 pb-2 sm:pb-5'>
		<div class='px-2 mx-auto max-w-7xl sm:px-6 lg:px-8'>
			<div class='px-4 py-3 bg-main-color-600 rounded-lg shadow-lg'>
				<div class='flex flex-wrap gap-3 justify-between items-center'>
					<p class='w-full font-medium text-center text-white truncate md:w-auto'>
						{{ $t('Select services & options to place a booking') }}
					</p>
					<div class='flex md:flex-row flex-col gap-3 w-full md:w-auto items-center'>
						<div class='text-center text-white text-xl font-bold'>{{ this.$filters.formatPrice(this.$filters.getSubtotal(this.booking)) }}</div>
						<button
							:disabled='this.booking.e_services.length === 0'
							class='flex truncate justify-center items-center px-4 py-2 h-10 text-sm font-medium text-main-color-600 bg-white disabled:opacity-60 rounded-md border border-transparent shadow-sm hover:bg-gray-50'
							@click='$router.push({name:"BookEService",params:{action:"form"}})'>
							{{ $t('Place Booking') }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'


export default {
	name: 'BookingBanner',
	mounted() {

	},
	computed: {
		...mapState('bookEService', {
			booking: state => state.booking,
		}),
	},
	methods: {
		...mapActions('bookEService', []),
	},
}
</script>