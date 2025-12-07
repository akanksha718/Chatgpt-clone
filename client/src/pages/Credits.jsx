import React from 'react'
import { dummyPlans } from '../assets/assets';
import Loading from './Loading';

const Credits = () => {
  const [plan, setPlan] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const fetchPlans = async () => {
    //fetch plans from backend
    setPlan(dummyPlans);
    setLoading(false);
  }
  React.useEffect(() => {
    fetchPlans();
  }, []);
  if (loading) return <Loading />;
  return (
    <div className='max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h2 className='text-3xl font-semibold text-center mb-10 xl:mt-5 text-gray-800 dark:text-white'>Credits Plans</h2>
      <div className='flex flex-wrap justify-center gap-8'>
        {
          plan.map((p) => (
            <div key={p._id} className={`border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg 
            transition-shadow p-5 min-w-[300px] flex flex-col ${p._id === 'pro' ? "bg-purple-50 dark:bg-purple-900" : "bg-white dark:bg-transparent"}`}>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>{p.name}</h3>
                <p className='text-2xl font-bold text-purple-600 dark:text-purple-300 mb-4'>${p.price}<span className='text-base font-normal text-gray-600 dark:text-purple-200'>{' '}/ {p.credits} credits</span></p>
                <ul>
                  {p.features.map((feature, index) => (
                    <li key={index} className='flex items-center mb-2'>
                      <span className='text-green-500 mr-2'>✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button className='mt-6 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium py-2 rounded transition-colors cursor-pointer'>Buy Now</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Credits
