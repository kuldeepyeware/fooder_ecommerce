import { Star, StarHalf } from "@repo/ui/icons";

interface IProps {
  reviews: review[];
  size?: number;
}

interface review {
  reviewStars: number;
}
const ReviewStar = ({ reviews, size }: IProps) => {
  let totalStars = 0;

  reviews?.forEach((review) => {
    totalStars += review.reviewStars;
  });

  let averageStars = totalStars / reviews?.length || 0;

  averageStars = parseFloat(averageStars.toFixed(2));

  const fullStars = Math.floor(averageStars);

  const hasHalfStar = averageStars % 1 !== 0;
  return (
    <div className='flex'>
      {[...Array(fullStars)].map((_, index) => (
        <Star
          size={size || 18}
          key={index}
          strokeWidth={1}
          color='#ffc107'
          fill='#ffc107'
        />
      ))}
      {hasHalfStar && (
        <StarHalf
          size={size || 18}
          strokeWidth={1}
          color='#ffc107'
          fill='#ffc107'
        />
      )}
    </div>
  );
};

export default ReviewStar;
