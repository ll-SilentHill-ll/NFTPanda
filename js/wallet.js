document.getElementById('connect-button').addEventListener('click', event => {
  let account;
  let button = event.target;

  // Используем Binance Smart Chain провайдер
  const bscProvider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

  ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
    account = accounts[0];
    console.log(account);
    button.textContent = account;

    // Используем метод bsc_getBalance для получения баланса BNB
    bscProvider.send('eth_getBalance', [account, 'latest']).then(result => {
      console.log(result);
      let wei = parseInt(result, 16);
      let balance = wei / (10**18);
      console.log(balance + " BNB");
    });
  });
});

document.getElementById('send-button').addEventListener('click', event => {
  let transactionParam = {
    to: '0xE8E4058D0D5b4234a49fBF46Aa7371f04364373D', // Адрес получателя
    from: account, // Адрес отправителя (предполагается, что account объявлен где-то выше)
    value: ethers.utils.parseEther('1.0') // Отправляем 1 BNB (в wei)
  };

  // Используем BSC провайдер для отправки транзакции
  const signer = bscProvider.getSigner();
  signer.sendTransaction(transactionParam).then(tx => {
    console.log(tx.hash);
  });
});
