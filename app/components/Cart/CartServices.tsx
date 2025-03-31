
'use client'
import React, { useState } from 'react';
import { RootState } from '@/app/GlobalRedux/store';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Tooltip } from 'primereact/tooltip';
import { TiInfoLarge } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeOne } from '@/app/GlobalRedux/Features/cartSlice';
import { servicePackages } from '@/app/api/servicePackages';


type ServicePackage = {
  id: number;
  name: string;
  price: number;
  cost: string;
  includes: string[];
  image: string;
};

type ExtraService = {
  id: number;
  name: string;
  price: number;
  cost: string;
  note: string;
  image: string;
};

type ServicePackages = {
  packages: ServicePackage[];
  extras: ExtraService[];
};

const data: ServicePackages = servicePackages;

const CartServices = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (itemName: string) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(itemName)) {
        return prevSelected.filter((name) => name !== itemName);
      } else {
        return [...prevSelected, itemName];
      }
    });
  };
    return (
        <div className="card mb-4">
            <Accordion activeIndex={1}>
                <AccordionTab header="Добавить услугу" className=''>
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Дополнительно</h2>
                    <div className="grid gap-6 md:grid-cols-2 mb-4">
                      {data.packages.map((pkg, index) => {
                        const cartItem = cartItems.find((item) => item.id === pkg.id);
                        return (
                          <div key={pkg.id} className={`${cartItem ? 'border-gray-400 bg-[#393939] text-white' : 'text-gray-300  border-transparent'} transition-all duration-200 border-2 bg-[#1e1e1e] p-4 rounded-lg cursor-pointer`}
                            onClick={() => {
                              handleSelect(pkg.name);
                              if (cartItem) {
                                dispatch(removeOne(pkg.id));
                              } else {
                                dispatch(
                                  addToCart({
                                    id: pkg.id,
                                    name: pkg.name,
                                    price: Number(pkg.price),
                                    image: pkg.image,
                                  })
                                );
                              }
                            }}>
                            <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
                            <div className='flex justify-between'>
                              <p className="text-sm text-gray-300 mb-2">{pkg.price}</p>
                              <div className="card flex justify-center">
                                <Tooltip target={`#tooltip-package-${index}`} className="custom-tooltip w-1/2">
                                  {pkg.includes.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </Tooltip>
                                <TiInfoLarge onClick={(event) => event.stopPropagation()} size={20} color='green' id={`tooltip-package-${index}`} type="button" data-pr-position="top" data-pr-at="right+0 top" data-pr-my="top center-150" />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
      
                    <div className="grid gap-4 md:grid-cols-2">
                      {data.extras.map((extra, index) => {
                        const cartItem = cartItems.find((item) => item.id === extra.id);
                        return (
                          <div key={extra.id} className={`${cartItem ? 'border-gray-400 bg-[#393939] text-white' : 'text-gray-300 border-transparent'} transition-all duration-200 border-2 bg-[#1e1e1e] p-4 rounded-lg cursor-pointer`} 
                          onClick={() => {
                            handleSelect(extra.name);
                            if (cartItem) {
                              dispatch(removeOne(extra.id));
                            } else {
                              dispatch(
                                addToCart({
                                  id: extra.id,
                                  name: extra.name,
                                  price: Number(extra.price),
                                  image: extra.image,
                                })
                              );
                            }
                          }}>
                            <h3 className="text-xl font-medium">{extra.name}</h3>
                            <div className='flex justify-between'>
                              <p className="text-sm text-gray-300">{extra.price}</p>
                              <div className="card flex justify-center">
                                <Tooltip target={`#tooltip-extra-${index}`} className="custom-tooltip w-1/2 min-h30">
                                  <p className="text-sm ">{extra.note}</p>
                                </Tooltip>
                                <TiInfoLarge size={20} color='green' id={`tooltip-extra-${index}`} type="button" data-pr-position="top" data-pr-at="right+120 top" data-pr-my="top center-120" />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </AccordionTab>
            </Accordion>
        </div>
    )
}

export default CartServices;