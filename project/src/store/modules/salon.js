import dayjs from 'dayjs'

export default {
	namespaced: true,
	state: () => ({
		salon: {},
		recommendedSalons: [],
		salonReviews: [],
		salonGalleries: [],
		salonAwards: [],
		salonExperiences: [],
		salonFeaturedEServices: [],
		salonEServices: [],
		salonAvailabilityHours: [],
		salonEmployees: [],
		tabs: [
			{ name: 'Details', id: 'details' },
			{ name: 'Services', id: 'services' },
			{ name: 'Gallery', id: 'gallery' },
			{ name: 'Reviews', id: 'reviews' },
			{ name: 'Awards', id: 'awards' },
			{ name: 'Experiences', id: 'experiences' },
		],
	}),
	mutations: {
		UPDATE_RECOMMENDED_SALONS(state, salons) {
			state.recommendedSalons = salons
		},

		UPDATE_SALON(state, salon) {
			state.salon = salon
		},
		UPDATE_SALON_REVIEWS(state, reviews) {
			state.salonReviews = reviews
		},

		UPDATE_SALON_GALLERIES(state, galleries) {
			state.salonGalleries = galleries
		},

		UPDATE_SALON_AWARDS(state, awards) {
			state.salonAwards = awards
		},

		UPDATE_SALON_EXPERIENCES(state, experiences) {
			state.salonExperiences = experiences
		},

		UPDATE_SALON_FEATURED_E_SERVICES(state, eServices) {
			state.salonFeaturedEServices = eServices
		},

		UPDATE_SALON_E_SERVICES(state, eServices) {
			state.salonEServices = eServices
		},

		UPDATE_SALON_AVAILABILITY(state, availabilityHours) {
			state.salonAvailabilityHours = availabilityHours
		},

		UPDATE_SALON_EMPLOYEES(state, employees) {
			state.salonEmployees = employees
		}

	},
	actions: {
		getRecommendedSalonsAction({ commit }) {
			let queryParameters = {
				'only': 'id;name;has_media;media;total_reviews;rate;salonLevel;distance;closed;description',
				'with': 'salonLevel',
				'search': 'featured:1',
				'searchFields': 'featured:=',
				'searchJoin': 'and',
				'limit': '6',
			}
			this.$axios.get('salons', { params: queryParameters }).then(response => {
				if (response.status === 200 && response.data?.success) {
					const salons = response.data.data
					console.log(response.data.data)
					commit('UPDATE_RECOMMENDED_SALONS', salons)
				}
			})
		},

		getSalon({ commit }, id = '') {
			commit('UPDATE_SALON', {})
			let queryParameters = {
				'with': 'salonLevel;availabilityHours;users;taxes;address',
			}
			this.$axios.get(`salons/${id}`, { params: queryParameters }).then(response => {
				console.log(response.data.data)
				commit('UPDATE_SALON', response.data.data)
			})
		},

		getSalonReviews({ commit }, salonId = '') {
			commit('UPDATE_SALON_REVIEWS', [])
			let queryParameters = {
				'with': 'salonReviews;salonReviews.user',
				'only': 'salonReviews.id;salonReviews.review;salonReviews.rate;salonReviews.created_at;salonReviews.user;',
			}

			this.$axios.get(`salons/${salonId}`, { params: queryParameters }).then(response => {
				console.log(response.data.data?.salon_reviews)
				commit('UPDATE_SALON_REVIEWS', response.data.data?.salon_reviews || [])
			})
		},

		getSalonGalleries({ commit }, salonId = '') {
			commit('UPDATE_SALON_GALLERIES', [])
			let queryParameters = {
				'with': 'media',
				'search': `salon_id:${salonId}`,
				'searchFields': 'salon_id:=',
				'orderBy': 'updated_at',
				'sortedBy': 'desc',
			}

			this.$axios.get(`galleries`, { params: queryParameters }).then(response => {
				console.log(response.data.data)
				commit('UPDATE_SALON_GALLERIES', response.data.data || [])
			})
		},

		getSalonAwards({ commit }, salonId = '') {
			commit('UPDATE_SALON_AWARDS', [])
			let queryParameters = {
				'search': `salon_id:${salonId}`,
				'searchFields': 'salon_id:=',
				'orderBy': 'updated_at',
				'sortedBy': 'desc',
			}

			this.$axios.get(`awards`, { params: queryParameters }).then(response => {
				console.log(response.data.data)
				commit('UPDATE_SALON_AWARDS', response.data.data)
			})
		},

		getSalonExperiences({ commit }, salonId = '') {
			commit('UPDATE_SALON_EXPERIENCES', [])
			let queryParameters = {
				'search': `salon_id:${salonId}`,
				'searchFields': 'salon_id:=',
				'orderBy': 'updated_at',
				'sortedBy': 'desc',
			}

			this.$axios.get(`experiences`, { params: queryParameters }).then(response => {
				console.log(response.data.data)
				commit('UPDATE_SALON_EXPERIENCES', response.data.data)
			})
		},

		getSalonFeaturedEServices({ commit }, salonId = '', limit = 6, page = 1) {
			if (page === 1) {
				console.log('reset')
				commit('UPDATE_SALON_FEATURED_E_SERVICES', [])
			}
			let queryParameters = {
				'with': 'salon;salon.address;categories',
				'search': `salon_id:${salonId};featured:1`,
				'searchFields': 'salon_id:=;featured:=',
				'searchJoin': 'and',
				'limit': limit.toString(),
				'offset': ((page - 1) * 5).toString(),
			}

			this.$axios.get(`e_services`, { params: queryParameters }).then(response => {
				console.log(response.data.data)
				commit('UPDATE_SALON_FEATURED_E_SERVICES', response.data.data || [])
			})
		},

		getSalonEServices({ commit }, salonId = '', categories = []) {
			commit('UPDATE_SALON_E_SERVICES', [])
			let queryParameters = {
				'with': 'categories;optionGroups;optionGroups.options;optionGroups.options.media',
				'search': `categories.id:${categories.join(',')};salon_id:${salonId}`,
				'searchFields': 'categories.id:in;salon_id:=',
				'searchJoin': 'and',
			}
			this.$axios.get(`e_services`, { params: queryParameters }).then(response => {
				console.log(response.data.data)
				if (response.status === 200 && response.data?.success) {
					//let optionGroups = filterOptionsByEService(response.data.data, eServiceId)
					commit('UPDATE_SALON_E_SERVICES', response.data.data || [])
				}
			})
		},

		getSalonAvailabilityHours({ commit }, { salonId = '', date = dayjs().format('YYYY-MM-DD'), employeeId = '0' }) {
			commit('UPDATE_SALON_AVAILABILITY', [])
			let queryParameters = {
				'date': date,
				'employee_id': employeeId,
			}
			this.$axios.get(`availability_hours/${salonId}`, { params: queryParameters }).then(response => {
				console.log(response.data.data)
				if (response.status === 200 && response.data?.success) {
					commit('UPDATE_SALON_AVAILABILITY', response.data.data || [])
				}
			})
		},

		getSalonEmployees({ commit }, salonId = '') {
			commit('UPDATE_SALON_EMPLOYEES', [])
			let queryParameters = {
				'with': 'users',
				'only': 'users;users.id;users.name;users.email;users.phone_number;users.device_token'
			}
			this.$axios.get(`salons/${salonId}`, { params: queryParameters }).then(response => {
				console.log(response.data.data)
				if (response.status === 200 && response.data?.success) {
					commit('UPDATE_SALON_EMPLOYEES', response.data.data['users'] || [])
				}
			})
		}
	},
}
