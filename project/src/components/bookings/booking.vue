<template>
  <TransitionRoot :show='$route.params.action !== undefined' as='template'>
    <Dialog as='div' class='overflow-hidden fixed inset-0 z-40' @close='$router.push({ name: "Bookings" })'>
      <div class='overflow-hidden absolute inset-0'>
        <DialogOverlay class='absolute inset-0' />

        <div class='flex fixed inset-y-0 right-0 pl-10 max-w-full sm:pl-16'>
          <TransitionChild as='template' enter='transform transition ease-in-out duration-500 sm:duration-700' enter-from='translate-x-full'
                           enter-to='translate-x-0' leave='transform transition ease-in-out duration-500 sm:duration-700' leave-from='translate-x-0'
                           leave-to='translate-x-full'>
            <div class='w-screen max-w-2xl'>
              <div class='flex overflow-y-scroll flex-col h-full bg-white shadow-xl'>
                <BookingDetails v-if='$route.params.action === undefined || ($route.params.action === "show" && $route.params.id !== undefined)' />
                <BookingReview v-if='$route.params.action === "review" && $route.params.id !== undefined' />
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { createNamespacedHelpers } from 'vuex'
import BookingDetails from './booking_details.vue'
import BookingReview from './booking_review.vue'

const { mapState, mapActions } = createNamespacedHelpers('booking')

export default {
  name: 'Booking',
  components: {
    BookingDetails,
    BookingReview,
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  },

  computed: {
    ...mapState([]),
  },
  methods: {
    ...mapActions([]),
  },
}

</script>