import React from 'react';

const Photo = props => {
    return (
        <section>
            <img src ={props.url} alt="no image" max-width="70%px" max-height="50%"></img>
        </section>
    );
}

export default Photo;