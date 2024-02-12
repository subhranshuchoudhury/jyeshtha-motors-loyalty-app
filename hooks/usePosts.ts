import {useQuery} from 'react-query';

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return data;
};

const usePosts = () => useQuery('posts', fetchPosts);
export default usePosts;
