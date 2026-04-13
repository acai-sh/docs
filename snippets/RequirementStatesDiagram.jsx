import { useState, useEffect } from "react";

function useDarkMode() {
    const [dark, setDark] = useState(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e) => setDark(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);
    return dark;
}

const tokens = {
    light: {
        impl: {
            bg: "#E3EAFD",
            border: "#133A9A",
            text: "#133A9A",
            muted: "#133A9A",
        },
        feature: {
            bg: "#ECDFFB",
            border: "#5314A3",
            text: "#5314A3",
            muted: "#5314A3",
        },
        accepted: {
            bg: "#D1FAE4",
            border: "#166E3F",
            text: "#166E3F",
            label: "#166E3F",
        },
        completed: {
            bg: "#FEF9C3",
            border: "#A16207",
            text: "#A16207",
            label: "#A16207",
        },
        assigned: {
            bg: "#F1EFE8",
            border: "#5F5E5A",
            text: "#444441",
            label: "#5F5E5A",
        },
        muted: "#888780",
    },
    dark: {
        impl: {
            bg: "#1E3A8A",
            border: "#93C5FD",
            text: "#BFDBFE",
            muted: "#93C5FD",
        },
        feature: {
            bg: "#2E0B6E",
            border: "#A78BFA",
            text: "#DDD6FE",
            muted: "#A78BFA",
        },
        accepted: {
            bg: "#064E24",
            border: "#4ADE80",
            text: "#BBF7D0",
            label: "#4ADE80",
        },
        completed: {
            bg: "#451A03",
            border: "#FCD34D",
            text: "#FEF08A",
            label: "#FCD34D",
        },
        assigned: {
            bg: "#444441",
            border: "#B4B2A9",
            text: "#D3D1C7",
            label: "#B4B2A9",
        },
        muted: "#888780",
    },
};

const requirements = [
    { id: "CALC.1", label: "Shows emissions breakdown", state: "accepted" },
    { id: "CALC.2", label: "Calculates flight footprint", state: "accepted" },
    { id: "CALC.3", label: "Calculates hotel footprint", state: "completed" },
    { id: "CALC.4", label: "Exports report to CSV", state: "assigned" },
];

const legendStates = ["accepted", "completed", "assigned"];

export default function RequirementStatesDiagram() {
    const dark = useDarkMode();
    const c = dark ? tokens.dark : tokens.light;

    return (
        <div
            style={{
                borderRadius: 16,
                border: `1px solid ${c.impl.border}`,
                backgroundColor: c.impl.bg,
                padding: 20,
                fontFamily: '"Geist Mono", "Fira Code", monospace',
            }}
        >
            {/* Implementation header */}
            <div style={{ marginBottom: 16 }}>
                <div
                    style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: c.impl.text,
                    }}
                >
                    Production
                </div>
                <div style={{ fontSize: 12, color: c.impl.muted }}>
                    implementation
                </div>
            </div>

            {/* Feature container */}
            <div
                style={{
                    borderRadius: 10,
                    border: `1px solid ${c.feature.border}`,
                    backgroundColor: c.feature.bg,
                    padding: 16,
                }}
            >
                {/* Feature header */}
                <div style={{ marginBottom: 12 }}>
                    <div
                        style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: c.feature.text,
                        }}
                    >
                        carbon-calculator
                    </div>
                    <div style={{ fontSize: 12, color: c.feature.muted }}>
                        feature.yaml
                    </div>
                </div>

                {/* Requirement rows */}
                <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                    {requirements.map(({ id, label, state }) => {
                        const s = c[state];
                        return (
                            <div
                                key={id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: 6,
                                    border: `1px solid ${s.border}`,
                                    backgroundColor: s.bg,
                                    padding: "10px 14px",
                                    gap: 12,
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 12,
                                        color: s.label,
                                        minWidth: 56,
                                        flexShrink: 0,
                                    }}
                                >
                                    {id}
                                </span>
                                <span
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color: s.text,
                                        flex: 1,
                                    }}
                                >
                                    {label}
                                </span>
                                <span
                                    style={{
                                        fontSize: 12,
                                        color: s.label,
                                        flexShrink: 0,
                                    }}
                                >
                                    {state}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
                    {legendStates.map((state) => {
                        const s = c[state];
                        return (
                            <div
                                key={state}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                }}
                            >
                                <div
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 2,
                                        backgroundColor: s.bg,
                                        border: `1px solid ${s.border}`,
                                        flexShrink: 0,
                                    }}
                                />
                                <span style={{ fontSize: 12, color: c.muted }}>
                                    {state}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
