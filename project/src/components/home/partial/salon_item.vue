<template>
  <div class='flex flex-col rounded-lg shadow-xl overflow-hidden'>
    <div class='flex-shrink-0'>
      <img :src='this.$filters.getFirstMediaUrl(salon)' :alt='salon.name' class='h-52 w-full object-cover' />
    </div>
		<div class='flex h-16 mt-0.5 -mx-0.5'>
			<img v-for='media in salon.media.slice(1)' :key='media.id' :src='media.icon' :alt='media.name' class='w-1/4 border-2 border-white object-cover' />
		</div>
    <div class='flex-1 bg-white p-6 flex flex-col justify-between'>
      <div class='flex-1'>
        <router-link :to='{name:"Salon", params:{ id:salon.id, tab:"details" }}' class='block mt-2'>
          <p class='mb-1 text-xl font-semibold text-second-color-600'>
            {{ this.$filters.transString(salon.name) }}
          </p>
					<span class="px-3 py-0.5 rounded-md text-sm bg-main-color-500 text-white">{{ this.$filters.transString(salon.salon_level.name) }}</span>
          <p class='mt-3 text-sm text-second-color-400 line-clamp-3'>
            {{ this.$filters.stripHtml(salon.description) }}
          </p>
        </router-link>
      </div>
      <div class='flex items-end justify-between'>
        <div class='h-6 flex'>
          <StarIcon v-for='i in Math.ceil(salon.rate)' :key='i' aria-hidden='true' class='w-5 h-5 text-yellow-400' />
          <StarIcon v-for='i in Math.floor(5 - salon.rate)' :key='i' aria-hidden='true' class='w-5 h-5 text-gray-300' />
        </div>
				<div class='pt-1 sm:pt-3'>
					<span v-if='salon.closed' class="px-4 py-0.5 rounded-md text-sm bg-green-400 text-white">{{ $t("Open") }}</span>
					<span v-else class="px-4 py-0.5 rounded-md text-sm  bg-gray-400 text-white">{{ $t("Closed") }}</span>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
import { StarIcon } from '@heroicons/vue/solid'

export default {
  components: {
    StarIcon,
  },
  props: ['salon'],
}
</script>
