import StarRateIcon from '@mui/icons-material/StarRate';
import React from 'react';
function Bestseller() {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
        }}>
            <StarRateIcon style={{
                fontSize: '17px',
                color: '#ee9c00',
                fontWeight: '700'
            }} />
            <p style={{
                fontSize: "12px",
                color: "#ee9c00",
                fontWeight: "550",
                paddingTop: "2.1px"
            }}>Bestseller</p>
        </div>
    )
}

export default Bestseller