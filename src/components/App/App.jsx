import { Component } from 'react';
import SearchBar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
// import Loader from 'components/Loader/Loader';
// import Modal from 'components/Modal/Modal';
import { fetchImages } from 'api/config';

import style from './App.module.css';

const initialState = {
  loading: false,
  images: [],
  currentPage: 1,
  query: '',
  showModal: false,
  selectedImage: null,
};

class App extends Component {
  state = initialState;

  handleAddImages = async query => {
    this.setState({ loading: true });

    try {
      const images = await fetchImages(query);
      this.setState({ images, query });
    } catch (err) {
      console.error('Error fetching images:', err);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLoadMore = async () => {
    const { currentPage, query } = this.state;
    const nextPage = currentPage + 1;

    this.setState({ loading: true });

    try {
      const newImages = await fetchImages(query, nextPage);

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        currentPage: nextPage,
      }));
    } catch (err) {
      console.error('Error fetching more images:', err);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleToggleModule = imageURL => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImage: imageURL,
    }));
  };

  render() {
    const { loading, images } = this.state;
    const showButton = images.length > 0;

    return (
      <div className={style.appBox}>
        <SearchBar onSubmit={this.handleAddImages} />
        <ImageGallery images={images} onImageClick={this.handleToggleModule} />
        {showButton && (
          <Button onClick={this.handleLoadMore} isDisabled={loading} />
        )}
      </div>
    );
  }
}

export default App;
