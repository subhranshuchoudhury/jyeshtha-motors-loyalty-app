import pb from '../../utils/pocketbase';

const getCarousel = async () => {
  try {
    const records = await pb.collection('carousel').getFullList({
      sort: '-created',
    });

    return records;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export {getCarousel};
