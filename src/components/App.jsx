import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImages } from "./images-api";
import {Toaster } from 'react-hot-toast';
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('')
  
 const accessKey = 'PAkOFV46TDL2tAhwdIk4TDzaP7RT3Nhx6tyEaOvJQ54'

  useEffect(() => {
		const apiUrl = `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}&client_id=${accessKey}`

		const fetchImages = async () => {
			try {
				setIsLoading(true)
				const response = await axios.get(apiUrl)
				setImages(prevImages =>
					page === 1
						? response.data.results
						: [...prevImages, ...response.data.results]
				)
			} catch (error) {
				setError('Error fetching images. Please try again.')
			} finally {
				setIsLoading(false)
			}
		}

		if (searchTerm) {
			fetchImages()
		}
	}, [searchTerm, page, accessKey])

  
 const handleSearch = async (searchQuery) => {
    setIsLoading(true); 
    try {
        const data = await fetchImages(searchQuery, page, accessKey);
        setImages(data);
    } catch (error) {
        setError('Error fetching images. Please try again.');
    } finally {
        setIsLoading(false);
    }  
};

const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1); // Increment page
}; 
 
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true); 
  };

 const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div >
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      <Toaster />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      <ImageModal isOpen={isModalOpen} onRequestClose={closeModal} image={selectedImage} />
    </div>
  );
}
