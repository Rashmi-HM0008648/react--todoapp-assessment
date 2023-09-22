import React  from "react";
import clasess from "./card.module.css"
const card=(props)=>{
return(
    <div className={`${clasess.card}${props.className}`}>
        {props.children}
    </div>
);
}
export default card;