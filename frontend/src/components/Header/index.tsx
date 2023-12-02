import { AnimatePresence, motion } from 'framer-motion'
import { animationStart, reveal } from '../../utils/animation'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Menu, X } from 'lucide-react'

import Logo from '../Logo'
import MenuNavLink from '../MenuNavLink'

const navLinks = [
  { title: 'Sobre', to: '/sobre' },
  { title: 'Time', to: '/time' },
  { title: 'Stack', to: '/stack' },
  { title: 'Contato', to: '/contato' },
]

const Header = () => {
  const [open, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: animationStart }}
      className='py-14 w-[97%] mx-auto'
    >
      <motion.div
        variants={reveal}
        initial="hiddenVariant"
        animate="revealedVariant"
        transition={{
          ease: 'easeIn',
          type: 'tween',
          staggerChildren: 0.1,
          duration: 0.5,
          delayChildren: animationStart + 0.5,
        }}
        className="font-coolveticaLt mt-6 w-[97%] rounded-[20px] flex items-center justify-between h-[80px] absolute top-0 bg-[#2D2D2F] z-50"
      >
        <motion.div variants={reveal} className="mt-2 flex items-center gap-16">
          <div className='lg:mx-12 mx-4'>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="md:flex md:gap-6 gap-10 text-xl hidden mb-2 text-[#C5C5C5]">
            {navLinks.map((link) => (
              <Link key={link.title} to={link.to}>
                <h1 className='hover:text-white duration-200 ease-in-out borderAnim'>
                  {link.title}
                </h1>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={reveal}
          className="mx-12 md:mx-4 md:flex text-lg items-center hidden"
        >
          <Link to={'/login'} className='inline-block lg:py-3 lg:px-8 md:py-2 md:px-6 rounded-lg shadow-xl text-2xl btn-gradient text-[#C5C5C5] text-center font-caustenBd hover:scale-105 duration-300 ease-in-out'>Entrar</Link>
        </motion.div>
        <div
          className="cursor-pointer md:hidden text-lg mx-6 text-[#C5C5C5]"
          onClick={toggleMenu}
        >
          <Menu size={30} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              variants={menuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed left-0 top-0 w-full h-screen origin-top bg-navbar text-[#C5C5C5] p-10"
            >
              <div className="flex h-full flex-col">
                <div className="flex justify-between -mt-6">
                  <div className="lg:-mt-8">
                    <Link to="/">
                      <Logo />
                    </Link>
                  </div>
                  <div
                    className="cursor-pointer text-lg mt-12 text-[#C5C5C5]"
                    onClick={toggleMenu}
                  >
                    <X size={30} color='#C5C5C5'/>
                  </div>
                </div>
                <motion.div
                  variants={containerVars}
                  initial="initial"
                  animate="open"
                  exit="initial"
                  className="flex flex-col h-full justify-center font-caustenBd items-center gap-4"
                >
                  {navLinks.map((link, index) => {
                    return (
                      <div key={index} className="overflow-hidden">
                        <MenuNavLink
                          title={link.title}
                          href={link.to}
                        />
                      </div>
                    )
                  })}
                  <Link to={'/login'} className='mt-4 inline-block lg:py-4 lg:px-12 md:py-4 md:px-12 py-4 px-16 bg-[#C5C5C5] rounded-lg shadow-xl text-2xl text-[#383E4A] text-center font-caustenBd hover:scale-110 duration-300 ease-in-out'>Login</Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default Header