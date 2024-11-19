const Card = ({ src, name, codeName }) => (
  <img src={src} alt={codeName} placeholder={name} />
);

export default Card;