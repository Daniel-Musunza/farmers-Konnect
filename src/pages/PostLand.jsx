import React, { useRef } from 'react'

import '../post_land.css';

function PostLand({ uploadLand, captureFile }) {
    const titleRef = useRef();
    const landTypeRef = useRef();
    const soilTypeRef = useRef();
    const climateRef = useRef();
    const priceRef = useRef();
    const landDetailsRef = useRef()

    async function submitForm(event) {
        event.preventDefault()
        uploadLand(titleRef.current.value, landTypeRef.current.value, soilTypeRef.current.value, climateRef.current.value, priceRef.current.value, landDetailsRef.current.value)

    }

    return (
        <div className="main-container" style={{ maxWidth: '800px' }}>
            <div className="pro-container2" style={{ width: '100%' }}>
                <div className="create-post">

                    <div className="contain">

                        <div className="land-info">
                            <form onSubmit={submitForm}>
                                <div className="input-group">
                                    <select name="landType" ref={landTypeRef} className="input-field">
                                        <option value="">Choose (Need an investor/Want to Lease)</option>
                                        <option value="invest">In need of an investor</option>
                                        <option value="rent">To Let/Lease</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <input type="text" name="title" ref={titleRef} placeholder="Enter Title of the post" className="input-field" />
                                </div>
                                <div className="input-group">
                                    <input type="text" name="soilType" ref={soilTypeRef} placeholder="Enter Soil Type" className="input-field" />
                                </div>
                                <div className="input-group">
                                    <input type="text" name="climate" ref={climateRef} placeholder="Enter Climate" className="input-field" />
                                </div>
                                <div className="input-group">
                                    <input type="text" name="price" ref={priceRef} placeholder="Enter Price" className="input-field" />
                                </div>
                                <div className="input-group">
                                    <input type="file" id="image" name="image" accept=".png, .jpg, .jpeg, .webp, .avif"
                                        className="input-field" onChange={captureFile} />
                                </div>
                                <div className="input-group">
                                    <textarea name="landDetails" ref={landDetailsRef} rows="2" placeholder="Enter Land Details"
                                        className="textarea-field"></textarea>
                                </div>
                                <div className="input-group">
                                    <button className="upload-button" type="submit">Post Land Listing</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PostLand
