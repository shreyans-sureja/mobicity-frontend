import React from 'react'

const ImageHelper = ({product}) => {
    const imageurl = product ? product.image : `https://drive.google.com/file/d/1UlV_dXrZRPTa-Gn6-HMGthH58PGlnVff/view?usp=sharing`

    return(
        <div className="rounded border border-success p-2">
            <img src={imageurl}
            style={{maxHeight:"100%",maxWidth:"100%"}}
            className = "mb-3 rounded"
            alt=""
            />
        </div>
    )
}

export default ImageHelper