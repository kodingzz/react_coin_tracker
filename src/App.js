import { useEffect, useState } from 'react';
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Converter({price,symbol}){
  
  const [num,setNum] =useState(0);
  const [inverted,setInverted] =useState(false);
  return(
    <div className='convert_container'>

    <div className='dollar'>
    <label>USD<img src='img/usa.png'/> </label>
    <input disabled={inverted} type='number' placeholder='0'  value={inverted ? (num*price).toFixed(3)  : num } onChange={(e)=>{
        setNum(e.target.value);
    }}/>
    </div>

    <button   onClick={()=>{
      setInverted(!inverted);
      setNum(0);
    }}><FontAwesomeIcon className='invert' icon={faRepeat}/></button>


    <div className='coin'>
    <label>{symbol}<img src='img/coin.png'/></label>
        <input disabled={!inverted} type='number' placeholder='0'  value={inverted ? num  : (num/price).toFixed(3)} onChange={(e)=>{
          setNum(e.target.value);
        }}/>
    </div>
  
    <div>
   

    <button className='reset' onClick={()=>{
        setNum(0);
    }}>Reset</button>
    </div>
   
</div>
  )
}

function App() {
  const [isLoading,setIsLoading]= useState(true);
  const [coinArr,setCoinArr]= useState([]);
  const [coinPrice,setCoinPrice]= useState();
  const [coinSymbol,setCoinSymbol] =useState(''); 
  const [selected,setIsSelected]= useState(false);
  const [open,setOpen] =useState(false);

  useEffect(()=>{
    fetch('https://api.coinpaprika.com/v1/tickers')
    .then(res=>res.json())
    .then(json=>{
      setCoinArr(json);
      setIsLoading(false);
    });

   
  },[]);

  return (
    <div className='container'>
     
     <h1> <img src='img/ralo.jpg' />Coin Converter! {isLoading ? '' : `(2400!)`}</h1>
    
      {isLoading ? (
        <h2>loading...</h2>
       ) :  (
        <select  className={open ? 'open' : ''} onClick={()=>{
          console.log('clicked');
          setOpen(!open);
          
        }} onChange={(e)=>{
          const arr=e.target.value.split(',');
          arr.length<2 ? setIsSelected(false) : setIsSelected(true); 
          setCoinPrice(arr[0]);
          setCoinSymbol(arr[1]);

      }}>
        <option  >Select Coin!</option>
        {coinArr.map(item=>(
            <option   key={item.id} value={[item.quotes.USD.price.toFixed(3),item.symbol]} >
            {item.name}
            </option> 
        ))}
      </select> 
       )
       
    }
    
    {selected ? <Converter price={coinPrice} symbol={coinSymbol}/> : ''}

    
   
    </div>
  );
}

export default App;
