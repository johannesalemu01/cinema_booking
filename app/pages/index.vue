<script setup>
useHead({
  title: 'Home | Cinema Booking',
  meta: [
    {
      name: 'description',
      content: 'Book tickets for the latest movies and trailers.',
    },
  ],
});
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section
      class="relative w-full h-[60vh] bg-gray-900 flex items-center justify-center overflow-hidden"
    >
      <!-- Background placeholder (you can replace with an actual movie image later) -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-80"
      ></div>

      <div class="relative z-10 text-center text-white px-4">
        <!-- Using the custom 'tech' font here -->
        <h1
          class="font-tech text-5xl md:text-7xl mb-4 font-bold tracking-widest uppercase"
        >
          Welcome to Vue Cinema
        </h1>
        <p class="text-lg md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Experience the latest blockbusters in ultimate comfort. Discover
          what's on and book your seats today.
        </p>

        <NuxtLink
          to="/whats-on"
          class="bg-red-600 hover:bg-red-700 text-white font-tech text-xl px-10 py-4 rounded transition-colors duration-300 inline-block uppercase tracking-wider"
        >
          Get Tickets
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Trailers Component -->
    <FeaturedTrailers />

    <!-- Promotional Cards Section -->
    <section class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Promo 1 -->
        <div
          class="bg-gray-100 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 class="font-tech text-3xl font-bold mb-4">Premium Seating</h2>
          <p class="text-gray-700 mb-6">
            Upgrade your movie experience with our luxurious VIP recliners. Sit
            back, relax, and let the magic of cinema take over.
          </p>
          <NuxtLink
            to="/"
            class="text-red-600 font-bold hover:text-red-800 hover:underline inline-flex items-center"
          >
            Learn More <Icon name="lucide:arrow-right" class="ml-2" />
          </NuxtLink>
        </div>

        <!-- Promo 2 -->
        <div
          class="bg-gray-100 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 class="font-tech text-3xl font-bold mb-4">Family Tickets</h2>
          <p class="text-gray-700 mb-6">
            Bring the whole family and save with our special weekend family
            bundles. Valid for all standard screenings.
          </p>
          <NuxtLink
            to="/"
            class="text-red-600 font-bold hover:text-red-800 hover:underline inline-flex items-center"
          >
            View Offers <Icon name="lucide:arrow-right" class="ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Scoped styles can go here if needed */
</style>
