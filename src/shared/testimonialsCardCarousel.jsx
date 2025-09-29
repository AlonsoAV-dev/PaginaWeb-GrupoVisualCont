import { Star } from "lucide-react";
import Image from "next/image";

function TestimonialsCardCarousel({ id, rating, content, avatar, name, role }) {
  return (
    <div key={id} className="card border-gray-200 dark:border-gray-700">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic flex-1">
          "{content}"
        </blockquote>

        <div className="flex items-center gap-4 ">
          <Image
            src={avatar || "/images/placeholder.jpg"}
            alt={name}
            width={200}
            height={50}
            className="w-12 h-12 rounded-full object-cover"
            priority
          />
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsCardCarousel;
