import { useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Search from "./components/Search";
import "./style/ContentDisplay.css";

function ContentDisplay({ content, handleSignout }) {

  const { id } = useParams();

  const item = content.find((c) => String(c.id) === id);

  if (!item) return <p>Content not found.</p>;

  return (
    <div className="content-page-wrapper">
      <Sidebar handleSignout={handleSignout}/>
      <div className="content-main">
        <div className="top-bar">
          <Search />
        </div>

        <div className="content-body">
          <div className="content-left">
            <div className="main-card">
              <img
                src={URL.createObjectURL(item.image)}
                alt={item.title}
                className="main-img"
              />
              <div className="text-area">
                <p className="username">{item.creator}</p>
                <h2 className="title">{item.title}</h2>
                <p className="desc">{item.desc}</p>
              </div>
            </div>
          </div>

          <div className="content-right">
            {[1, 2, 3, 4].map((_, i) => (
              <div className="mini-card" key={i}>
                <img
                  src="https://cdn.pixabay.com/photo/2017/03/28/12/10/woman-2181704_960_720.jpg"
                  alt="Face Before/After"
                  className="mini-img"
                />
                <p className="mini-name">Name</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDisplay;
