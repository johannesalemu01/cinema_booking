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
const carouselRef = ref(null);
const scrollLeft = () => {
  if (carouselRef.value) {
    const el = carouselRef.value;
    if (el.scrollLeft <= 10) {
      // Loop to end
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    }
  }
};
const scrollRight = () => {
  if (carouselRef.value) {
    const el = carouselRef.value;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      // Loop to start
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    }
  }
};
</script>

<template>
  <main>
    <!-- Hero Carousel Section -->
    <section class="relative w-full h-[522px] bg-black overflow-hidden group">
      <div
        v-if="pending"
        class="absolute inset-0 flex items-center justify-center text-white"
      >
        Loading top movies...
      </div>

      <!-- Group everything else in a template to avoid v-else-if duplicated conditions -->
      <template v-else-if="popularMoviesData?.results">
        <!-- Arrow Controls (Hidden on mobile, visible on hover on large screens) -->
        <button
          @click="scrollLeft"
          class="absolute left-0 top-0 bottom-0 w-[5vw] flex items-center justify-center z-30 bg-black/40 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
        >
          <Icon name="lucide:chevron-left" class="w-12 h-12" />
        </button>
        <button
          @click="scrollRight"
          class="absolute right-0 top-0 bottom-0 w-[5vw] flex items-center justify-center z-30 bg-black/40 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
        >
          <Icon name="lucide:chevron-right" class="w-12 h-12" />
        </button>

        <div
          ref="carouselRef"
          class="flex w-full h-full overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth"
        >
          <!-- Slides -->
          <div
            v-for="movie in popularMoviesData.results.slice(0, 4)"
            :key="movie.id"
            class="flex-shrink-0 w-full h-full snap-start relative flex flex-col items-center justify-end pb-12"
          >
            <!-- Blurred Backdrop Background -->
            <div class="absolute inset-0 z-0 select-none pointer-events-none">
              <img
                :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
                class="w-full h-full object-cover opacity-30 blur-md"
                alt=""
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
              ></div>
            </div>

            <!-- Foreground Content: Poster and Text -->
            <div
              class="relative z-10 w-[90vw] h-full mx-auto px-[5vw] flex flex-col items-center justify-end"
            >
              <!-- Poster Image - Made Larger -->
              <img
                :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                :alt="movie.title"
                class="w-full flex-1 min-h-0 object-contain object-center rounded-lg shadow-2xl mb-6 mt-4"
              />

              <!-- Below Poster Layout -->
              <div class="w-full flex items-center justify-between text-white">
                <!-- Left: Play Button & Info -->
                <div class="flex items-center gap-4">
                  <!-- Play Trailer Button -->
                  <button
                    class="bg-red-600 rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center hover:bg-red-700 transition flex-shrink-0 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                  >
                    <Icon
                      name="lucide:play"
                      class="text-white w-5 h-5 md:w-6 md:h-6 ml-1"
                    />
                  </button>

                  <!-- Text - Size Reduced -->
                  <div class="flex flex-col text-left">
                    <h2
                      class="font-tech text-xl md:text-3xl font-bold uppercase tracking-wide leading-tight"
                    >
                      {{ movie.title }}
                    </h2>
                    <p
                      class="text-gray-400 text-[10px] md:text-xs uppercase tracking-widest mt-1"
                    >
                      Now playing at your local Vue cinema
                    </p>
                  </div>
                </div>

                <!-- Right: Book Now Button -->
                <div>
                  <NuxtLink
                    :to="`/book/${movie.id}`"
                    class="custom-book-btn font-tech font-bold hover:shadow-[0_0_15px_rgba(238,196,42,0.4)]"
                  >
                    Book Now
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Hint -->
        <div
          class="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-20 pointer-events-none"
        >
          <p class="text-gray-500 text-xs uppercase tracking-widest font-tech">
            Swipe to discover &rarr;
          </p>
        </div>
      </template>
    </section>

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
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
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

.custom-book-btn {
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 1em 1.875em;
  color: #fff;
  background: none;
  text-transform: uppercase;
  font-size: 1rem;
  transition-duration: 0.27s;
  transition-property: color, box-shadow, text-shadow;
  letter-spacing: 0.15em;
  cursor: pointer;
  border-radius: 0.25rem;
  border-style: solid;
  border-width: 2px;
  border-color: transparent #eec42a transparent #b74d1c;
}
</style>
