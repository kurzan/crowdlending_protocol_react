import { useAccount, useConnect } from 'wagmi';
import Button from '../Button/Button';
import { useState } from 'react';

const InvestField = () => {

  const { address, isConnected } = useAccount();

  const [choiceState, setChoice] = useState(0);

  const setBet = (userBet: number) => {
    setChoice(userBet);
  };

  return (
    <form action="" className="mx-auto flex flex-col justify-items-center">
      <label className="mt-2" htmlFor="bet" >Введите сумму: </label>
      <input onChange={e => setBet(Number(e.target.value))}  id="bet" className="mx-auto p-2 rounded-lg border-solid border-2 border-gray-600" type="number" placeholder="0.0001" min="0.0001" step="0.0001"  />
      {/* {isConnected ? <Button onClick={write} disabled={isLoading || error} title={isLoading ? "Подтвердите действие" : "Начать игру"} /> : <Button onClick={() => connect({ connector: connectors[2] })} title="Подключить MetaMask" />}
      {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )} */}
    </form>
  )
};

export default InvestField;