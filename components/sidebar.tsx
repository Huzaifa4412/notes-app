'use client'

import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useNotes } from '@/app/provider/notes-provider'

const Sidebar = () => {



    const notes = useNotes();
    if (!notes) {
        throw new Error('Component must be wrapped within NotesProvider');
    }
    const { addNotes } = notes;
    const [show, setShow] = useState(false)
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']

    return (
        <>
            <div

                className="fixed top-1/2 -translate-y-1/2 md:left-20 left-5 flex flex-col items-center gap-5"
            >
                <Plus onClick={() => setShow(!show)} size={20} className={`bg-zinc-300  p-3 box-content rounded-full ${show ? 'rotate-45' : 'rotate-0'} duration-750`} />
                <AnimatePresence>
                    {show && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                                duration: 0.8, ease:
                                    "easeIn"
                            }}
                            className="rounded-lg w-[50px] flex flex-col gap-6 items-center justify-center py-5 border border-gray-200 overflow-hidden"
                        >
                            {colors.map((color, index) => (
                                <div onClick={() => addNotes({ heading: "Heading...", note: "Take a note..." }, color)} key={index} className="cursor-pointer size-7 rounded-full" style={{ backgroundColor: color }} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}



export default Sidebar