import React from 'react'
import { dummyPublishedImages } from '../assets/assets';
import Loading from './Loading';

const Community = () => {
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const fetchImages = async () => {
    //fetch images from backend
    setImages(dummyPublishedImages);
    setLoading(false);
  };
  React.useEffect(() => {
    fetchImages();
  }, []);
  if (loading)  return <Loading />;
  return (
    <div className='p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full 
    overflow-y-scroll'>
      <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-purple-100'>Community Images</h2>
      {images.length > 0}
    </div>
  )
}

export default Community
