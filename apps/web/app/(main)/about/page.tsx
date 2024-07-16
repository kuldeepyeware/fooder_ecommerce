const StoryRootPage = () => {
  return (
    <div className='bg-white text-gray-800 pt-20'>
      <section className='relative h-[400px]'>
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='text-center text-white'>
            <h1 className='text-5xl font-bold mb-4'>Our Journey</h1>
            <p className='text-xl'>Crafting quality since 1985</p>
          </div>
        </div>
      </section>

      <section className='py-20 px-8 max-w-4xl mx-auto'>
        <h2 className='text-3xl font-semibold mb-6'>
          A Message from Our Founder
        </h2>
        <div className='flex items-center space-x-8'>
          <blockquote className='italic'>
            "Our mission has always been to create products that stand the test
            of time, both in quality and style. We believe in the power of
            craftsmanship and the beauty of simplicity."
          </blockquote>
        </div>
      </section>

      <section className='bg-gray-100 py-20 px-8'>
        <h2 className='text-3xl font-semibold mb-12 text-center'>
          Our Journey Through Time
        </h2>
        <div className='max-w-4xl mx-auto'>
          <TimelineItem year='1985' event='Founded in a small workshop' />
          <TimelineItem year='1995' event='Opened our first flagship store' />
          <TimelineItem year='2005' event='Expanded internationally' />
          <TimelineItem
            year='2020'
            event='Launched our sustainability initiative'
          />
        </div>
      </section>

      <section className='py-20 px-8 max-w-4xl mx-auto'>
        <h2 className='text-3xl font-semibold mb-12 text-center'>
          Our Core Values
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <ValueCard
            title='Quality'
            description='We never compromise on materials or craftsmanship.'
          />
          <ValueCard
            title='Sustainability'
            description='Committed to reducing our environmental impact.'
          />
          <ValueCard
            title='Innovation'
            description='Always looking for ways to improve and evolve.'
          />
        </div>
      </section>

      <section className='bg-gray-500 text-white py-20 px-8 text-center'>
        <h2 className='text-3xl font-semibold mb-6'>Be Part of Our Story</h2>
        <p className='mb-8'>
          Join us in crafting the next chapter of our journey.
        </p>
        <button className='bg-white text-gray-900 py-2 px-6 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300'>
          Shop Now
        </button>
      </section>
    </div>
  );
};

const TimelineItem = ({ year, event }: { year: string; event: string }) => (
  <div className='flex mb-8'>
    <div className='font-bold w-24'>{year}</div>
    <div className='flex-1 ml-4 border-l-2 border-gray-300 pl-4'>{event}</div>
  </div>
);

const ValueCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className='bg-white p-6 rounded-lg shadow-md'>
    <h3 className='text-xl font-semibold mb-2'>{title}</h3>
    <p>{description}</p>
  </div>
);

export default StoryRootPage;
