import React from 'react';
import {
    useParams,
    useRouteMatch
} from "react-router-dom";
const SceneContainer = props => {
    let { url } = useRouteMatch();
    let {param} = useParams();
    console.log("param " + param + "url" + url + props);
    const displayPhotos = () => {
        return props.scenes.map((scene, i) => {
            return (
                <div key={i}>
                    <h4>{scene.name}</h4>
                    <p>{scene.Description}</p>
                </div>
            );
        });
    };

    return (
        <div>
            <h1>{url.substr(11)}</h1>
            <section>{displayPhotos()}</section>
        </div>
    )
}

export default SceneContainer;