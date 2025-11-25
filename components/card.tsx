"use client"

import React, { useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { useNotes } from "@/app/provider/notes-provider"

interface CardProps {
    color: string
    id: string
    text: {
        heading: string
        note: string
    }
}

const Card: React.FC<CardProps> = ({ color, id, text }) => {
    const notesContext = useNotes()
    if (!notesContext) {
        throw new Error("Component must be wrapped within NotesProvider")
    }
    const { updateNotes, deletedNotes } = notesContext

    const [heading, setHeading] = useState(text.heading)
    const [note, setNote] = useState(text.note)

    return (
        <div className="card w-[280px] h-[200px] relative rounded-2xl shadow-2xl bg-zinc-100 overflow-hidden">
            {/* Colored Strip */}
            <div
                className="strip w-5 h-20 absolute top-0 left-0 -translate-y-[30%] rotate-45 translate-x-[150%] origin-top-left"
                style={{ background: color }}
            />

            {/* Delete Button */}
            <button
                className="delete w-8 h-8 rounded-full bg-red-500 absolute top-3 right-3 flex items-center justify-center text-white hover:scale-105 transition-transform"
                onClick={() => deletedNotes(id)}
            >
                ×
            </button>

            {/* Heading */}
            <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                    const value = e.currentTarget.textContent || ""
                    setHeading(value)
                    updateNotes({ heading: value, note }, id)
                }}
                className="heading px-4 py-1 text-center text-2xl font-bold outline-none truncate"
            >
                {heading || "Title..."}
            </div>

            {/* Note Body */}
            <div className="absolute bottom-0 w-full h-[87%]">
                <ScrollArea className="w-full h-full p-4">
                    <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                            const value = e.currentTarget.textContent || ""
                            setNote(value)
                            updateNotes({ heading, note: value }, id)
                        }}
                        className="text-base outline-none break-words"
                    >
                        {note || "Take a note..."}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default Card
