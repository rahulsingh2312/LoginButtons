import {useEffect , useState} from 'react';
import './App.css';
const CLIENT_ID = "c1c15041b40cebc5271e";
function App() {
     const [rerender , setRerender] = useState(false);
     const [userData , setuserData] = useState(null);
     const [showProfileButton, setShowProfileButton] = useState(true);
      useEffect( ()=>{
      const querystring = window.location.search;
      const urlParams = new URLSearchParams(querystring);
      const codeParam = urlParams.get('code');
      console.log(codeParam);

      if(codeParam && (localStorage.getItem("accessToken")===null)){
        async function getaccessToken(){
          await fetch("https://login-button-server.onrender.com/getAccessToken?code="+codeParam , {
            method:"GET"
          }).then((response)=>{
            return  response.json();
        }).then((data)=>{
            console.log(data);
            if(data.access_token){
              localStorage.setItem("accessToken",data.access_token);
              setRerender((prevRerender) => !prevRerender);
            }
        });
        }
        getaccessToken();
      }

      },[setRerender] )

      async function getUserData(){
        await fetch("https://login-button-server.onrender.com/getUserData" , {
          method:"GET",
          headers:{
            "Authorization" :"Bearer " + localStorage.getItem("accessToken")
          }
        }).then((response)=>{
          return  response.json();
      }).then((data)=>{
          console.log(data);
          setuserData(data);
          setShowProfileButton(false);
      });
      }

      function Loginwgh(){
        window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID);
      }
  return (
    <div className="App">
      <header className="App-header">
       {localStorage.getItem("accessToken")?<>
       <h3>
        we have accessToken 
       </h3>
       <button style={{ marginBottom: "20px" }} onClick={() => { localStorage.removeItem("accessToken"); setRerender(!rerender) }}>Log Out cuh</button>

       {showProfileButton && <button onClick={getUserData}>See Your Profile 😄</button>}


      {userData && Object.keys(userData).length !== 0 ? (
  <>
    <h4>hey there {userData.name} </h4>
    <img src={userData.avatar_url} alt="Profile Avatar" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                <p>Bio: {userData.bio}</p>
                <p>Location: {userData.location}</p>
                {userData.twitter_username && (
                  <p>
                    Twitter: <a href={`https://twitter.com/${userData.twitter_username}`} target="_blank" rel="noopener noreferrer">@{userData.twitter_username}</a>
                  </p>)}
                  <p>Public Repos: {userData.public_repos}</p>
                <p>Followers: {userData.followers}</p>
                <p>Following: {userData.following}</p>
                <p>Member since: {new Date(userData.created_at).toLocaleDateString()}</p>
                <p>Last updated: {new Date(userData.updated_at).toLocaleString()}</p>
             
  </>
) : (
  <></>
)}
        </> : <> 
      
       <button onClick={Loginwgh}> login usin gh cuh </button>
       </>}
      </header>
    </div>
  );
}

export default App;
