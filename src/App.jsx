import { useState, useEffect } from 'react'
import './App.css'
import BlogCard from './components/BlogCard'
import ReviewCard from './components/ReviewCard'
import axios from 'axios'

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [reviewCard, setReviewCard] = useState();
  const [selectedCardStatus, setSelectedCardStatus] = useState(false);
  console.log(data);
 

  useEffect(() => {
      const fetchData = async() => {
        try{
          setIsLoading(true);
           const response = await axios.get('https://yoga-api-nzy4.onrender.com/v1/categories')
           const allPoses = response.data.flatMap(yoga => yoga.poses);
           const yogas =  allPoses.map((pose, index) => ({
            ...pose, id: index
           }))

          if(yogas){
             setData(yogas);
          }
        }catch(err) {
          console.error("API Error:", err);
          
        }finally {
          setIsLoading(false)
        }
      
    }
    
    fetchData();
      console.log(data);
  }, []);

  function creatingArray(n) {
    return  [...Array(n).keys()];
  }

  const perPageCards = 6;

  const totalCards = data.length;
  const totalPages = Math.ceil(totalCards / perPageCards);
  const startIndx = currentPage * perPageCards;
  const endIndx = startIndx + perPageCards;
  const indxArray =  creatingArray(totalPages);
  console.log(indxArray.length);
  console.log(totalPages);

  const handlePageNum = (n) => {
    setCurrentPage(n);
    
  }
  const gotoNextPage = (n) => { 
      setCurrentPage((pre) => pre+1)
    
  }
  const gotoPriviousPage = (n) => {
      setCurrentPage((pre) => pre-1)
  }

  const readView = (id) => {
    const reviewData = data.find(card => card.id === id);
    console.log(reviewData)
    setReviewCard(reviewData);
    
    setSelectedCardStatus(true);
  }
   console.log(reviewCard)
  return (
    <>
    <div className='p-10 bg-base-200 min-h-screen'>
       {isLoading ? 
       <div className='flex flex-col justify-center items-center'>
         <h3>Loading...</h3>
          <span className="loading loading-spinner loading-xl"></span>
       </div>
       : 
        selectedCardStatus === false ? 
        <div className='flex flex-col justify-center items-center gap-3'>
            <div className='flex justify-center flex-wrap'>
        <button className='btn btn-soft btn-accent m-2 ' disabled={currentPage === 0} onClick={()=>gotoPriviousPage(currentPage)}>pre</button>
             { indxArray.map((i) => (
            <button key = {i} className={`btn m-2 ${i === currentPage ? 'btn-active btn-primary' : 'btn-soft'}`} onClick={()=> handlePageNum(i)}>{i}</button>
           ))}
          <button className='btn btn-soft btn-accent m-2' disabled={currentPage === indxArray.length-1 } onClick={()=>gotoNextPage(currentPage)}>Next</button>
          </div>
          
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center'>
          {
          data.slice(startIndx, endIndx).map((yogaBlog, index) => (
              <BlogCard key={yogaBlog.id} title={yogaBlog.sanskrit_name_adapted}  image={yogaBlog.url_svg} excerpt={yogaBlog.pose_description} category={yogaBlog.category_name} id= {yogaBlog.id} readView={readView}/>
          ))
    }
      </div>
       
        </div>
      : <ReviewCard reviewCard= {reviewCard} setSelectedCardStatus={setSelectedCardStatus}/> 
    
   }

       
    </div>

        
    </>
  )
}

export default App
