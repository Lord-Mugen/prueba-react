import "./post.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import { getPost, createPost } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Posts = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      getPost()
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener las publicaciones:", error);
        });
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCreatePost = (e) => {
    e.preventDefault();

    createPost(newPost)
      .then((response) => {
        setPosts([...posts, response.data]);
        setNewPost({ title: "", body: "" });
        toast.success("¡Nueva publicación creada con éxito!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        console.error("Error al crear la publicación:", error);
      });
  };

  if (isAuthenticated) {
    return (
      <div className="posts-container">
        <div className="posts-container__section">
          <button onClick={handleLogout}>Cerrar Sesión</button>
          <h2>Lista de Publicaciones</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="posts-container__section">
          <h2>Crear Nueva Publicación</h2>
          <form onSubmit={handleCreatePost}>
            <div className="form-group">
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                id="title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Cuerpo:</label>
              <textarea
                id="body"
                value={newPost.body}
                onChange={(e) =>
                  setNewPost({ ...newPost, body: e.target.value })
                }
                required
              />
            </div>
            <button type="submit">Crear Publicación</button>
          </form>
        </div>
        <ToastContainer />
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default Posts;
