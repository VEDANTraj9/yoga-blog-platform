 import React from 'react'

// Use { reviewCard } to "unpack" the data from the props object
const ReviewCard = ({ reviewCard, setSelectedCardStatus}) => {
    
  // Logic: Guard against empty data
  if (!reviewCard) return null;

  return (
    <div className="p-5 max-w-2xl mx-auto bg-white rounded-3xl shadow-xl">
      <h1 className="text-3xl font-bold mb-4">{reviewCard.english_name}</h1>
      <h1>{reviewCard.sanskrit_name_adapted}</h1>
      <h2>{reviewCard.translation_name}</h2>
      <img src={reviewCard.url_svg} alt={reviewCard.english_name} className="w-64 h-auto mb-4 mx-auto" />
      <div className="badge badge-secondary mb-4">{reviewCard.category_name}</div>
      <h3 className="font-bold">Benefits:</h3>
      <p className="mb-4">{reviewCard.pose_benefits}</p>
      <h3 className="font-bold">Description:</h3>
      <p className="italic text-gray-600">{reviewCard.pose_description}</p>
      
      <button className="btn btn-accent badge badge-soft badge-accent p-2 m-2 ml-0" onClick={() => setSelectedCardStatus(false)}> ← Go Back</button>
    </div>
  )
}

export default ReviewCard;