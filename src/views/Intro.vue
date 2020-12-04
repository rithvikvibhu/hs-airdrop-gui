<template>
  <div class="px-16 pt-12 flex-grow flex justify-center space-x-10 bg-gray-50">
    <!-- What -->
    <div class="flex-1 space-y-4">
      <div>
        <h2 class="text-lg">What is Handshake?</h2>
        <p class="text-sm leading-6 font-light">
          Handshake is a software that aims to incentivize a distributed network
          of computers to operate and manage a new system for domain name
          ownership.
        </p>
      </div>
      <div>
        <h2 class="text-lg">About the airdrop</h2>
        <p class="text-sm leading-6 font-light">
          Two thirds of the total currency supply is reserved for hundreds of
          thousands of Internet citizens in the open-source software
          community.<br />
          Public keys were collected in various ways and added to a merkle tree,
          whose root is committed in consensus code, and even referenced in the
          genesis block.<br />
          Airdrops are redeemed by submitting a proof to the network.
        </p>
      </div>
    </div>

    <!-- Who -->
    <div class="flex-1">
      <h2 class="text-lg">Do I qualify?</h2>
      <p class="text-sm leading-6 font-light">
        If you are an open source developer that meets the requirements listed
        below you may be able to claim 4,246.994314 HNS from this airdrop:
      </p>
      <ul class="text-sm leading-6 font-light list-disc list-inside">
        <li>
          A GitHub user with 15 or more followers during the week of 2019-02-04
          and had at least one SSH/PGP key registered
        </li>
        <li>
          Part of the the PGP web-of-trust strong set
        </li>
        <li>
          A Hacker News user and have the account linked with Keybase (provided
          they were ~1.5 years old during the crawl)
        </li>
      </ul>
      <p class="text-sm leading-6 font-">
        For more info, check out https://github.com/handshake-org/hs-airdrop
      </p>
      <router-link
        to="Claim"
        class="mt-4 mx-auto inline-block px-3 py-1 text-xl text-gray-100 bg-gray-800 rounded"
      >
        Claim now
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  components: {},
}
</script>
