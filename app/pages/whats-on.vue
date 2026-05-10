<script setup>
useHead({
  title: "What's On | Cinema Booking",
  meta: [
    {
      name: 'description',
      content: 'See what movies are currently playing at the cinema.',
    },
  ],
});

// Fetch popular movies to reuse the carousel
// Even though it's "What's On", we can reuse the same endpoint for the data.
const {
  data: popularMoviesData,
  pending,
  error,
} = await useFetch('/api/movies');
</script>

<template>
  <main>
    <!-- Page Header (Optional) -->
    <div class="container mx-auto px-4 py-8">
      <h1 class="font-tech text-4xl font-bold uppercase text-white mb-2">
        What's On
      </h1>
      <p class="text-gray-400 font-roboto">
        Find out what's playing right now!
      </p>
    </div>

    <!-- Reusable Hero Carousel -->
    <HeroCarousel :movies="popularMoviesData?.results" :pending="pending" />
  </main>
</template>
