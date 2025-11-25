"use client"

import { Note, Text } from "@/types/notes";
import { createContext, useContext, useEffect, useState } from "react"


type NotesContextType = { addNotes: (text: { heading: string, note: string }, color: string) => void, notes: Note[], updateNotes: (text: Text, id: string) => void, deletedNotes: (id: string) => void }

export const NotesContext = createContext<NotesContextType | null>(null);
export function NotesProvider({ children }: { children: React.ReactNode }) {


    const [notes, setNotes] = useState<Note[]>([])
    const [selectedId, setSelectedId] = useState<null | string>(null)

    useEffect(() => {
        const saved = localStorage.getItem("notes")
        if (saved) {
            requestAnimationFrame(() => {
                setNotes(JSON.parse(saved))
            })
        }
    }, [])
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const addNotes = (text: { heading: string, note: string }, color: string) => {
        setNotes((prev) => [...prev, { color: color, id: crypto.randomUUID(), text, created_at: new Date().toISOString() }])
    }

    const updateNotes = (text: Text, id: string) => {
        setNotes((prev) => prev.map((item) => item.id === id ? { ...item, text } : item))
    }

    const deletedNotes = (id: string) => {
        console.log(id);
        setNotes((prev) => prev.filter((note) => note.id !== id))
    }
    const value = {
        addNotes, notes, selectedId, setSelectedId, updateNotes, deletedNotes
    }


    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    )

}

export const useNotes = () => useContext(NotesContext)