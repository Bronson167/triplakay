import React from 'react'
import Title from './Title'
import { teamData } from '../assets/assets'
import { motion } from "motion/react";

const Teams = () => {
  return (
    <motion.div 
    initial='hidden'
    whileInView='visible'
    transition={{staggerChildren: 0.2}}
     
    className='flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark: text-white'>
      <Title title='Rencontrez l’équipe' desc='Les fondateurs derrière nos solutions digitales, au service de votre réussite.'/>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {
                
                teamData.map((team, index)=>(
                    
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={index} className='flex max-sm:flex-col items-center gap-5 p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-gray-100 dark:shadow-white/5 hover:scale-103 transition-all duration-400'>


                        <img src={team.image} className='w-12 h-12 rounded-full' alt="" />
                       <div className='flex-1'>
    <h3 className='font-bold text-sm text-gray-900 dark:text-white'>{team.name}</h3>
    <p className='text-xs text-gray-500 dark:text-white/75'>{team.title}</p>
</div>

                    </motion.div>
                ))
            }

        

        </div>
    </motion.div>
  )
}

export default Teams
