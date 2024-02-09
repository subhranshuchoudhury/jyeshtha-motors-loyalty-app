import pb from '../../utils/pocketbase';

const getQuickMenu = async () => {
  try {
    const records = await pb.collection('menu').getFullList({
      sort: '-created',
    });

    return records;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export {getQuickMenu};
