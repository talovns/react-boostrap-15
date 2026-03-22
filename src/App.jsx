import { useMemo, useState } from "react";
import { mockBooks } from "./mockBooks";

export default function App() {
  const [books, setBooks] = useState(() => mockBooks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const addBook = (e) => {
    e.preventDefault();

    const now = Date.now();
    const newItem = {
      id: now, // ок для учебного примера
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      createdAt: now,
    };

    setBooks((prev) => [newItem, ...prev]);

    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  const removeBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const sortedBooks = useMemo(() => {
    const copy = [...books];
    switch (sortBy) {
      case "oldest":
        return copy.sort((a, b) => a.createdAt - b.createdAt);
      case "title-asc":
        return copy.sort((a, b) => a.title.localeCompare(b.title, "ru"));
      case "title-desc":
        return copy.sort((a, b) => b.title.localeCompare(a.title, "ru"));
      case "newest":
      default:
        return copy.sort((a, b) => b.createdAt - a.createdAt);
    }
  }, [books, sortBy]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Моя коллекция</h1>

      {/* форма */}
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form onSubmit={addBook} className="card card-body mb-4">
            <div className="mb-3">
              <label className="form-label">Название</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Название"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Описание</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                placeholder="Описание"
                rows={3}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Фото (URL)</label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                type="url"
                className="form-control"
                placeholder="https://..."
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Добавить
            </button>
          </form>
        </div>
      </div>

      {/* сортировка */}
      <div className="row mb-3">
        <div className="col-md-4 offset-md-4">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
            <option value="title-asc">По названию (А-Я)</option>
            <option value="title-desc">По названию (Я-А)</option>
          </select>
        </div>
      </div>

      {/* список */}
      <div className="row">
        {sortedBooks.map((book) => (
          <div key={book.id} className="col-md-4 mb-3">
            <div className="card h-100">
              {book.imageUrl ? (
                <img
                  src={book.imageUrl}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: 220, objectFit: "cover" }}
                  loading="lazy"
                />
              ) : (
                <div
                  className="bg-light d-flex align-items-center justify-content-center"
                  style={{ height: 220 }}
                >
                  <span className="text-muted">Нет фото</span>
                </div>
              )}

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.description}</p>

                <button
                  onClick={() => removeBook(book.id)}
                  className="btn btn-sm btn-danger mt-auto"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}