import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const TextEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);
    const lastRangeRef = useRef(null);
    const [activeFormats, setActiveFormats] = useState({});

    const buttons = [
        { cmd: "bold", label: "B", tooltip: "Bold" },
        { cmd: "italic", label: "I", tooltip: "Italic" },
        { cmd: "underline", label: "U", tooltip: "Underline" },
        { cmd: "strikeThrough", label: "S", tooltip: "Strike" },
        { cmd: "justifyLeft", label: "⯇", tooltip: "Align Left" },
        { cmd: "justifyCenter", label: "⇔", tooltip: "Align Center" },
        { cmd: "justifyRight", label: "⯈", tooltip: "Align Right" }
    ];

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || "";
        }
    }, [value]);


    const saveSelection = () => {
        const sel = document.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        const range = sel.getRangeAt(0);
        if (editorRef.current.contains(range.commonAncestorContainer)) {
            lastRangeRef.current = range;
        }
    };

    const restoreSelection = () => {
        const sel = document.getSelection();
        if (!sel || !lastRangeRef.current) return;
        sel.removeAllRanges();
        sel.addRange(lastRangeRef.current);
    };

    const execCmd = (command, arg = null) => {
        saveSelection();
        restoreSelection();
        document.execCommand(command, false, arg);
        updateActiveFormats();
        editorRef.current.focus();
    };


    const handleInput = () => {
        onChange(editorRef.current.innerHTML);
        updateActiveFormats();
    };

    const currentTextAlign = () => {
        const sel = document.getSelection();
        if (!sel || sel.rangeCount === 0) return "";
        let node = sel.anchorNode;
        if (!node) return "";
        if (node.nodeType === 3) node = node.parentNode;
        while (node && node !== editorRef.current) {
            if (/^(P|DIV|LI|H[1-6])$/.test(node.nodeName)) {
                return window.getComputedStyle(node).textAlign;
            }
            node = node.parentNode;
        }
        return "";
    };

    const updateActiveFormats = () => {
        const align = currentTextAlign();
        const next = {
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline"),
            strikeThrough: document.queryCommandState("strikeThrough"),
            justifyLeft: align === "left" || align === "start" || align === "",
            justifyCenter: align === "center",
            justifyRight: align === "right" || align === "end",
        };
        setActiveFormats(next);
    };

    useEffect(() => {
        const onSel = () => {
            saveSelection();
            updateActiveFormats();
        };
        document.addEventListener("selectionchange", onSel);
        return () => document.removeEventListener("selectionchange", onSel);
    }, []);

    return (
        <div className="border border-gray-300 rounded-lg bg-white shadow-sm font-serif">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
                {buttons.map((btn) => (
                    <button
                        key={btn.cmd}
                        type="button"
                        title={btn.tooltip}
                        onMouseDown={(e) => { e.preventDefault(); execCmd(btn.cmd); }}
                        className={`px-3 py-1 rounded text-sm font-medium border border-gray-300
              transition-colors
              ${activeFormats[btn.cmd] ? "bg-blue-200 hover:bg-blue-300" : "bg-white hover:bg-gray-100"}`}>
                        <span className={`${btn.cmd === "bold" ? "font-bold" : ""} ${btn.cmd === "italic" ? "italic" : ""} ${btn.cmd === "underline" ? "underline" : ""}`}>
                            {btn.label}
                        </span>
                    </button>
                ))}

                <button
                    type="button"
                    title="Insert Link"
                    onMouseDown={async (e) => {
                        e.preventDefault();
                        saveSelection();

                        // SweetAlert input
                        const { value: url } = await Swal.fire({
                            title: "Insert Link",
                            input: "url",
                            inputLabel: "Enter the URL",
                            inputPlaceholder: "https://example.com",
                            showCancelButton: true,
                            inputValidator: (value) => {
                                if (!value) return "Please enter a URL";
                                if (!/^https?:\/\//i.test(value)) return "URL must start with http:// or https://";
                                return null;
                            },
                        });

                        if (!url) return;

                        restoreSelection();
                        const sel = document.getSelection();
                        if (!sel || sel.rangeCount === 0) return;

                        const range = sel.getRangeAt(0);

                        // Create link element
                        const anchor = document.createElement("a");
                        anchor.href = url;
                        anchor.style.color = "blue";
                        anchor.appendChild(range.extractContents());

                        // Insert the link
                        range.insertNode(anchor);

                        // Move caret to after the link
                        range.setStartAfter(anchor);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);

                        updateActiveFormats();
                    }}
                    className="px-3 py-1 rounded text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100"
                >
                    🔗
                </button>

            </div>

            {/* Editable Area */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onKeyUp={saveSelection}
                onMouseUp={saveSelection}
                className="min-h-[260px] p-3 text-gray-800 text-sm leading-relaxed focus:outline-none [&_a]:text-blue-500 [&_a]:underline"
            />
        </div>
    );
};

export default TextEditor;