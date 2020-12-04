<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="flex-shrink-0 px-20 py-7 text-center bg-gradient-to-br from-gray-100 to-gray-300"
    >
      <div class="flex items-center justify-center">
        <img class="w-8 h-8 mr-3" src="/icon.png" alt="Handshake Logo" />
        <!-- <img
          class="w-8 h-8 mr-3"
          src="https://avatars0.githubusercontent.com/u/29678722?s=200&v=4"
          alt="Handshake Logo"
        /> -->
        <h1 class="text-2xl">Handshake Airdrop</h1>
      </div>
      <p class="mt-4 font-light">
        Redemption tool for the Handshake network's decentralized airdrop to
        open source developers
      </p>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss"></style>
