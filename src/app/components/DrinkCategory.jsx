import React from "react";

const DrinkCategory = ({ image, text }) => {
    return (
        <div
            className=""
            style={{ backgroundImage: `url(${image})` }}>
            <p className="">{text}</p>
        </div>
    );
};

export default DrinkCategory;