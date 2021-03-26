import React from 'react';
import { useRouteMatch } from "react-router-dom";

const SceneContainer = props => {
    let { url } = useRouteMatch();
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
        <>
            {(props.isLoading) ?
                <div className="loader"></div> :
                <div>
                    {(url.substr(11) == "") ? <h1>All sceneSpots</h1> : <h1>{url.substr(11)}</h1>}
                    <section>{displayPhotos()}</section>
                </div>}
        </>
    )
}

export default SceneContainer;