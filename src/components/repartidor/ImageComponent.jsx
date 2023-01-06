import { useState } from "react";
import "./css/imagestyles.css";
export const ImageComponent = (image) => {
    const [isOpen, setIsOpen] = useState(false);
    // console.log(image)
    const handleShowDialog = () => {
        setIsOpen(!isOpen);
        console.log("cliked");
    };

    return (
        <div>
            <img
                className="small"
                src={image.image}
                onClick={handleShowDialog}
                alt="no hay qr"
                style={{
                    height: 30,
                    width: 30,
                }}
            />
            {isOpen && (
                <dialog
                    className="dialog"
                    style={{ position: "absolute" }}
                    open
                    onClick={handleShowDialog}
                >
                    <img
                        className="image"
                        src={image.image}
                        onClick={handleShowDialog}
                        alt="no image"
                    />
                </dialog>
            )}
        </div>
    );
}
