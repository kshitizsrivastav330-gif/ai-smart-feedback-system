import "../pages/Dashboard.css";

function RatingBar({ stars, count, max }) {

    const width = max === 0 ? 0 : (count / max) * 100;

    return (
        <div className="rating-bar">

            <div className="rating-title">
                {"⭐".repeat(stars)}
            </div>

            <div className="progress">
                <div
                    className="progress-fill"
                    style={{ width: `${width}%` }}
                ></div>
            </div>

            <div className="rating-count">
                {count}
            </div>

        </div>
    );
}

export default RatingBar;