import QRCode from "react-qr-code";
import { useRef } from "react";
import "./QRCodePage.css";

function QRCodePage() {
    const restaurantId = localStorage.getItem("restaurantId");
    const restaurantName = localStorage.getItem("restaurantName") || "Restaurant";

    const FRONTEND_URL = window.location.origin;
    const qrValue = `${FRONTEND_URL}/feedback/${restaurantId}`;
    const qrRef = useRef();

    if (!restaurantId) {
        return (
            <div className="qr-page">
                <div className="qr-card">
                    <h2>Restaurant not found</h2>
                    <p>Please login again to generate your QR Code.</p>
                </div>
            </div>
        );
    }

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(qrValue);
            alert("✅ QR Link Copied Successfully!");
        } catch (error) {
            alert("❌ Unable to copy link.");
        }
    };

    const downloadQR = () => {
        const svg = qrRef.current.querySelector("svg");
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svg);
        const image = new Image();

        image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

        image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 700;
            canvas.height = 700;
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, 700, 700);

            ctx.fillStyle = "#111827";
            ctx.font = "bold 32px Arial";
            ctx.textAlign = "center";
            ctx.fillText(restaurantName, 350, 60);

            ctx.drawImage(image, 135, 110, 430, 430);

            ctx.fillStyle = "#6b7280";
            ctx.font = "20px Arial";
            ctx.fillText("Scan to submit your feedback", 350, 585);

            const link = document.createElement("a");
            link.download = `${restaurantName}-QR-Code.png`;
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
                <h1>🍽 AI Smart Feedback</h1>
                <h3>{restaurantName}</h3>
                <p>
                    Scan this QR code to submit your feedback.
                    Your opinion helps us improve our service using AI.
                </p>

                {/* Wrapper box with fluid sizing constraints */}
                <div className="qr-box" ref={qrRef}>
                    <QRCode
                        value={qrValue}
                        level="H"
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                </div>

                <div className="link-box">{qrValue}</div>

                <div className="btn-group">
                    <button className="copy-btn" onClick={copyLink}>
                        📋 Copy Link
                    </button>
                    <button className="download-btn" onClick={downloadQR}>
                        ⬇ Download QR
                    </button>
                    <button className="print-btn" onClick={printQR}>
                        🖨 Print
                    </button>
                </div>

                <p className="qr-footer-tag">
                    Powered by AI Smart Feedback System
                </p>
            </div>
        </div>
    );
}

export default QRCodePage;