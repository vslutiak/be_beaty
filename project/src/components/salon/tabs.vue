<template>
	<div class='relative px-4 bg-accent-color-50 sm:px-0 pb-4'>
  <div class='mx-auto max-w-7xl sm:px-6 lg:px-8'>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">{{ $t("Select a tab") }}</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select id="tabs" name="tabs" class="block w-full focus:ring-main-color-500 focus:border-main-color-500 border-gray-300 rounded-md" @change='$router.push({ name:"Salon", params:{id:$route.params.id, tab: $event.target.value}})'>
        <option v-for="tab in tabs" :value='tab.id' :key="tab.id" :selected="tab.id === $route.params.tab">{{ $t(tab.name) }}</option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="flex space-x-4" aria-label="Tabs">
				<router-link v-for='tab in tabs' :key='tab.id'
										 :class="[tab.id === $route.params.tab ? 'bg-main-color-600 text-white' : 'text-second-color-500 hover:text-second-color-700', 'px-3 py-2 font-medium text-sm rounded-md cursor-pointer']"
										 :to='{name:"Salon", params:{id:$route.params.id, tab:tab.id}}'>
      <span class='truncate'>
        {{ $t(tab.name) }}
      </span>
				</router-link>
<!--        <a v-for="tab in tabs" :key="tab.name" :href="tab.href" :class="[tab.current ? 'bg-main-color-600 text-white' : 'text-second-color-500 hover:text-second-color-700', 'px-3 py-2 font-medium text-sm rounded-md']" :aria-current="tab.current ? 'page' : undefined">
          {{ tab.name }}
        </a>-->
      </nav>
    </div>
  </div>
	</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('salon')

export default {
	computed: {
		...mapState(['tabs']),
	},
}
</script>