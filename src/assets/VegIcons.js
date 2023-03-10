import React from 'react'

function VegIcons(props) {

    const vegStyleSquare = {
        width: '15px',
        height: "15px",
        border: "1.8px solid green",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"

    }
    const vegStyleCircle = {
        width: '7px',
        height: "7px",
        backgroundColor:"green",
        borderRadius:"100%"
    }
    const NonvegStyleSquare = {
        width: '15px',
        height: "15px",
        border: "1.8px solid red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"

    }
    const NonvegStyleCircle = {
        width: '7px',
        height: "7px",
        backgroundColor: "red",
        borderRadius: "100%"
    }
    
    return (

        <div style={props.veg ? vegStyleSquare : NonvegStyleSquare}>
            <div style={props.veg ? vegStyleCircle : NonvegStyleCircle}></div>
        </div>
    )
}

export default VegIcons