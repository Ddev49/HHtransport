"use client" // obliger quand on utiliser le useState,useEffect
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import axios from "axios";

const page = () =>{
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
     const router = useRouter();
    useEffect(()=>{
        const fetchPosts = async()=>{
            try{
                const response = await axios.get("/api/blogs")
                setBlogs(response.data)
            }catch(error)
            {
                console.log(error)
            }finally {setLoading(false)};
        }
        fetchPosts()
        return () =>{
            // nettoyage au demontage du composant
        }
    },[]);
    if (loading) return null;
    return (
        <div className="blogs-container">
            <h1 className="pages-title">Nos HH articles</h1>
            <p className="blogs-intro">
            <strong>Découvrez nos articles pour faciliter votre quotidien : </strong>
            Bienvenue sur notre blog ! Nous vous proposons une variété d'articles dédiés à la livraison, au déménagement et à tout ce qui touche à l'organisation de votre espace. Que vous soyez en train de planifier un grand déménagement ou simplement curieux d'astuces pratiques, nos articles sont conçus pour vous accompagner à chaque étape de votre projet</p>


            {blogs.length === 0 ? (
                <p className="no-articles">Nos Blogs sont actuellement indisponible prenez un café le temps de leurs livraisons.</p>
            ) : (
                <div className="blogs-grid">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="blogs-card">
                            <h3 className="blogs-title">{blog.title}</h3>
                            <p className="blogs-date">Auteur : {(blog.author)}</p>
                            <p className="blogs-date">Categorie : {(blog.category)}</p>
                            <p className="blogs-date">Date : {new Date(blog.createdAt).toLocaleDateString()}</p>
                            <p className="blogs-content">{blog.content.substring(0, 100)}...</p>
                            <button 
                                className="blogs-button"
                                onClick={() => router.push(`/blogs/${blog._id}`)}
                            >
                                Lire plus
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default page;