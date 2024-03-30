import css from './ImageCard.module.css';

const ImageCard = ({ url, id, alt, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const src = url + `&h=400`;

  return (
    <div className={css.container}>
      <img src={src} alt={alt} onClick={handleClick} />
    </div>
  );
};

export default ImageCard;
