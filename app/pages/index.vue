<script setup>
import { ref } from 'vue';

useHead({
  title: 'Home | Cinema Booking',
  meta: [
    {
      name: 'description',
      content: 'Book tickets for the latest movies and trailers.',
    },
  ],
});

// Fetch popular movies from our server route
const {
  data: popularMoviesData,
  pending,
  error,
} = await useFetch('/api/movies');

// Carousel Navigation
</script>

<template>
  <main>
    <!-- Hero Carousel Section -->
    <HeroCarousel :movies="popularMoviesData?.results" :pending="pending" />

    <!-- Featured Trailers Component -->
    <FeaturedTrailers />

    <!-- Popular Movies Section from TMDB API -->
    <section class="container mx-auto px-4 py-12">
      <h2 class="font-tech text-4xl font-bold mb-8 text-center uppercase">
        Popular Movies
      </h2>

      <div v-if="pending" class="text-center text-gray-400">
        Loading movies...
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        Failed to load movies.
      </div>

      <div
        v-else-if="popularMoviesData?.results"
        class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        <div
          v-for="movie in popularMoviesData.results.slice(0, 10)"
          :key="movie.id"
          class="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
        >
          <!-- TMDB Image path -->
          <NuxtImg
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            format="webp"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
          >
            <h3 class="font-bold text-white text-lg leading-tight mb-1">
              {{ movie.title }}
            </h3>
            <p class="text-yellow-400 text-sm mb-2">
              ★ {{ movie.vote_average.toFixed(1) }}/10
            </p>
            <NuxtLink
              :to="`/movies/${movie.id}`"
              class="text-xs bg-red-600 hover:bg-red-700 text-white font-tech uppercase py-2 px-3 text-center rounded"
            >
              View Details
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Promotional Cards Section -->
    <section class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Promo 1 -->
        <div
          class="bg-gray-100 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 class="font-tech text-black text-3xl font-bold mb-4">
            Premium Seating
          </h2>
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
          <h2 class="font-tech text-black text-3xl font-bold mb-4">
            Family Tickets
          </h2>
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
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
