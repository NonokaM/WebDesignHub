export default function Post({ url, screenshotName, comment, userId }) {
    return (
        <div className="postContainer">
            <div className="postHeader">
                <h1>{url}</h1>
                <h1>{screenshotName}</h1>
                <h1>{comment}</h1>
                <h1>{userId}</h1>
            </div>
        </div>
    );
}
