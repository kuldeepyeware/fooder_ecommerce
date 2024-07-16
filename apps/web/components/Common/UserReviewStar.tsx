import { Star } from "@repo/ui/icons";

const UserReviewStar = ({ reviewStar }: { reviewStar: number }) => {
  return (
    <div className='flex'>
      {[...Array(reviewStar)].map((_, index) => (
        <Star
          size={18}
          key={index}
          strokeWidth={1}
          color='#ffc107'
          fill='#ffc107'
        />
      ))}
    </div>
  );
};

export default UserReviewStar;
