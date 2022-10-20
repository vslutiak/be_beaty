<template>
	<section>
		<Loader v-if='salonEServices.length === 0' height='h-48' />
		<div v-else>
			<h2 class='py-4 text-xl font-bold text-second-color-600 truncate'>{{ $t('Select Services') }}</h2>
			<div v-for='eService in salonEServices' :key='eService.id'
					 class='flex flex-col overflow-hidden bg-white rounded-lg divide-y mb-8 divide-gray-100 shadow-lg'>
				<RadioGroup>
					<div class='relative bg-white'>
						<RadioGroupOption as='template' @click='toggleEServiceAction(eService)'>
							<div
								:class="[ selectedEServices.map(eService => eService.id).includes(eService.id) ? 'bg-main-color-100' : ' ', 'relative bg-gray-50 p-4 gap-3 flex justify-between items-center cursor-pointer md:pl-4 md:pr-6 focus:outline-none']">
								<div
									:class="[selectedEServices.map(eService => eService.id).includes(eService.id) ? 'bg-main-color-600 border-transparent' : 'bg-white border-gray-300', 'h-6 w-6 flex-shrink-0 rounded-full border flex items-center justify-center']"
									aria-hidden='true'>
									<span class='rounded-full bg-white w-2 h-2' />
								</div>
								<div class='flex-1'>
									<RadioGroupLabel
										:class="[selectedEServices.map(eService => eService.id).includes(eService.id) ? 'text-main-color-600' : 'text-second-color-600', 'text-xl font-bold']"
										as='span'>
										{{ this.$filters.transString(eService.name) }}
									</RadioGroupLabel>
									<RadioGroupDescription as='div'>
										<div
											:class="[selectedEServices.map(eService => eService.id).includes(eService.id) ? 'text-main-color-600' : 'text-second-color-400','text-sm line-clamp-3']">
											{{ this.$filters.stripHtml(eService.description) }}
										</div>
										<div
											:class="[selectedEServices.map(eService => eService.id).includes(eService.id) ? 'text-main-color-600' : 'text-second-color-600','font-bold line-clamp-1']">
											{{ this.$filters.formatPrice(eService.price) }}
										</div>
									</RadioGroupDescription>
								</div>
								<img :alt='this.$filters.transString(eService.name)' :src='this.$filters.getFirstMediaThumb(eService)'
										 class='w-16 h-16 flex-shrink-0 rounded-xl'>
							</div>
						</RadioGroupOption>
						<div v-for='optionGroup in eService.option_groups' :key='optionGroup.id'>
							<p class='font-bold text-second-color-600 px-8 py-4'>{{ this.$filters.transString(optionGroup.name)
								}}</p>
							<RadioGroup>
								<div class='relative bg-white'>
									<RadioGroupOption
										v-for='option in this.$filters.filterOptionsByEService(optionGroup.options, eService.id)'
										:key='option.id'
										as='template'
										@click='toggleOptionAction({option,eService})'>
										<div
											:class="[selectedOptions.map(option => option.id).includes(option.id) ? 'bg-main-color-100' : ' ', 'relative bg-gray-50 p-4 gap-3 flex justify-between items-center cursor-pointer md:pl-4 md:pr-6 focus:outline-none']">
											<div
												:class="[selectedOptions.map(option => option.id).includes(option.id) ? 'bg-main-color-600 border-transparent' : 'bg-white border-gray-300', 'h-6 w-6 flex-shrink-0 rounded-full border flex items-center justify-center']"
												aria-hidden='true'>
												<span class='rounded-full bg-white w-2 h-2' />
											</div>
											<div class='flex-1'>
												<RadioGroupLabel
													:class="[selectedOptions.map(option => option.id).includes(option.id) ? 'text-main-color-600' : 'text-second-color-600', 'font-bold']"
													as='span'>
													{{ this.$filters.transString(option.name) }}
												</RadioGroupLabel>
												<RadioGroupDescription as='div'>
													<div
														:class="[selectedOptions.map(option => option.id).includes(option.id) ? 'text-main-color-600' : 'text-second-color-400','text-sm line-clamp-1']">
														{{ this.$filters.stripHtml(option.description) }}
													</div>
													<div
														:class="[selectedOptions.map(option => option.id).includes(option.id) ? 'text-main-color-600' : 'text-second-color-600','font-bold line-clamp-1']">
														{{ this.$filters.formatPrice(option.price) }}
													</div>
												</RadioGroupDescription>
											</div>
											<img :alt='this.$filters.transString(option.name)'
													 :src='this.$filters.getFirstMediaUrl(option)' class='w-16 h-16 flex-shrink-0 rounded-xl'>
										</div>
									</RadioGroupOption>
								</div>
							</RadioGroup>

						</div>

					</div>
				</RadioGroup>
			</div>
		</div>
	</section>
</template>

<script>
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { mapActions, mapState } from 'vuex'
import Loader from '../partial/loader.vue'


export default {
	name: 'Services',
	components: {
		Loader,
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption,

	},
	mounted() {
		this.getSalonEServices(this.$route.params.id)
		console.log(this.selectedEServices);
		if(!this.$router.options.history.state.back.startsWith('/e_service/')){
			this.resetOptionAction()
			this.resetEServiceAction()
		}
	},
	computed: {
		...mapState('salon', {
			salonEServices: state => state.salonEServices,
		}),
		...mapState('bookEService', {
			selectedOptions: state => state.booking.options,
			selectedEServices: state => state.booking.e_services,
		}),
	},
	methods: {
		...mapActions('salon', ['getSalonEServices']),
		...mapActions('bookEService', ['toggleOptionAction', 'resetOptionAction', 'toggleEServiceAction', 'resetEServiceAction']),
	},

}
</script>