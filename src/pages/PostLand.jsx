
import '../post_land.css';

function PostLand() {
    return (
        <div className="main-container" style={{maxWidth: '800px'}}>
            <div className="pro-container2" style={{width: '100%'}}>
                <div className="create-post">

                    <div className="contain">

                        <div className="land-info">
                            <form onsubmit="" method="POST" enctype="multipart/form-data">
                                <div className="input-group">
                                    <select name="landType" className="input-field">
                                        <option value="">Choose (Need an investor/Want to Lease)</option>
                                        <option value="invest">In need of an investor</option>
                                        <option value="rent">To Let/Lease</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <input type="text" name="soilType" placeholder="Enter Soil Type" className="input-field" />
                                </div>
                                <div className="input-group">
                                    <input type="text" name="climate" placeholder="Enter Climate" className="input-field" />
                                </div>
                                <div className="input-group">
                                    <input type="text" name="price" placeholder="Enter Price" className="input-field" />
                                </div>
                                <div className="input-group">
                                    <input type="file" id="image" name="image" accept=".png, .jpg, .jpeg, .webp, .avif"
                                        className="input-field" />
                                </div>
                                <div className="input-group">
                                    <textarea name="landDetails" rows="2" placeholder="Enter Land Details"
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
