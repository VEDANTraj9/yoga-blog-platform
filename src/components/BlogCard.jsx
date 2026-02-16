import React from 'react'

const BlogCard = ({ title, image, excerpt, category, id, readView }) => {

  const handleOnClick = (id) => {
    readView(id);
    
  }
  return (
     <div className="card bg-stone-50 hover:bg-base-150 hover:shadow-xl w-75 shadow-sm transition-all duration-300 border border-stone-100 ">
  <figure className='bg-stone-50'>
    <img
      src={image}
      className='rounded-t-2xl objective-cover h-48 w-full'
      alt={title} />
  </figure>
  <div className="card-body">
    <div className='badge badge-outline border-emerald-500 text-emerald-700 text-xs'>{category}</div>
    <h2 className="card-title text-lg font-bold">{title}</h2>
    <p className='ext-sm text-gray-600 line-clamp-2'>{excerpt}</p>
    <div className="card-actions justify-end mt-4">
      <button className="btn btn-sm btn-ghost text-emerald-600" onClick={ () => handleOnClick(id) } >Read More</button>
    </div>
  </div>
</div>
  )
}

export default BlogCard
