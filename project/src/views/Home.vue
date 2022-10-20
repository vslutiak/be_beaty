<template>
  <Slider />
  <FeaturedCategories />
  <RecommendedSalons />
</template>

<script>

import Slider from '../components/home/slider.vue'
import FeaturedCategories from '../components/home/featured_categories.vue'
import RecommendedSalons from '../components/home/recommended_salons.vue'

export default {
  components: {
    Slider,
    FeaturedCategories,
    RecommendedSalons,
  },
}
</script>
