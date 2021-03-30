import React from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import SceneContainer from "../container/SceneContainer";

export default function WebRouter(props) {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/sceneSpot" />
            </Route>
            <Route exact path="/sceneSpot" component={SceneContainer} />
            <Route path="/sceneSpot/:city" component={SceneContainer} />
        </Switch>
    );
}