'use client';
import { useEffect,useState  } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from 'axios';

const BlogPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');


  useEffect(() => {
    if (!id) {
      setError('Identifiant de l\'article manquant.');
      return;
    }
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        if (error.response && error.response.status === 401) 
          setError( 'ce blog n\'est pas disponible');
        else 
          setError('Une erreur est survenue. Veuillez réessayer plus tard.');
        // Attendre 3 secondes avant de rediriger
        setTimeout(() => {
          router.replace('/blogs');
        }, 3000);
      }
    };

    fetchBlog();
  }, [id, router]);

  if (error) {
    return (
      <div className="blog-error">
        <p>{error}</p>
      </div>
    );
  }

  if (!blog) return < ></>;

  return (
    <div className="blog-container">
      <article className="blog-content">
        <h1 className="blog-title">{blog.title}</h1>
        <p className="blog-meta">Auteur : {blog.author }</p> 
        <p className="blog-meta">Categorie : {(blog.category)}</p> 
        <p className="blog-meta">Date : {new Date(blog.createdAt).toLocaleDateString()}</p> 

        {blog.image && <img src={blog.image} alt={blog.title} className="blog-main-image" />}

        <p className="blog-intro">{blog.content}</p>

        {blog.subtitles.map((subtitleObj, index) => (
          <div key={index} className="blog-section">
            <h2 className="blog-subtitle">{subtitleObj.subtitle}</h2>
            <p>{subtitleObj.content}</p>
            {subtitleObj.image && <img src={subtitleObj.image} alt={subtitleObj.subtitle} className="blog-sub-image" />}
            {subtitleObj.lists.map((list, idx) => (
              <div key={idx} className="blog-list">
                <h3>{list.title}</h3>
                <ul>
                  {list.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </article>
    </div>
  );
};

export default BlogPage;
