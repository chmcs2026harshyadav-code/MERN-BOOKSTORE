import React from 'react'
import { Link, useLocation } from "react-router";
import { BookOpen, UserCircle, Info, Edit2, Trash2, Database } from "lucide-react";
import { formatData } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";
const BookCard = ({ book, setBooks }) => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const isActive = location.pathname === `/book/${book._id}`;
    
    const handleDelete = async () => {
        try {
            await api.delete(`/books/${book._id}`);
            setBooks((prev) => prev.filter((b) => b._id !== book._id));
            toast.success("Book deleted successfully!");
        } catch {
            toast.error("Failed to delete book");
        } finally {
            setShowModal(false)
        }
    };

    return (
        <>
            {/* {card} */}
            <Link to={`/book/${book._id}`} className={`relative block rounded-xl bg-base-100 p-4 border transition-all duration-200 ${isActive ? " border-primary shadow-lg " : "border-base-300"} hover:border-primary hovere:shadow-xl`}>
                {/* {top row} */}
                <div className="flex justify-between items-start">
                    <p className="text-xs text-base-content/60 truncate"> {book._id}</p>
                    <span className="badge badge-secondary" > {book.publishYear}</span>
                </div>

                {/* {book info} */}
                <div className="mt-4 space-y-2">
                    {/* {title} */}
                    <div className="flex items-center gap-2">
                        <BookOpen className="size-4 text-primary" />
                        <p className="font-medium text-base-content line-clamp-1">
                            {book.title}
                        </p>
                    </div>

                    {/* {author} */}
                    <div className="flex items-center gap-2 text-base-content/70">
                        <UserCircle className="size-4 text-primary" />
                        <p className='text-sm line-clamp-1'> {book.author}</p>
                    </div>
                </div>

                {/* {footer} */}
                <div className="mt-6 flex justify-between items-center">
                    <span className="text-xs text-base-content/60">
                        {formatData(new Date(book.createdAt))}
                    </span>

                    {/* {action icon} */}
                    <div className="flex items-center gap-4">
                        {/* {edit} */}
                        <div className="tooltip tooltip-warning" data-tip="Edit book">
                            <Edit2 className="size-4 text-warning hover:scale-110 transition" />
                        </div>

                        {/* {delete} */}
                        <div className="tooltip tooltip-error " data-tip="Delete book">
                            <button onClick={(e) => {
                                e.preventDefault();
                                setShowModal(true);
                            }}
                                className="text-error hover:scale-110 transition">
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>

            {/* {delete confirm model} */}

            {showModal && (<dialog className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-error flex items-center gap-2">
                        <Trash2 className="size-5" /> Delete Book
                    </h3>
                    <p className="py-4 text-base-content/70">
                        Are you sure you want to delete
                        <span className="font-semibold text-base-content">
                            {" "}"{book.title}" <span>? <br /> This action cannot be underdone</span>
                        </span></p>

                    <div className="modal-action">
                        <button className="btn btn-ghost" onClick={() =>
                            setShowModal(false)
                        }> Cancel </button>

                        <button className="btn btn-error flex items-center gap-2" onClick={handleDelete}> <Trash2 className="size-4" /> Delete</button>
                    </div>
                </div>
            </dialog>)}
        </>
    );
};
export default BookCard;