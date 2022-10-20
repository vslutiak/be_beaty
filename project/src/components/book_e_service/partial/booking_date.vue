<template>
	<div class='flex'>
		<litepie-datepicker id='bookingAt'
												ref='litepieRef'
												v-model='dateValue'
												:formatter="{date: 'YYYY-MM-DD',month: 'MMM'}"
												as-single
												@click='litepieRef.isShow = !litepieRef.isShow'
		></litepie-datepicker>
	</div>
</template>

<script>
import { ref, watch } from 'vue'
import { createNamespacedHelpers, useStore } from 'vuex'
import dayjs from 'dayjs'

const { mapState, mapActions } = createNamespacedHelpers('bookEService')

export default {
	name: 'BookingDate',
	setup() {
		const store = useStore()
		const dateValue = ref(dayjs(store.state.bookEService.booking.booking_at).format('YYYY-MM-DD'))
		const litepieRef = ref(null)

		watch(dateValue, (first, second) => {
			let date = (first instanceof Object) ? first[0] : first
			store.dispatch('bookEService/updateBookingAtAction', date)
			store.dispatch('salon/getSalonAvailabilityHours', {
				salonId: store.state.bookEService.booking.salon.id,
				date: date,
				employeeId: store.state.bookEService.booking.employee?.id,
			})
		})

		return {
			dateValue,
			litepieRef,
		}
	},
}
</script>