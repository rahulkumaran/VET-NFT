/**
 * Get token amount of holder from a contract.
 * @param {String} addressContract 0x started address.
 * @param {String} addressHolder 0x started address.
 */

//const vendor = new Connex.Vendor('test')

//const vendor = new Connex.Vendor('test')

async function mint() {
  const mintABI = {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_mintAmount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "payable":true,
    "type": "function"
  }

  const addressContract = "0x79c8676F2EBe04f7f20475FCd777Ec114D5990de"
  const mintMethod = connex.thor.account(addressContract).method(mintABI)
  const mintClause = mintMethod.asClause("0xD5f62D68bcF62EBAd74e4e1eD721ff867f861Fd5", "1")
  const signingService = connex.vendor.sign('tx',[{
    to: '0x79c8676F2EBe04f7f20475FCd777Ec114D5990de',
    value: parseInt("1") + '0'.repeat(18),
  }])

  //console.log(signingService)
    signingService
      .signer("0xD5f62D68bcF62EBAd74e4e1eD721ff867f861Fd5")
      .gas(200000) 
      .comment('NFT transfer: ' + "1")
  
  console.log(signingService)
    let transactionInfo = await signingService.request([
      {
        value: "1000000000000000000",
        comment: 'Hello! Transfer Demo!',
        ...mintClause
      }
    ])

    console.log(transactionInfo)
    return transactionInfo
  
}

async function getTokenBalance (addressContract, addressHolder) {
    const balanceOfABI = {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
    // eslint-disable-next-line
    const balanceOfMethod = connex.thor.account(addressContract).method(balanceOfABI)
    const balanceInfo = await balanceOfMethod.call(addressHolder)
    console.log(balanceInfo)
    return balanceInfo
}

/**
 * Transfer token from one to another.
 * @param {String} addressContract Contract address.
 * @param {String} signerAddress Enforce who signs the transaction.
 * @param {String} toAddress Receiver of transfer.
 * @param {String} amountEVM Big number in string.
 * @param {Number} amountHuman Normal number in Javascript.
 * @param {String} symbol Symbol of token.
 */
async function transferToken (addressContract, signerAddress, toAddress, amountEVM, amountHuman, symbol) {
    const transferABI = {
      'constant': false,
      'inputs': [
        {
          'name': '_to',
          'type': 'address'
        },
        {
          'name': '_value',
          'type': 'uint256'
        }
      ],
      'name': 'transfer',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    }
    // eslint-disable-next-line
    const transferMethod = connex.thor.account(addressContract).method(transferABI)
    const transferClause = transferMethod.asClause(toAddress, amountEVM)
    // eslint-disable-next-line
    const signingService = connex.vendor.sign('tx')
    signingService
      .signer(signerAddress) // Enforce signer
      .comment('Token transfer: ' + amountHuman.toString() + ' ' + symbol)
  
    let transactionInfo = await signingService.request([
      {
        comment: 'Hello! Transfer Demo!',
        ...transferClause
      }
    ])
    return transactionInfo
  }

  export {
    mint,
    getTokenBalance,
    transferToken,
  }