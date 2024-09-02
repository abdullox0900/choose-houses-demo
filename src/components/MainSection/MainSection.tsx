import React, { ReactNode } from 'react'

interface Children {
  children: ReactNode
}

export const MainSection = (props: Children) => {
  return (
    <div className='px-[20px]'>
      {props.children}
    </div>
  )
}
