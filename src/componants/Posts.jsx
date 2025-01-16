import { useEffect, useState } from "react";
import { deletePost, getPosts } from "../api/PostAPi";
import "../App.css";

export const Posts = () => {
  const [data, setData] = useState([]);

  const getPostData = async () => {
    const res = await getPosts();
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);


const handleDeletePost = async (id) => {
    try{
const res = await deletePost(id);
if (res.status === 200){
const newData = data.filter((curelem) => {
    return curelem.id !== id;
});
    setData(newData)
}
    console.log(res)
    } catch(error){
    console.log(error)
    }
}



  return (
    <section className="section-post">
      <ol>
        {data.map(curelem => {
          const { id, title, body } = curelem;
          return (
            <li key={id}>
              <p>
                Title: {title}
              </p>
              <p>
                Body: {body}
              </p>
              <button>Edit</button>
              <button className="btn-delete" onClick={()=> handleDeletePost(id)}>Delete</button>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
