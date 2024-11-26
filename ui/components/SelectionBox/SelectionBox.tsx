'use client';

// React
import React, { Fragment, useState } from 'react';

// Framer Motion
import { motion } from 'framer-motion';

// Types
import { IconPropsType } from '@/lib/types/IconPropsType';


type SelectionBoxPropsType = {
  title: string,
  items: {
    name: string,
    icon: React.ElementType<IconPropsType>
  }[]
};

export default function SelectionBox({title, items}: SelectionBoxPropsType) {
  const [selectedItem, setSelectedItem] = useState<{name: string, icon: React.ElementType<IconPropsType>}>(items[0]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-2">
      <label className="text-2xl text-center font-bold">{title}</label>
      <div className="flex flex-wrap justify-center items-center gap-5 max-w-[450px] border-[4px] border-dark rounded-xl p-5">
      {
        items.map((item, i) =>
          <Fragment key={i}>  
            <div onClick={() => setSelectedItem(item)} className="relative flex justify-center items-center size-14 rounded-md cursor-pointer">
              <item.icon className="h-10 w-auto fill-dark z-[1]" />
              {
                (selectedItem === item) ?
                <motion.div layoutId={`background-${title}`} className="absolute top-0 left-0 size-full border-[3px] border-secondary rounded">
                  <div className="size-full bg-secondary opacity-25"></div>
                </motion.div> : null
              }
            </div>
            {
              (i !== items.length - 1) ? 
              <div className="flex justify-center items-center h-12 w-auto">
                <div className="h-8 w-[3px] bg-inactive rounded-full"></div>
              </div> : null
            } 
          </Fragment>
          
        )
      }
      </div>
      <label className="text-center">Selected: <b>{selectedItem.name}</b></label>
    </div>
  );
}