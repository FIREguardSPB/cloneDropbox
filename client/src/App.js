import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Disk from "./components/Disk/Disk";
import Navbar from "./components/Navbar/Navbar";
import Registration from "./components/Authorization/Registration";
import Login from "./components/Authorization/Login";
import {useSelector, useDispatch} from "react-redux";
import {auth} from "./actions/user"
import {useEffect} from "react"

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    },[])

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <div className="form">
                    {!isAuth ?
                    <Switch>
                        <Route path="/registration" component={Registration}/>
                        <Route path="/login" component={Login}/>
                        <Redirect to="/login"/>
                    </Switch>
                        :
                        <Switch>
                        <Route exact path="/" component={Disk}/>
                        <Redirect to="/"/>
                        </Switch>


                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
