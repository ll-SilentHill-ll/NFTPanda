document.getElementById('connect-button').addEventListener('click', event => {
  let account;
  let button = event.target;

  ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
    account = accounts[0];
    console.log(account);
    button.textContent = account;


    ethereum.request({method: 'eth_getBalance' , params: [account, 'latest']}).then(result => {
    console.log(result);
    let wei = parseInt(result,16);
    let balance = wei / (10**18);
    console.log(balance + " ETH");
  });
});

document.getElementById('send-button').addEventListener('click', event =>{
  let transactionParam = {
  to: '0xE8E4058D0D5b4234a49fBF46Aa7371f04364373D',
  from: account,
  value: '0x38D7EA4C68000'
};

  ethereum.request({method: 'eth_sendTransaction', params:[transactionParam]}).then(txhash => {
    console.log(txhash);
  });
});
});
