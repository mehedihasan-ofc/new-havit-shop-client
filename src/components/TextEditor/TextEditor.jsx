import { useEffect, useRef, useState } from "react";

const TextEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);
    const [activeFormats, setActiveFormats] = useState({});

    const buttons = [
        { cmd: "bold", label: "B", tooltip: "Bold" },
        { cmd: "italic", label: "I", tooltip: "Italic" },
        { cmd: "underline", label: "U", tooltip: "Underline" },
        { cmd: "strikeThrough", label: "S", tooltip: "Strikethrough" },
        { cmd: "justifyLeft", label: "⯇", tooltip: "Align Left" },
        { cmd: "justifyCenter", label: "⇔", tooltip: "Align Center" },
        { cmd: "justifyRight", label: "⯈", tooltip: "Align Right" },
        { cmd: "insertUnorderedList", label: "•", tooltip: "Bullet List" },
        { cmd: "insertOrderedList", label: "1.", tooltip: "Numbered List" },
    ];

    useEffect(() => {
        if (editorRef.current && value) {
            editorRef.current.innerHTML = value;
        }
    }, []);

    const execCmd = (command, arg = null) => {
        document.execCommand(command, false, arg);
        editorRef.current.focus();
        updateActiveFormats();
    };

    const handleInput = () => {
        const content = editorRef.current.innerHTML;
        onChange(content);
        updateActiveFormats();
    };

    const updateActiveFormats = () => {
        const newFormats = {};
        buttons.forEach((btn) => {
            newFormats[btn.cmd] = document.queryCommandState(btn.cmd);
        });
        setActiveFormats(newFormats);
    };

    // Listen for selection change to update active buttons
    useEffect(() => {
        const handleSelectionChange = () => {
            updateActiveFormats();
        };
        document.addEventListener("selectionchange", handleSelectionChange);
        return () => {
            document.removeEventListener("selectionchange", handleSelectionChange);
        };
    }, []);

    return (
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>

            {/* Toolbar */}
            <div style={{
                display: "flex",
                gap: "6px",
                padding: "8px",
                borderBottom: "1px solid #eee",
                background: "#f9f9f9",
                position: "sticky",
                top: 0,
                zIndex: 10
            }}>
                {buttons.map((btn, idx) => (
                    <button
                        key={idx}
                        type="button"
                        title={btn.tooltip}
                        onClick={() => execCmd(btn.cmd)}
                        style={{
                            background: activeFormats[btn.cmd] ? "#d1e7ff" : "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            cursor: "pointer",
                            fontWeight: btn.cmd === "bold" ? "bold" : "normal",
                            fontStyle: btn.cmd === "italic" ? "italic" : "normal",
                            textDecoration: btn.cmd === "underline" ? "underline" : "none",
                            transition: "0.2s"
                        }}
                        onMouseEnter={(e) => e.target.style.background = activeFormats[btn.cmd] ? "#bcdfff" : "#f0f0f0"}
                        onMouseLeave={(e) => e.target.style.background = activeFormats[btn.cmd] ? "#d1e7ff" : "#fff"}
                    >
                        {btn.label}
                    </button>
                ))}

                {/* Link Button */}
                <button
                    type="button"
                    title="Insert Link"
                    onClick={() => {
                        let url = prompt("Enter link URL:");
                        if (url && !url.startsWith("http")) {
                            url = "https://" + url;
                        }
                        if (url) execCmd("createLink", url);
                    }}
                    style={{
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        cursor: "pointer",
                        transition: "0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#f0f0f0"}
                    onMouseLeave={(e) => e.target.style.background = "#fff"}
                >
                    🔗
                </button>
            </div>

            {/* Editable Area */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning={true}
                onInput={handleInput}
                style={{
                    minHeight: "250px",
                    padding: "12px",
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontSize: "15px",
                    lineHeight: "1.6",
                    outline: "none"
                }}
            ></div>
        </div>
    );
};

export default TextEditor;