import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    keyword: '',
    currentPage: 1,
    isLoading: false,
    images: [],
    showModal: false,
    modalImg: '',
  };

  timer = null;

  handleSearch = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const form = document.querySelector('form');
    const keywordsToSearch = form.elements.keywords.value;
    this.handleCurrentPageUpdate();
    try {
      this.setState({ isLoading: true });
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${keywordsToSearch}&per_page=12&page=${this.state.currentPage}`
      );
      const data = await response.json();

      this.setState(
        this.state.currentPage === 1
          ? { images: data.hits }
          : { images: [...this.state.images, ...data.hits] }
      );
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleCurrentPageUpdate = () => {
    this.setState(state => {
      return {
        currentPage: state.currentPage + 1,
      };
    });
  };

  openModal = imageURL => {
    this.setState({ modalImg: imageURL });
    this.setState({ showModal: true });

    const handleESC = evt => {
      if (evt.key === 'Escape') {
        this.closeModal();
        document.removeEventListener('keydown', handleESC);
      }
    };

    document.addEventListener('keydown', handleESC);
  };

  closeModal = () => {
    this.setState({ showModal: false });
    this.setState({ modalImg: '' });
  };

  handleClick = () => {
    this.handleSearch();
  };

  render() {
    return (
      <>
        <Searchbar handleSearch={this.handleSearch} />
        <ImageGallery images={this.state.images} openModal={this.openModal} />
        {this.state.isLoading && <Loader />}
        <Button
          show={this.state.images.length > 0}
          onClick={this.handleClick}
        />
        <Modal
          show={this.state.showModal}
          imageURL={this.state.modalImg}
          onClose={this.closeModal}
        />
      </>
    );
  }
}
