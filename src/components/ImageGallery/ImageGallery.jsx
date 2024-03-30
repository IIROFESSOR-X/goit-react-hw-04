import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul>
      {images.map(image => (
        <li key={image.id}>
          <div onClick={() => onImageClick(image)}> 
            <ImageCard image={image} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;



// export default function ImageGallery({ items }) {
//     return (    
//         <ul>
//             {items.map((item) => (
//                 <li key={item.objectId}>
//                     <div>
//                         <img src={`/photos/${item.id}`} alt={item.title} />
//                     </div>
//                 </li>
//             ))}
//         </ul>           
//     );
// }
