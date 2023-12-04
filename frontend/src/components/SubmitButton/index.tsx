import { motion } from 'framer-motion'
import { ISubmitButtonProps } from './type'

const SubmitButton = ({ handleSubmit }: ISubmitButtonProps) => {
  return (
    <motion.button
      key="button"
      type="button"
      onClick={handleSubmit}
      className="inline-block lg:py-4 lg:px-12 md:py-4 md:px-12 py-2 px-10 bg-gradient rounded-full text-lg text-white text-center font-caustenBd shadow-lg hover:scale-110 duration-300 ease-in-out"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
              Upload
    </motion.button>
  )
}

export default SubmitButton