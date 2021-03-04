import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CircularProgress } from '@material-ui/core';

const AllergensLazy = lazy(() => import('../Allergens/Allergens'));
const IncidentCreateLazy = lazy(() => import('../IncidentCreate/IncidentCreate'));//TODO split router


const Router: React.FC = () => (
    <BrowserRouter>
        <Switch>
          <Route path="/allergens">
            <Suspense fallback={<CircularProgress/>}>
                <AllergensLazy/>
            </Suspense>
          </Route>
          <Route path="/incidents/create">
            <Suspense fallback={<CircularProgress/>}>
                <IncidentCreateLazy/>
            </Suspense>
          </Route>
          <Route path="/report">
            <div>Report...</div>
          </Route>
          <Route path="/">
            <div>Home...</div>
          </Route>
        </Switch>
    </BrowserRouter>
)

export default Router;