import css from './ImageCard.module.css';

const ImageCard = ({ url, id, alt, onClick }) => {
  const src = url + `&h=400`;

  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className={css.container}>
      {/* Добавляем обработчик onClick */}
      <img src={src} alt={alt} onClick={handleClick} />
    </div>
  );
};

export default ImageCard;
