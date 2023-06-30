import { Component } from 'react';
import SearchBar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
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

// class App extends Component {
//   state = initialState;

//   handleAddImages = async query => {
//     const { currentPage } = this.state;
//     const nextPage = currentPage + 1;
//     this.setState({ loading: true });

//     try {
//       const newImages = await fetchImages(query, nextPage);

//       this.setState(prevState => ({
//         images: [...prevState.images, ...newImages],
//         currentPage: nextPage,
//       }));
//     } catch (err) {
//       console.error('Error fetching more images:', err);
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { query } = this.state;

//     if (query !== prevState.query) {
//       // Оновлення зображень при зміні запиту
//       this.setState({ images: [], currentPage: 1 });
//       this.handleAddImages(query);
//     }
//   }

//   handleLoadMore = async () => {
//     const { query } = this.state;
//     await this.handleAddImages(query);
//   };

//   handleToggleModule = imageURL => {
//     this.setState(prevState => ({
//       showModal: !prevState.showModal,
//       selectedImage: imageURL,
//     }));
//   };

//   render() {
//     const { loading, images, showModal, selectedImage } = this.state;
//     const showButton = images.length > 0;
//     const searching = loading && !showButton;

//     return (
//       <div className={style.appBox}>
//         <SearchBar onSubmit={this.handleAddImages} />
//         <ImageGallery
//           query={this.state.query}
//           lastQuery={this.state.lastQuery}
//           images={images}
//           onImageClick={this.handleToggleModule}
//         />
//         {showButton && (
//           <Button onClick={this.handleLoadMore} isDisabled={loading} />
//         )}
//         {loading && !searching && <Loader />}
//         {showModal && (
//           <Modal imageUrl={selectedImage} onClose={this.handleToggleModule} />
//         )}
//       </div>
//     );
//   }
// }

class App extends Component {
  state = initialState;

  handleAddImages = async (query, nextPage = null) => {
    this.setState({ loading: true });

    try {
      const images = await fetchImages(
        query,
        nextPage || this.state.currentPage
      );
      const newImages = nextPage ? [...this.state.images, ...images] : images;

      this.setState(prevState => ({
        images: newImages,
        currentPage: nextPage ? nextPage : 1,
        query,
      }));
    } catch (err) {
      console.error('Error fetching images:', err);
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;

    if (query !== prevState.query) {
      this.setState({ images: [], currentPage: 1 });
      this.handleAddImages(query);
    }
  }

  handleLoadMore = () => {
    const { query, currentPage } = this.state;
    const nextPage = currentPage + 1;
    this.handleAddImages(query, nextPage);
  };

  handleToggleModule = imageURL => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImage: imageURL,
    }));
  };

  render() {
    const { loading, images, showModal, selectedImage } = this.state;
    const showButton = images.length > 0;
    const searching = loading && !showButton;

    return (
      <div className={style.appBox}>
        <SearchBar onSubmit={this.handleAddImages} />
        <ImageGallery images={images} onImageClick={this.handleToggleModule} />
        {showButton && (
          <Button onClick={this.handleLoadMore} isDisabled={loading} />
        )}
        {loading && !searching && <Loader />}
        {showModal && (
          <Modal imageUrl={selectedImage} onClose={this.handleToggleModule} />
        )}
      </div>
    );
  }
}

export default App;
