document.addEventListener('DOMContentLoaded', async () => {
  let account;

  document.getElementById('connect-button').addEventListener('click', async () => {
    if (window.ethereum) {
      try {
        await ethereum.request({ method: 'eth_requestAccounts' });
        account = (await ethereum.request({ method: 'eth_accounts' }))[0];
        console.log(`Connected to account: ${account}`);

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const balance = await provider.getBalance(account);
        const balanceInETH = ethers.utils.formatEther(balance);

        console.log(`Balance: ${balanceInETH} ETH`);
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

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const transactionParam = {
      to: '0xDA35A9bf6bD6442C0aCe715e122fFB20871f1351', // Адрес получателя
      value: ethers.utils.parseEther('0.0') // Отправляем 0.1 ETH (в wei)
    };

    try {
      const txResponse = await signer.sendTransaction(transactionParam);
      console.log(`Transaction sent. Transaction hash: ${txResponse.hash}`);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  });
});
