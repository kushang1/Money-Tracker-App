
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [name,setName] = useState('');
  const [datetime,setDatetime] = useState('');
  const [description,setDescription] = useState('');
  const [transactions,setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  },[]);

  async function getTransactions(){
    const url ="http://localhost:3000/api/transactions";
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  function addNewTransaction(ev){
    ev.preventDefault();
    const url ="http://localhost:3000/api/transaction";
    const price = name.split(' ')[0];
    fetch(url,{
      method : 'POST',
      headers : {'Content-type':'application/json'},
      body : JSON.stringify({price,name:name.substring(price.length+1),description,datetime})
    }).then(response => {
      response.json().then(json =>{
        setName('');
        setDatetime('');
        setDescription('');
        console.log('result',json);
      });
    });
  }
  let balance = 0;
  for (const transaction of transactions){
    balance = balance + transaction.price;
  }
  return (
    <main>
      <h1>₹{balance}</h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type = "text" 
                 value={name} 
                 onChange={ev => setName(ev.target.value)}  
                 placeholder={'+1000 new earphones'}/>
          <input type = "datetime-local"
                 value={datetime}
                 onChange={ev => setDatetime(ev.target.value)}/>
        </div>
        <div className="description">
          <input type="text" 
                 placeholder={'Description'}
                 value={description}
                 onChange={ev => setDescription(ev.target.value) }
                 />
        </div>
        <button>Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction => (
          <div className="transaction">
          <div className="left">
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>
          <div className="right">
            <div className={"price " + (transaction.price<0?'red':'green')}>{transaction.price}</div>
            <div className="datetime">{transaction.datetime}</div>
          </div>
        </div>
        ))}
        
      </div>
    </main>
  );
}

export default App
