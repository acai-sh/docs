export const AnimatedTerminal = () => {
    // animated-terminal.DEV.1
    // Mintlify provides hooks in the global scope.
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [stepIndex, setStepIndex] = useState(0);
    const [phase, setPhase] = useState("idle");
    const chatRef = useRef(null);
    const timeoutsRef = useRef([]);

    const STEPS = [
        // animated-terminal.STORY.1
        {
            type: "user-typing",
            content:
                "I made changes to the spec - @animated-terminal.feature.yaml - please run `acai skill` to learn spec-driven development.",
        },
        // animated-terminal.STORY.2
        {
            type: "tool-command",
            content: "acai skill",
            output: [
                "Skill loaded: acai",
                "Summary: specs first, then code, then status updates.",
                "Guidance: use ACIDs to keep implementation and review aligned.",
            ],
        },
        {
            type: "agent-message",
            content:
                "I will read the spec to see what changed, then re-align the code to spec.",
        },
        {
            type: "tool-command",
            content: "acai feature animated-terminal",
            output: [
                "Feature: animated-terminal",
                "Status: 9 implemented, 1 remaining.",
                "Next focus: STORY.3-1",
            ],
        },
        {
            type: "agent-message",
            content:
                "I see the new requirement, animated-terminal.STORY.3-1, which adds a demonstration of the `set-status` command. I'll align the code now.",
        },
        { type: "system-status", content: "📝 Writing code..." },
        {
            type: "agent-message",
            content: "Now I will make sure all requirements are well tested.",
        },
        { type: "system-status", content: "📝 Writing code..." },
        {
            type: "agent-message",
            content:
                "Done. The animation component and ACID references are now aligned with the spec.",
        },
        // animated-terminal.STORY.3
        {
            type: "user-typing",
            content:
                "Nice job. I'm testing it now. It looks acceptable. Mark all requirements as accepted.",
        },
        // animated-terminal.STORY.3-1
        {
            type: "tool-command",
            content:
                'acai set-status \'{"animated-terminal.STORY.3-1":"accepted"}\'',
            output: ["Requirements updated: 1"],
        },
        {
            type: "agent-message",
            content:
                "Done. All requirements are now accepted. What should we work on next?",
        },
    ];

    const clearAllTimeouts = () => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
    };

    const addTimeout = (fn, delay) => {
        const id = setTimeout(fn, delay);
        timeoutsRef.current.push(id);
        return id;
    };

    useEffect(() => {
        return () => clearAllTimeouts();
    }, []);

    useEffect(() => {
        // animated-terminal.FRAME.1-1
        if (chatRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
            // Use a threshold to detect if the user is "near" the bottom
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

            if (isNearBottom) {
                chatRef.current.scrollTop = scrollHeight;
            }
        }
    }, [messages]);

    useEffect(() => {
        // animated-terminal.STORY.4
        if (stepIndex >= STEPS.length) {
            setPhase("completed");
            return;
        }

        const step = STEPS[stepIndex];

        if (step.type === "user-typing") {
            setPhase("typing");
            let currentText = "";
            const fullText = step.content;
            let charIdx = 0;

            const typeChar = () => {
                if (charIdx < fullText.length) {
                    currentText += fullText[charIdx];
                    setInputText(currentText);
                    charIdx++;
                    addTimeout(typeChar, 45); // Slower typing (40 -> 45ms)
                } else {
                    addTimeout(() => {
                        setMessages((prev) => [
                            ...prev,
                            { type: "user", content: fullText },
                        ]);
                        setInputText("");
                        setStepIndex((prev) => prev + 1);
                    }, 600); // Slower promotion (500 -> 600ms)
                }
            };

            addTimeout(typeChar, 250); // Slower start (200 -> 250ms)
        } else if (step.type === "agent-message") {
            // animated-terminal.STORY.2
            setPhase("agent-thinking");
            addTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { type: "agent", content: step.content },
                ]);
                addTimeout(() => {
                    setStepIndex((prev) => prev + 1);
                }, 1700); // Slower reading time (1500 -> 1700ms)
            }, 700); // Slower thinking (600 -> 700ms)
        } else if (step.type === "tool-command") {
            setPhase("tool-running");
            addTimeout(() => {
                const id = Math.random().toString(36).substr(2, 9);
                setMessages((prev) => [
                    ...prev,
                    {
                        type: "tool",
                        content: step.content,
                        status: "running",
                        id,
                    },
                ]);

                addTimeout(() => {
                    setMessages((prev) =>
                        prev.map((m) =>
                            m.id === id
                                ? { ...m, status: "done", output: step.output }
                                : m,
                        ),
                    );
                    addTimeout(() => {
                        setStepIndex((prev) => prev + 1);
                    }, 900); // Slower step advance (800 -> 900ms)
                }, 1400); // Slower command execution (1200 -> 1400ms)
            }, 500); // Slower command start (400 -> 500ms)
        } else if (step.type === "system-status") {
            setPhase("system-working");
            addTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { type: "system", content: step.content },
                ]);
                addTimeout(() => {
                    setStepIndex((prev) => prev + 1);
                }, 2200); // Slower work phase (2000 -> 2200ms)
            }, 600); // Slower system start (500 -> 600ms)
        }
    }, [stepIndex]);

    const renderMessage = (msg, idx) => {
        if (msg.type === "user") {
            return (
                <div key={idx} className="mb-4">
                    <div className="flex items-start">
                        <span className="text-[#58a6ff] mr-2 font-bold opacity-70">
                            ➜
                        </span>
                        <span className="text-[#e6edf3] font-mono leading-relaxed">
                            {msg.content}
                        </span>
                    </div>
                </div>
            );
        }
        if (msg.type === "agent") {
            return (
                <div key={idx} className="mb-4">
                    <div className="text-[#e6edf3] font-mono leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                    </div>
                </div>
            );
        }
        if (msg.type === "system") {
            return (
                <div
                    key={idx}
                    className="mb-4 ml-2 italic text-[#484f58] font-mono text-xs animate-pulse"
                >
                    {msg.content}
                </div>
            );
        }
        if (msg.type === "tool") {
            return (
                <div
                    key={idx}
                    className="mb-4 ml-2 pl-3 border-l-2 border-[#30363d] bg-[#161b22]/50 py-2 rounded-r"
                >
                    <div className="flex items-center text-xs font-mono">
                        <span
                            className={
                                msg.status === "running"
                                    ? "text-[#febc2e] mr-2 animate-pulse"
                                    : "text-[#28c840] mr-2"
                            }
                        >
                            {msg.status === "running" ? "⚡" : "✓"}
                        </span>
                        <span className="text-[#ffb11f] font-bold">acai </span>
                        <span className="text-[#e6edf3] ml-1">
                            {msg.content.replace("acai ", "")}
                        </span>
                        {msg.status === "running" && (
                            <span className="ml-2 text-[#484f58] italic text-[10px]">
                                running...
                            </span>
                        )}
                    </div>
                    {msg.status === "done" && msg.output && (
                        <div className="mt-2 text-[11px] text-[#8b949e] font-mono whitespace-pre-line leading-relaxed border-t border-[#30363d]/50 pt-1">
                            {msg.output.join("\n")}
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div
            className="w-full max-w-2xl mx-auto my-8 overflow-hidden rounded-xl border border-[#30363d] shadow-2xl bg-[#0d1117] font-mono text-sm h-[420px] flex flex-col"
            style={{
                height: "420px",
                minHeight: "420px",
                contain: "layout paint",
            }}
        >
            <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-cursor {
          animation: cursorBlink 1s infinite;
        }
        .chat-history::-webkit-scrollbar {
          width: 8px;
        }
        .chat-history::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-history::-webkit-scrollbar-thumb {
          background: #30363d;
          border-radius: 4px;
        }
        .chat-history::-webkit-scrollbar-thumb:hover {
          background: #484f58;
        }
      `}</style>

            {/* Terminal frame - Mac-style title bar */}
            <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-[#30363d] select-none">
                <div className="flex gap-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="text-xs text-[#8b949e] font-medium flex-grow text-center pr-12">
                    acai — OpenCode Zen
                </div>
            </div>

            {/* animated-terminal.FRAME.1 */}
            <div
                ref={chatRef}
                className="chat-history flex-grow overflow-y-auto p-4 scroll-smooth"
            >
                {messages.map((msg, i) => renderMessage(msg, i))}
            </div>

            {/* Status Bar */}
            <div className="bg-[#161b22] px-4 py-1 border-t border-[#30363d] flex justify-between items-center text-[10px] text-[#8b949e]">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#58a6ff]" />
                        Agent: taskmaster
                    </span>
                    <span>Model: Big Pickle</span>
                </div>
            </div>

            {/* animated-terminal.FRAME.2 */}
            <div className="bg-[#0d1117] p-3 border-t border-[#30363d] border-l-[3px] border-l-[#58a6ff]">
                <div className="flex items-center font-mono">
                    <span className="text-[#e6edf3] break-all">
                        {inputText}
                    </span>
                    {/* animated-terminal.FRAME.2-1 */}
                    <span className="w-2 h-4 bg-[#58a6ff] ml-1 animate-cursor" />
                </div>
            </div>

            {/* Footer Bar */}
            <div className="bg-[#0d1117] px-4 py-2 flex justify-end gap-4 text-[10px] text-[#484f58] uppercase tracking-wider font-bold">
                <span>tab agents</span>
                <span>ctrl+p commands</span>
            </div>
        </div>
    );
};
