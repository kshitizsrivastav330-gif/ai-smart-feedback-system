import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function ReviewBarChart({ dashboard }) {

    const data = [
        { rating: "5★", reviews: dashboard.fiveStar },
        { rating: "4★", reviews: dashboard.fourStar },
        { rating: "3★", reviews: dashboard.threeStar },
        { rating: "2★", reviews: dashboard.twoStar },
        { rating: "1★", reviews: dashboard.oneStar }
    ];

    return (

        <div
            style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,.08)"
            }}
        >

            <h3 style={{ textAlign: "center" }}>
                Review Distribution
            </h3>

            <ResponsiveContainer width="100%" height={320}>

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="rating" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="reviews"
                        fill="#2563eb"
                        radius={[8,8,0,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ReviewBarChart;