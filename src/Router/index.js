import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
  Redirect,
} from 'react-router-dom';
import Home from '../Page/home';
import List from '../Page/list';
import Detail from '../Page/detail';

const RouterList = [
  {
    path:"/list",
    name:"list",
    Component:List
  },
  {
    path:"/detail",
    name:"detail",
    Component:Detail
  },
  {
    path:"/",
    name:"Home",
    Component:Home
  }
]
let RouterGuard = ()=>{
  let history = useHistory();
  let location = useLocation();
  let {pathname} = location ;
  let thisRoute = RouterList.find(e=>e['path'] === pathname);
  if(thisRoute){
    return <Route exact component={thisRoute['Component']} path={pathname} />
  }else{
    return <Redirect to="/error" />
  }
}
let Routes = ()=>{
  return (
    <Router>
      <Switch>
        <RouterGuard/>
      </Switch>
    </Router>
  )
}
export default Routes;
