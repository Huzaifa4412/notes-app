'use client'

import React from 'react'
import Card from './card'
import { useNotes } from '@/app/provider/notes-provider'
import { Note } from '@/types/notes'

const CardContainer = () => {
    const my_notes = useNotes()
    if (!my_notes) {
        throw new Error('Component must be wrapped within NotesProvider');
    }
    const { notes } = my_notes

    if (notes.length === 0) {
        return (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <p className="text-4xl font-bold text-center text-gray-700">No Notes Found</p>
            </div>
        )
    }

    return (
        <div className="w-full h-full mx-auto flex flex-wrap gap-6 justify-center mt-12">
            {notes.map((item: Note) => (
                <Card
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    color={item.color}
                />
            ))}
        </div>
    )
}

export default CardContainer
