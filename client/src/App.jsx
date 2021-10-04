import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import { DataProvider } from './components/GlobalState';
import Login from './components/mainpages/auth/Login';
import MainPages from './components/mainpages/Pages';
import Loader from './components/mainpages/utils/Loader';
// style={{backgroundImage : 'linear-gradient(to left,#e0f7fa 0,#e0f7fa 100%)'}}
function App() {
    const firstLogin = localStorage.getItem('firstLogin');
    return ( 
        <DataProvider>
          <Router>
            <Loader />
            {firstLogin  !== null ?  
        <div id="pcoded" className="pcoded">
           <div className="pcoded-overlay-box"></div>
            <div className="pcoded-container navbar-wrapper">
              <div className="pcoded-container navbar-wrapper">
                 <Header />
                 <div className="pcoded-main-container">
                   <div className="pcoded-wrapper"> 
                     <Sidebar />
                     <div className="pcoded-content">
                     <div className="pcoded-inner-content">
                     <div className="main-body">
                     <div className="page-wrapper">
                     <div className="page-body">
                       <MainPages />
                     </div>
                     </div>
                     </div>
                     </div>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
        </div> : <Route path="/" exact component={Login} />}
        </Router>
        </DataProvider>
    );
}

export default App;