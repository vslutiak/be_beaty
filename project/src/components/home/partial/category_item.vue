<template>
  <router-link :to="{ name: 'Category', params: { id: category.id }}" :style="'background-color:'+$filters.tinycolor(category.color).setAlpha(0.15)" class='relative group bg-white p-6 rounded-lg hover:shadow-lg'>
    <div>
        <span class='rounded-2xl inline-flex p-3 ring-4 ring-white'>
          <img :alt='$filters.transString(category.name)' :src='$filters.getFirstMediaUrl(category)' aria-hidden='true' class='h-12 w-12 opacity-60'>
        </span>
    </div>
    <div class='mt-8'>
      <h3 class='text-lg text-second-color-600 font-bold'>
        {{ $filters.transString(category.name) }}
      </h3>
      <p class='mt-2 text-sm text-second-color-400'>
        {{ $filters.stripHtml($filters.transString(category.description)) }}
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'CategoryItem',
  props: ['category'],
}
</script>