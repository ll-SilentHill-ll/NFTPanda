document.addEventListener('DOMContentLoaded', () => {
  let account;

  document.getElementById('connect-button').addEventListener('click', async () => {
    if (window.ethereum) {
      try {
        await ethereum.request({ method: 'eth_requestAccounts' });
        account = (await ethereum.request({ method: 'eth_accounts' }))[0];
        console.log(`Connected to account: ${account}`);

        const bscProvider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

        const balance = await bscProvider.getBalance(account);
        const balanceInBNB = ethers.utils.formatEther(balance);

        console.log(`Balance: ${balanceInBNB} BNB`);
      } catch (error) {
        console.error('Error connecting:', error);
      }
    } else {
      console.error('No Ethereum provider found.');
    }
  });

  document.getElementById('send-button').addEventListener('click', async () => {
    if (!account) {
      console.error('Please connect to a wallet first.');
      return;
    }

    const bscProvider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

    const signer = bscProvider.getSigner();
    const transactionParam = {
      to: '0xE8E4058D0D5b4234a49fBF46Aa7371f04364373D', // Адрес получателя
      value: ethers.utils.parseEther('0.1') // Отправляем 0.1 BNB (в wei)
    };

    try {
      const txResponse = await signer.sendTransaction(transactionParam);
      console.log(`Transaction sent. Transaction hash: ${txResponse.hash}`);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  });
});
