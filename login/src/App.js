import {useEffect} from 'react';
import './App.css';
const CLIENT_ID = "c1c15041b40cebc5271e";
function App() {
      useEffect( ()=>{
      const querystring = window.location.search;
      const urlParams = new URLSearchParams(querystring);
      const codeParam = urlParams.get('code');
      console.log(codeParam);
      },[] )
      function Loginwgh(){
        window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID);
      }
  return (
    <div className="App">
      <header className="App-header">
        hi
       <button onClick={Loginwgh}> login usin gh cuh </button>
      </header>
    </div>
  );
}

export default App;
