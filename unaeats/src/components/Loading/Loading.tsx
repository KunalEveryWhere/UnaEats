//Styles
import "./Loading.css";

//Assets
const LoadingImage = require("../../assets/images/img-loading.gif");

const Loading: React.FC = () => {
  return (
    <div className="loading-screen">
      <img src={LoadingImage} alt="Loading" />
    </div>
  );
};

export default Loading;
