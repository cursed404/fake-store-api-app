import { CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <CircularProgress 
        size={60}
        thickness={4}
        className="text-blue-500"
      />
    </div>
  )
}

export default Loading