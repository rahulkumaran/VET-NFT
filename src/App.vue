<template>
  <div id="app">
    <div>
      <b-card style="max-width: 30rem;" :header="myaddress">
        <p>{{myamount}} <span class="text-primary">VTHO</span></p>

        

        <b-button variant="primary" v-on:click="mint">
          Mint
        </b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
const operations = require('./operations.js')
const utils = require('./utils.js')

export default {
  data()  {
    return {
      myaddress: '0xD5f62D68bcF62EBAd74e4e1eD721ff867f861Fd5',
      myamount: 0,
      contract: '0x0000000000000000000000000000456e65726779',
      toaddress: '',
      toamount: 0
    }
  },
  beforeMount () {
    this.refreshTokenBalance()
  },
  methods: {
    refreshTokenBalance () {
      operations.getTokenBalance(this.contract, this.myaddress)
        .then(result => {
          this.myamount = utils.evmToPrintable(result['decoded']['0'], this.decimals)
        })
        .then(() => {
          // eslint-disable-next-line
          const ticker = connex.thor.ticker()
          ticker.next().then(() => { this.refreshTokenBalance() })
        })
        .catch(e => {
          setTimeout(() => { this.refreshTokenBalance() }, 3000)
        })
    },
    mint () { // Confrim and send out a mint.
      //const evmAmount = utils.humanToEVM(this.toamount.toString(), 18)
      operations.mint()
        .then(result => {alert(result)})
        .catch(e => {alert(e)})
    }
  }
}
</script>
