import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#f97316",
    "#ef4444"
];

function RatingPieChart({ dashboard }) {

    const data = [
        { name: "5 Star", value: dashboard.fiveStar },
        { name: "4 Star", value: dashboard.fourStar },
        { name: "3 Star", value: dashboard.threeStar },
        { name: "2 Star", value: dashboard.twoStar },
        { name: "1 Star", value: dashboard.oneStar }
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
                Rating Distribution
            </h3>

            <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={110}
                        label
                    >

                        {
                            data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))
                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default RatingPieChart;