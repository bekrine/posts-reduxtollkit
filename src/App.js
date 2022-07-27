import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SingelPostPage from './features/posts/SingelPostPage'
import EditPostForm from "./features/posts/EditPostForm";
import Layout from './components/Layout'
import {Route,Routes} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<PostsList />}/>
        <Route path="post">
          <Route index element={<AddPostForm />}/>$
          <Route path=":postid" element={<SingelPostPage/>}/>
          <Route path="edit/:postId" element={<EditPostForm />}/>
        </Route>
      </Route>
    </Routes>


   
  );
}

export default App;