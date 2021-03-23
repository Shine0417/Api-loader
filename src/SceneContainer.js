import React from 'react';
import Photo from "./Photo";
import {
    useParams,
    useRouteMatch
} from "react-router-dom";
const SceneContainer = props => {
    let { url } = useRouteMatch();
    let { id } = useParams();
    console.log("url:" + url + "id:" + id)
    const displayPhotos = () => {
        return props.scenes.map(scene => {
            return (
                <div>
                    <h4>{scene.name}</h4>
                    <p>{scene.Description}</p>
                    <Photo url={scene.url} />
                </div>
            );
        });
    };

    return (
        <>
            <section>{displayPhotos()}</section>
        </>
    )
}

export default SceneContainer;