// PreventRightClick.jsx
import { useEffect } from "react";

const PreventRightClick = () => {
    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    return null;
};

export default PreventRightClick;