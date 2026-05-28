// src/components/common/Card.tsx
import moto from "../assets/Moto.png"
interface CardProps {
  title?: string;
  description?: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <div className="min-w-[300px] sm:min-w-[320px] md:min-w-[350px] min-h-[380px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
      
      {/* Image */}
      <div className="w-full h-52 overflow-hidden rounded-t-2xl">
        <img
          src={image || moto}
          alt="card"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {title || "Title"}
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          {description || "Description"}
        </p>
      </div>
    </div>
  );
};

export default Card;