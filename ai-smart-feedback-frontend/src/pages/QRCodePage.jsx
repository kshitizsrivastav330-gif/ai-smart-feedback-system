import QRCode from "react-qr-code";
import { useRef } from "react";
import "./QRCodePage.css";

function QRCodePage() {

    // Later get from logged-in restaurant
    const restaurantId = 1;
    const restaurantName = "Paradise Restaurant";

    // Development URL
    const qrValue = `http://localhost:5173/feedback/${restaurantId}`;

    // After deployment use:
    // const qrValue = `https://your-project.vercel.app/feedback/${restaurantId}`;

    const qrRef = useRef();

    const copyLink = () => {

        navigator.clipboard.writeText(qrValue);

        alert("✅ Link Copied!");

    };

    const downloadQR = () => {

        const svg = qrRef.current.querySelector("svg");

        const serializer = new XMLSerializer();

        const source = serializer.serializeToString(svg);

        const image = new Image();

        image.src =
            "data:image/svg+xml;charset=utf-8," +
            encodeURIComponent(source);

        image.onload = () => {

            const canvas = document.createElement("canvas");

            canvas.width = 600;

            canvas.height = 600;

            const ctx = canvas.getContext("2d");

            ctx.fillStyle = "#ffffff";

            ctx.fillRect(0, 0, 600, 600);

            ctx.drawImage(image, 80, 80, 440, 440);

            const link = document.createElement("a");

            link.download = "Restaurant-QR.png";

            link.href = canvas.toDataURL("image/png");

            link.click();

        };

    };

    const printQR = () => {

        window.print();

    };

    return (

        <div className="qr-page">

            <div className="qr-card">
                <h1>AI Smart Feedback</h1>

                <h3>Scan • Rate • Improve</h3>

                <p>
                    Scan the QR code to rate your experience.
                    Help us improve with AI-powered feedback.
                </p>
                <div
                    className="qr-box"
                    ref={qrRef}
                >

                    <QRCode
                        value={qrValue}
                        size={230}
                    />

                </div>

                <div className="link-box">

                    {qrValue}

                </div>

                <div className="btn-group">

                    <button
                        className="copy-btn"
                        onClick={copyLink}
                    >
                        📋 Copy Link
                    </button>

                    <button
                        className="download-btn"
                        onClick={downloadQR}
                    >
                        ⬇ Download QR
                    </button>

                    <button
                        className="print-btn"
                        onClick={printQR}
                    >
                        🖨 Print QR
                    </button>

                </div>

                <p
                    style={{
                        marginTop: "30px",
                        color: "#6b7280",
                        fontSize: "14px"
                    }}
                >
                    Powered by AI Smart Feedback
                </p>

            </div>

        </div>

    );

}

export default QRCodePage;