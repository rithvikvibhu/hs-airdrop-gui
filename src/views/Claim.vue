<template>
  <div class="pt-8 flex-grow flex space-x-5 bg-gray-50">
    <!-- Steps -->
    <div
      id="steps"
      class="flex-shrink-0 px-8 py-4 space-y-6 border-r select-none"
    >
      <div
        v-for="(step, idx) in steps"
        :key="step"
        @click.middle="currentStep = idx"
        class="flex items-center step cursor-pointer"
      >
        <div
          class="relative w-6 h-6 rounded-full border-2 border-gray-800 border-opacity-50 bg-white"
        >
          <div
            v-if="idx <= currentStep"
            class="mx-auto my-1 w-3 h-3 rounded-full border bg-gray-800 bg-opacity-80"
          ></div>
        </div>
        <div class="ml-6" :class="{ 'opacity-50': idx != currentStep }">
          <p class="text-sm font-medium uppercase">{{ step.name }}</p>
          <p class="text-xs font-medium text-gray-500">{{ step.text() }}</p>
        </div>
      </div>

      <!-- Back to Intro -->
      <button @click="$router.go(-1)" class="text-sm border-b">GO BACK</button>
    </div>

    <!-- Content -->
    <div class="flex-grow p-4 bg-red-5">
      <!-- Step 0 - Type Selecton -->
      <section v-if="currentStep == 0" class="pr-8 text-gray-800">
        <!-- Text -->
        <div class="space-y-4">
          <p>
            This tool will create the proof necessary to collect your faucet
            reward, airdrop reward, or sponsor reward on the Handshake
            blockchain.
          </p>
          <p>
            For airdrop rewards, you must have the SSH/PGP private key to
            proceed.<br />
            For faucet rewards, just the handshake address is enough.
          </p>
          <p>Select how you want to create the proof:</p>
        </div>

        <!-- Type Selection -->
        <div class="mt-6 flex justify-between space-x-4">
          <div class="flex items-center">
            <input
              id="radio-ssh"
              name="key-type"
              v-model="keyType"
              type="radio"
              value="ssh"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label
              for="radio-ssh"
              class="ml-4 text-sm font-medium text-gray-700"
            >
              <p>SSH Key</p>
              <p class="text-sm leading-5 text-gray-500">
                Private key + Passphrase
              </p>
            </label>
          </div>
          <div class="flex items-center">
            <input
              id="radio-pgp"
              name="key-type"
              v-model="keyType"
              type="radio"
              value="pgp"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label
              for="radio-pgp"
              class="ml-4 text-sm font-medium text-gray-700"
            >
              <p>PGP Key</p>
              <p class="text-sm leading-5 text-gray-500">Key ID + Secret key</p>
            </label>
          </div>
          <div class="flex items-center">
            <input
              id="radio-faucet"
              name="key-type"
              v-model="keyType"
              type="radio"
              value="faucet"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label
              for="radio-faucet"
              class="ml-4 text-sm font-medium text-gray-700"
            >
              <p>Faucet</p>
              <p class="text-sm leading-5 text-gray-500">No key required</p>
            </label>
          </div>
        </div>
      </section>

      <!-- Step 1 - Private Key -->
      <section v-if="currentStep == 1" class="pr-8 text-gray-800">
        <!-- Text -->
        <div class="space-y-1">
          <h4 class="text-base font-medium text-gray-900">
            Paste your private key here
          </h4>
          <p class="text-sm text-gray-500">
            These are used offline and never leave your computer.
          </p>
        </div>

        <!-- Textbox (only SSH and PGP) -->
        <div v-if="keyType == 'ssh' || keyType == 'pgp'">
          <textarea
            v-model="privateKey"
            class="mt-4 w-full h-36 p-4 text-sm font-mono rounded-md border shadow-inner resize-none"
            :placeholder="
              keyType == 'ssh'
                ? placeholders.sshPrivateKey
                : placeholders.pgpPrivateKey
            "
          ></textarea>
          <p
            v-if="privateKey.length && !isValidKey"
            class="text-sm text-red-700"
          >
            Invalid <span class="uppercase">{{ keyType }}</span> private key
          </p>
        </div>

        <!-- If Faucet reward -->
        <div v-else class="mt-4">
          <p>Faucet rewards don't require any private key.</p>
        </div>

        <!-- Passphrase -->
        <div
          v-if="keyType == 'ssh' || keyType == 'pgp'"
          class="mt-1 flex items-center"
        >
          <label class="py-1 inline-flex items-center">
            <input
              type="checkbox"
              v-model="isKeyEncrypted"
              class="h-4 w-4"
            /><span class="ml-2 text-sm text-gray-700 select-none"
              >Is the key encrypted with a passphrase?</span
            >
          </label>
          <input
            v-show="isKeyEncrypted"
            v-model="keyPassphrase"
            class="flex-grow mx-4 px-2 py-1 text-sm rounded border shadow-sm"
            type="password"
            placeholder="Passphrase"
          />
        </div>

        <!-- PGP Key ID -->
        <label v-if="keyType == 'pgp'" class="mt-4 block">
          <span class="text-sm text-gray-700">PGP Key ID</span>
          <input
            type="text"
            v-model="keyId"
            class="mt-1 block w-full px-3 py-2 rounded border shadow-sm"
            :placeholder="placeholders.keyId"
          />
        </label>
      </section>

      <!-- Step 2 - Output Address -->
      <section v-if="currentStep == 2" class="pr-8 text-gray-800">
        <!-- Text -->
        <div class="space-y-1">
          <h4 class="text-base font-medium text-gray-900">
            Paste your HNS address here
          </h4>
          <p class="text-sm text-gray-500">
            Once claimed, the airdrop amount will be deposited to this address.
          </p>
        </div>

        <!-- Address -->
        <label class="mt-6 block">
          <span class="text-sm text-gray-700">HNS Address</span>
          <input
            type="text"
            v-model="hnsAddress"
            class="mt-1 block w-full px-3 py-2 rounded border shadow-sm"
            :placeholder="placeholders.hnsAddr"
          />
        </label>

        <!-- How to get one -->
        <div class="mt-6">
          <p
            @click="toggles.getHnsAddress = !toggles.getHnsAddress"
            class="text-sm font-medium cursor-pointer"
          >
            Where do I get this from?
          </p>
          <p v-if="toggles.getHnsAddress" class="mt-1 text-sm text-gray-600">
            In Namebase, click on "Generate address" in the Dashboard.<br />
            In Bob, click on "Show address" in the Send tab.
          </p>
        </div>
      </section>

      <!-- Step 3 - Create Proofs -->
      <section v-if="currentStep == 3" class="pr-8 text-gray-800">
        <!-- Text -->
        <div class="space-y-1">
          <h4 class="text-base font-medium text-gray-900">
            Sit back and relax
          </h4>
          <p class="text-sm text-gray-500">
            This will take a few minutes.
          </p>
        </div>

        <!-- Progress Bar -->
        <div
          class="mt-4 w-full h-4 flex items-center rounded-full border shadow-inner bg-white"
        >
          <div
            class="w-0 h-2 mx-1 rounded-full bg-gray-600 transition-all"
            :style="{ width: progress + '%' }"
          ></div>
        </div>

        <!-- Log -->
        <div
          ref="log"
          class="mt-6 p-4 h-48 text-sm leading-6 bg-white rounded-md border overflow-auto"
        >
          <p v-for="entry in log" :key="entry">{{ entry }}</p>
        </div>
      </section>

      <!-- Step 4 - Use the Proofs -->
      <section v-if="currentStep == 4" class="pr-8 text-gray-800">
        <!-- Text -->
        <div class="space-y-1">
          <h4 v-if="proofs.length" class="text-base font-medium text-gray-900">
            Found {{ proofs.length }} proof<span v-if="proofs.length > 1"
              >s</span
            >!
          </h4>
          <h4 v-else class="text-base font-medium text-gray-900">
            No proofs found.
          </h4>
          <p v-if="proofs.length" class="text-sm text-gray-500">
            The proofs are base64-encoded. Paste this in a wallet like hsd and
            Bob.
          </p>
        </div>

        <!-- How to use proofs -->
        <div class="mt-3">
          <p
            @click="toggles.useProofs = !toggles.useProofs"
            class="text-sm font-medium cursor-pointer"
          >
            How do I use these proofs?
          </p>
          <div
            v-if="toggles.useProofs"
            class="mt-1 space-y-2 text-sm text-gray-600"
          >
            <p>
              If you have an account on Namebase, paste this on
              https://www.namebase.io/airdrop (Step 5)
            </p>
            <p>
              In Bob, go to the "Add Funds" tab and click on "Redeem" in the
              sidebar.
            </p>
            <p>
              If you have hsd installed, broadcast the claim with
              <span class="px-2 font-mono rounded whitespace-nowrap bg-gray-200"
                >hsd-rpc sendrawairdrop "&lt;proof-string&gt;"</span
              >
            </p>
          </div>
        </div>

        <!-- Proofs -->
        <div v-for="(proof, idx) in proofs" :key="proof" class="mt-6">
          <div class="flex items-center">
            <span class="">Proof {{ idx + 1 }}</span>
            <!-- <span class="ml-2 text-sm">(Type: GOO)</span> -->
            <button
              @click="copy(proof.b64encoded, $event)"
              class="ml-4 px-2 py-1 text-xs font-semibold rounded border-2 text-gray-500 border-gray-300"
            >
              COPY
            </button>
          </div>
          <div
            class="mt-2 h-20 p-1 break-all text-sm font-mono rounded border bg-white overflow-x-auto select-all"
          >
            {{ proof.b64encoded }}
          </div>
        </div>
      </section>

      <!-- Next and Back buttons -->
      <div v-if="!isLoading" class="mt-8 pr-8">
        <!-- Back button -->
        <button
          v-if="currentStep > 0"
          @click="currentStep--"
          class="py-2 rounded font-mono uppercase text-gray-700"
        >
          &lt; Back
        </button>

        <!-- Next button -->
        <button
          v-if="currentStep < steps.length - 1"
          @click="currentStep++"
          class="px-6 py-2 float-right rounded font-mono uppercase text-gray-50 bg-gray-700 transition-opacity duration-200"
          :class="{ 'opacity-50 cursor-not-allowed': !canGoToNext }"
          :disabled="!canGoToNext"
        >
          Next &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Claim',
  components: {},
  data() {
    return {
      steps: [
        { name: 'Type Selection', text: () => this.keyType.toUpperCase() },
        {
          name: 'Private Key',
          text: () =>
            (this.isValidKey ? 'Valid' : 'Invalid') +
            (this.isKeyEncrypted && this.keyType != 'faucet'
              ? ' / encrypted'
              : ''),
        },
        {
          name: 'Output Address',
          text: () => this.hnsAddress.slice(0, 10) + '...',
        },
        { name: 'Create Proofs', text: () => 'Fingers crossed' },
        { name: 'Use the Proofs', text: () => 'Namebase/Bob/hsd' },
      ],
      toggles: {
        getHnsAddress: false,
        useProofs: false,
      },
      placeholders: {
        sshPrivateKey:
          '-----BEGIN OPENSSH PRIVATE KEY-----\nCe0UetRExfN3V1i6oxyDPoq77AC5EuEMOdddOWz35DNcz2AiHgVsxuLxjfWO2\n...\n...\n...\n-----END OPENSSH PRIVATE KEY-----',
        pgpPrivateKey:
          '-----BEGIN PGP PRIVATE KEY BLOCK-----\nCe0UetRExfN3V1i6oxyDPoq77AC5EuEMOdddOWz35DNcz2AiHgVsxuLxjfWO2\n...\n...\n...\n-----BEGIN PGP PRIVATE KEY BLOCK-----',
        keyId: '0xA8E101DF4C93E2BC',
        hnsAddr: 'hs1q5z7yyk8xrh4quqg3kw498ngy7hnd4sruqyxnxd',
      },
      currentStep: 0,
      keyType: '',
      privateKey: '',
      keyId: '',
      isKeyEncrypted: false,
      keyPassphrase: '',
      hnsAddress: '',
      isLoading: false,
      progress: 0,
      log: [],
      proofs: [],
    }
  },
  mounted() {
    // Update redeem log and progress in step 3
    window.ipcRenderer.on('redeem-update-status', (event, update) => {
      console.log(event, update)
      this.log.push(update.status)

      if (update.percent >= 0) this.progress = update.percent

      let log = this.$refs.log
      if (log) log.scrollTop = log.scrollHeight

      if (update.percent == 100 || update.percent == -1) {
        this.isLoading = false
      }
    })

    // Proofs are sent separately, not as part of update status
    window.ipcRenderer.on('redeem-proofs-data', (event, proofData) => {
      console.log(event, proofData)
      this.proofs = proofData
    })
  },
  methods: {
    /* Copies text to clipboard in a hacky way
      https://stackoverflow.com/a/48542290/1724828 */
    textToClipboard(text) {
      let dummy = document.createElement('textarea')
      document.body.appendChild(dummy)
      dummy.value = text
      dummy.select()
      document.execCommand('copy')
      document.body.removeChild(dummy)
    },

    /* Copies the text to clipboard and changes
      the button text to 'Copied' for some time */
    copy(text, event) {
      this.textToClipboard(text)
      event.target.textContent = 'Copied!'
      setTimeout(() => {
        event.target.textContent = 'COPY'
      }, 1000)
    },
  },
  watch: {
    /* If moving into step 3 from and previous steps,
      call the redeem function (in airdrop.js) */
    currentStep: function(newVal, oldVal) {
      if (newVal == 3 && oldVal < newVal) {
        this.isLoading = true
        this.log = []
        this.proofs = []
        window.ipcRenderer.send('redeem', {
          keyType: this.keyType,
          privKey: this.privateKey.replace(/^\s+/gm, ''),
          keyId: this.keyId,
          hnsAddr: this.hnsAddress,
          passphrase: this.isKeyEncrypted ? this.keyPassphrase : '',
        })
      }
    },
  },
  computed: {
    /* Verifies if the private key is valid with regex */
    isValidKey() {
      switch (this.keyType) {
        case 'ssh':
          if (
            !/^-----BEGIN \w+ PRIVATE KEY-----[^]+-----END \w+ PRIVATE KEY-----$/.test(
              this.privateKey
            )
          )
            return false
          break

        case 'pgp':
          if (
            !/^-----BEGIN PGP PRIVATE KEY BLOCK-----[^]+-----END PGP PRIVATE KEY BLOCK-----$/.test(
              this.privateKey
            )
          )
            return false
          break

        case 'faucet':
          return true

        default:
          return false
      }
      return true
    },

    /* Verifies if valid handshake address.
      More detailed bech-32 validation done in airdrop.js later on. */
    isValidAddress() {
      if (this.hnsAddress.length == 42 && this.hnsAddress.startsWith('hs1'))
        return true
      else return false
    },

    /* Form validation for each step */
    canGoToNext() {
      switch (this.currentStep) {
        // Key type must be selected
        case 0:
          return !!this.keyType

        // Must be a valid private key, and
        // Must have a passphrase if checkbox is checked, and
        // Must have a valid key ID if key type is PGP
        case 1:
          return (
            this.isValidKey &&
            (!this.isKeyEncrypted ||
              (this.isKeyEncrypted && this.keyPassphrase)) &&
            (this.keyType != 'pgp' ||
              (this.keyType == 'pgp' &&
                this.keyId.toLowerCase().startsWith('0x')))
          )
        // The address must be valid
        // The address must be valid
        case 2:
          return this.isValidAddress

        // No verification for the progress step
        case 3:
          return true

        // Should never reach here, but meh
        default:
          return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#steps > div:not(:nth-last-child(-n + 2)) > div:first-child::before {
  content: '';
  display: block;
  position: absolute;
  top: 100%;
  left: 50%;
  border: 1px solid #6b728040;
  border-width: 0 0 0 2px;
  width: 1px;
  height: 50px;
}
</style>
