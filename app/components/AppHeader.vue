<script setup></script>

<template>
  <div>
    <nav class="flex justify-evenly items-center">
      <p class="text-2xl font-bold">Vue</p>
      <ul class="flex gap-4 list-none">
        <li>
          <NuxtLink to="/whats-on">WHAT'S ON</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/trailers">TRAILERS</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/coming-soon">COMING SOON</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">FAMILIES</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">BIG SCREEN EVENTS</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">GIFT CARDS</NuxtLink>
        </li>
      </ul>

      <div class="flex gap-4">
        <div class="btn-login">Login</div>
        <div class="btn-join">Join</div>

        <btn class="btn-account"><Icon name="zmdi:account"></Icon></btn>
        <button class="btn-search">
          <Icon name="material-symbols:search" />
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
