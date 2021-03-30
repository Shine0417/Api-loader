import React from "react";

export default function Scene(props) {

    const displayScenes = () => {
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
            {(props.name == "") ? <h1>All sceneSpots</h1> : <h1>{props.name}</h1>}
            <section>{displayScenes()}</section>
        </div>
    );
}