<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

defineProps({
  movies: {
    type: Array,
    default: () => [],
  },
  pending: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <section class="relative w-full h-[522px] bg-black overflow-hidden group">
    <div
      v-if="pending"
      class="absolute inset-0 flex items-center justify-center text-white"
    >
      Loading movies...
    </div>

    <template v-else-if="movies && movies.length">
      <!-- Arrow Controls (Hidden on mobile, visible on hover on large screens) -->
      <button
        class="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-14 h-14 rounded-full text-white hover:bg-gray-400/50 opacity-0 group-hover:opacity-100 transition-all hidden md:flex cursor-pointer"
      >
        <Icon name="lucide:chevron-left" class="w-8 h-8" />
      </button>
      <button
        class="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-14 h-14 rounded-full text-white hover:bg-gray-400/50 opacity-0 group-hover:opacity-100 transition-all hidden md:flex cursor-pointer"
      >
        <Icon name="lucide:chevron-right" class="w-8 h-8" />
      </button>

      <Swiper
        :loop="true"
        :speed="800"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
        :modules="[Autoplay, Navigation]"
        class="w-full h-full"
      >
        <!-- Slides -->
        <SwiperSlide
          v-for="movie in movies.slice(0, 4)"
          :key="movie.id"
          class="relative flex flex-col items-center justify-end pb-12 w-full h-full"
        >
          <!-- Blurred Backdrop Background -->
          <div class="absolute inset-0 z-0 select-none pointer-events-none">
            <NuxtImg
              :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
              class="w-full h-full object-cover opacity-30 blur-md"
              alt=""
              loading="lazy"
              format="webp"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
            ></div>
          </div>

          <!-- Foreground Content: Poster and Text -->
          <div
            class="relative z-10 w-[90vw] h-full mx-auto flex flex-col items-center justify-end"
          >
            <!-- Poster Image -->
            <NuxtImg
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="w-full flex-1 min-h-0 object-cover object-center rounded-lg shadow-2xl mb-6 mt-4"
              loading="lazy"
              format="webp"
            />

            <!-- Below Poster Layout -->
            <div class="w-full flex items-center justify-between text-white">
              <!-- Left: Play Button & Info -->
              <div class="flex items-center gap-4">
                <!-- Play Trailer Button -->
                <button class="play-button group/play shrink-0">
                  <svg width="0" height="0" class="absolute hidden">
                    <linearGradient
                      id="playGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stop-color="#b74d1c" />
                      <stop offset="100%" stop-color="#eec42a" />
                    </linearGradient>
                  </svg>
                  <Icon
                    name="lucide:play"
                    class="w-6 h-6 ml-1 transition-all duration-300"
                    style="stroke: url(#playGrad); fill: url(#playGrad)"
                  />
                </button>

                <!-- Text -->
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
        </SwiperSlide>
      </Swiper>

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
</template>

<style scoped>
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
  border-width: 0 2px; /* Updated top and bottom border to 0 */
  border-color: transparent #eec42a transparent #b74d1c;
}

.play-button {
  width: var(--play-button-icon-size, 48px);
  height: var(--play-button-icon-size, 48px);
  display: flex;
  border-radius: 50%;
  position: relative;
  align-items: center;
  justify-content: center;
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  background-color: transparent;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.play-button:hover {
  background-color: white;
  transform: scale(1.05);
}
</style>
