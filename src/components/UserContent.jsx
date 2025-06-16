import { useNavigate } from "react-router-dom";

function UserContent({ content }) {
  const navigate = useNavigate();

  return (
    <div className="content-container">
      {content.map((item, index) => (
        <div
          key={index}
          className="content-card"
          onClick={() => navigate(`/content/${item.id}`)}
        >
          {item.image && (
            <img
              src={URL.createObjectURL(item.image)}
              alt={item.title}
              className="content-img"
            />
          )}
          <strong className="content-name">{item.title}</strong>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default UserContent;