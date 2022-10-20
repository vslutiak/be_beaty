<template>
	<Heading :salon='salon' />
	<Tabs />
	<div class='grid grid-cols-1 gap-4 items-start mx-auto my-8 max-w-7xl sm:px-6 lg:px-8 lg:grid-cols-3 lg:gap-8'>
		<div class='grid grid-cols-1 gap-8 lg:col-span-2'>
			<Description v-if='$route.params.tab === "details"' :salon='salon' />
			<FeaturedServices v-if='$route.params.tab === "details"' />
			<Services v-if='$route.params.tab === "services"' />
			<Galleries v-if='$route.params.tab === "gallery"' />
			<Reviews v-if='$route.params.tab === "reviews"' />
			<Awards v-if='$route.params.tab === "awards"' />
			<Experiences v-if='$route.params.tab === "experiences"' />
		</div>
		<div class='grid grid-cols-1 gap-8'>
			<Contact :salon='salon' />
			<Availability :salon='salon' />
		</div>
	</div>
	<BookingBanner />
	<BookEService />
</template>

<script>

import Heading from '../components/salon/heading.vue'
import Description from '../components/salon/description.vue'
import Galleries from '../components/salon/galleries.vue'
import Reviews from '../components/salon/reviews.vue'
import Contact from '../components/salon/contact.vue'
import Availability from '../components/salon/availability.vue'
import Awards from '../components/salon/awards.vue'
import Experiences from '../components/salon/experiences.vue'
import FeaturedServices from '../components/salon/featured_services.vue'
import Tabs from '../components/salon/tabs.vue'
import Services from '../components/salon/services.vue'
import BookingBanner from '../components/salon/booking_banner.vue'
import BookEService from '../components/book_e_service/book_e_service.vue'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('salon')

export default {
	name: 'Salon',
	components: {
		Services,
		FeaturedServices,
		Experiences,
		Awards,
		Availability,
		Contact,
		Reviews,
		Galleries,
		Heading,
		Description,
		Tabs,
		BookingBanner,
		BookEService,
	},
	async mounted() {
		await this.getSalon(this.$route.params.id)
	},
	computed: {
		...mapState(['salon']),
	},
	methods: {
		...mapActions(['getSalon']),
	},
}
</script>
