import React from 'react';
import { servicePackages } from '../api/servicePackages';

type ServicePackage = {
  id: number;
  name: string;
  price: string;
  includes: string[];
};

type ExtraService = {
  id: number;
  name: string;
  price: string;
  note: string;
};

type ServicePackages = {
  packages: ServicePackage[];
  extras: ExtraService[];
};

const data: ServicePackages = servicePackages;

const Services = () => {
  return (
    <div className="min-h-screen bg-[#151515] text-white px-4 pt-28 pb-10">
      <h1 className="text-3xl font-bold mb-6">Наши услуги</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {data.packages.map(pkg => (
          <div key={pkg.id} className="bg-[#1e1e1e] p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">{pkg.name}</h2>
            <p className="text-sm text-gray-300 mb-2">{pkg.price}</p>
            <ul className="list-disc list-inside text-gray-400">
              {pkg.includes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-2xl font-semibold mt-10 mb-4">Дополнительно</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.extras.map(extra => (
              <div key={extra.id} className="bg-[#1e1e1e] p-4 rounded-lg">
                <h3 className="text-xl font-medium">{extra.name}</h3>
                <p className="text-sm text-gray-300">{extra.price}</p>
                <p className="text-sm text-gray-500">{extra.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="w-full bg-red-500 text-white py-3 rounded-md my-8"
      // onClick={() => }
      >
        Выбрать услугу
      </button>
    </div>
  );
};

export default Services;