import React, { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImage] = useState('');

  const handleSearch = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const form = document.querySelector('form');
    const keywordsToSearch = form.elements.keywords.value;
    handleCurrentPageUpdate();
    try {
      setLoading(true);
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${keywordsToSearch}&per_page=12&page=${currentPage}`
      );
      const data = await response.json();

      setImages(currentPage === 1 ? data.hits : [...images, ...data.hits]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentPageUpdate = () => {
    setPage(currentPage + 1);
  };

  const openModal = imageURL => {
    setModalImage(imageURL);
    setShowModal(true);

    const handleESC = evt => {
      if (evt.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleESC);
      }
    };

    document.addEventListener('keydown', handleESC);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  const handleClick = () => {
    handleSearch();
  };

  return (
    <>
      <Searchbar handleSearch={handleSearch} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      <Button show={images.length > 0} onClick={handleClick} />
      <Modal show={showModal} imageURL={modalImg} onClose={closeModal} />
    </>
  );
};
