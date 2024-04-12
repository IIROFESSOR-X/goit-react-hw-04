import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import { useState, useEffect } from "react";
import fetchImages from "./photos-api";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ModalWindow from "./ModalWindow/ModalWindow";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query === "") {
      return;
    }
    async function fetchPhotos() {
      try {
        setLoading(true);
        setError(false);
        const photos = await fetchImages(query, page);
        setImages((prevImages) => {
          return [...prevImages, ...photos];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, [query, page]);

  const getPhotos = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  function openModal(image) {
    setSelectedImage(image);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <SearchBar onSearch={getPhotos} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery items={images} openModal={openModal} />
      )}
      {images.length > 0 && !loading && (
        <LoadMoreBtn loadMore={handleLoadMore} />
      )}
      {selectedImage && (
        <ModalWindow
          isOpen={isOpen}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
}

export default App;
