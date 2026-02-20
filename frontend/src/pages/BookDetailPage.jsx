import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const BookDetailPage = () => {
  const [book, setbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchbook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setbook(res.data);
      } catch (error) {
        console.log("Error fetching book", error);
        toast.error("Failed to fetch the book");
      } finally {
        setLoading(false);
      }
    };

    fetchbook();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await api.delete(`/books/${id}`);
      toast.success("Book deleted successfully!")
      navigate("/");
    } catch (error) {
      console.error("Error deleting book", error);
      toast.error("Failed to delete the book");
    }
  }
  const handleSave = async () => {
    if (!book.title.trim() || !book.author.trim() || !book.publishYear) {
      toast.error("Please add title, author and publishYear")
      return;
    }

    setSaving(true);
    try {
      await api.put(`/books/${id}`, {
        title: book.title,
        author: book.author,
        publishYear: Number(book.publishYear)
      });

      toast.success("Book updated successfully!")
      navigate("/");
    } catch (error) {
      console.error("Error updating book", error);
      toast.error("Failed to update book");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2x1">
          {/* {header} */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className='btn btn-ghost'>
              <ArrowLeftIcon className='h-5 w-5' /> Back to the Books
            </Link>

            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5 w-5' /> Delete Book
            </button>
          </div>
          {/* {form card} */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              {/* {title} */}
              <div className="form-control mb-4">
                <label className='label'>
                  <span className='label'>Title</span>
                </label>

                <input type="text" placeholder='book author' className='input input-bordered' value={book.title} onChange={(e) => setbook({ ...book, title: e.target.value })} />
              </div>
              {/*Author */}
              <div className="form-control mb-4">
                <label className='label'>
                  <span className='label'>Author</span>
                </label>

                <input type="text" placeholder='book author' className='input input-bordered' value={book.author} onChange={(e) => setbook({ ...book, author: e.target.value })} />
              </div>

              {/* {publish year} */}
              <div className="form-control mb-6">
                <label className='label'>
                  <span className="label-text">publish year</span>
                </label>
                <input type="number" placeholder='year' className='input input-bordered' value={book.publishYear} onChange={(e) =>
                  setbook({ ...book, publishYear: e.target.value })
                } />
              </div>

              {/* {action} */}
              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving ? "saving..." : "save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default BookDetailPage
