import { Alert, AlertTitle } from '@mui/material'
import { Button } from '@mui/material'

interface ErrorProps {
  message: string
  retry?: () => void
}

const ErrorComponent = ({ message, retry }: ErrorProps) => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Alert severity="error" className="mb-4">
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
      
      {retry && (
        <Button 
          variant="contained" 
          color="error"
          onClick={retry}
        >
          Retry
        </Button>
      )}
    </div>
  )
}

export default ErrorComponent