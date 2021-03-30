import React, { useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import Scene from "../component/Scene";

const SceneContainer = props => {
    let { url } = useRouteMatch();
    const [sceneSpots, setSceneSpots] = useState([1]);
    const [isLoading, setIsLoading] = useState(false);
    const [nowCity, setNowCity] = useState("");
    const [scrollCount, setScrollCount] = useState(0);
    const pagesize = 30;

    useEffect(() => {
        setNowCity(window.location.pathname.substr(10));
        setIsLoading(true);
        fetchData(window.location.pathname.substr(10), 0, pagesize, false);
        setScrollCount(0);
    }, [url]);

    useEffect(() => {
        if (scrollCount > 0)
            fetchData(nowCity, scrollCount * pagesize, pagesize, true);
    }, [scrollCount])

    const fetchData = (city, skipNum, topNum, infScroll) => {
        fetch(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?$skip=${skipNum}&$top=${topNum}&$format=JSON`)
            .then(response => {
                // console.log(response);
                if (!response.ok) {
                    throw Error("Err fetching scenes");
                }
                return response.json();
            })
            .then(alldata => {
                var scenes = alldata.map(function (obj) {
                    var scene = {
                        name: obj.Name,
                        Description: (obj.Description === undefined || obj.Description === "") ? obj.DescriptionDetail : obj.Description,
                    }
                    return scene;
                })
                if (infScroll) {
                    setSceneSpots([...sceneSpots, ...scenes]);
                    setIsLoading(false);
                }
                else {
                    setSceneSpots(scenes);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                throw Error(error.message);
            })
    }

    return (
        <>
            <BottomScrollListener onBottom={() => setScrollCount(scrollCount + 1)} />
            {(isLoading) ?
                <div className="loader"></div> :
                <Scene name={url.substr(11)} scenes={sceneSpots} />
            }
        </>
    )
}

export default SceneContainer;