import React from "react";
import { Link } from "react-router-dom";

export default function DropDownLink(props) {
    return (
        <ul className="dropdown">
            <span className="menu">{props.text}</span>
            <div className="dropdown-content">
                <li>
                    <Link to={props.urlParent}>All sceneSpots</Link>
                </li>
                {props.urlChild.map(obj => (
                    <li key={obj.id}>
                        <Link to={`${props.urlParent}/${obj.city}`}>{obj.city}</Link>
                    </li>))}
            </div>
        </ul>
    );
}