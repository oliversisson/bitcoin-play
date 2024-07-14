import React, { useContext, useState } from 'react';
import forge from 'node-forge';
import { useTheme } from './MyContext';
import Transaction from './Transaction.js';

const maxTransactions = 4;
const md = forge.md.sha256.create();

const NewBlock = () => {
  const { balance, transactions, addBlock } = useTheme();
  const [nonce, setNonce] = useState(0);
  const [sha, setSha] = useState(undefined);

  const onChangeNonce = (e) => {
    setNonce(e.target.value);
    setSha(undefined);
  };

  const onClickAddBlock = (e) => {
    addBlock(sha, nonce);
    setNonce(0);
    setSha(undefined);
  }

  const onClickCalcSHA = (e) => {
    const block = {transactions, nonce};
    md.update(JSON.stringify(block));
    setSha(md.digest().toHex());
  }

  const shaErrorOrFalse = () => {
    const selectedTs = transactions.filter(t => (!!t.selected));
    if (selectedTs.length === 0) {
      return "No transactions selected. Select a transaction on the left.";
    }
    if (selectedTs.length > maxTransactions) {
      return "Too many transactions! Maximum number: " + maxTransactions;
    }
    return false;
  }

  return (
    <div className="newblock">
      <p>Your current balance: {balance}</p>
      <p>Your proposed new block</p>
      {transactions.filter(t => (!!t.selected)).map(t => (
        <Transaction t={t} key={t.key} />
      ))}
      <p> Prev hash: {} </p>
      <p> Nonce: <input type="number" value={nonce} onChange={onChangeNonce} /> </p>
      {shaErrorOrFalse() || (
        <button type="button" onClick={onClickCalcSHA}>Calculate SHA256 hash</button>
      )}
      {sha && (
        <div>
          <p>Hash: {sha}</p>
        </div>
      )}
      {sha && (
        sha.charAt(sha.length - 1) === "0" ?
          <div> 
            <button type="button" onClick={onClickAddBlock}>Add block</button>
          </div> :
          <p>
            The SHA must end in a 0 to add a block. Change the nonce and try again.
          </p>
        )
      }
    </div>
  );
}

export default NewBlock;
