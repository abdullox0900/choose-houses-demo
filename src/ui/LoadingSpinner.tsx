const LoadingSpinner = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-white flex justify-center items-center z-50'>
      <div className="simple-spinner">
        <span></span>
      </div>
    </div>
  )
}

export default LoadingSpinner