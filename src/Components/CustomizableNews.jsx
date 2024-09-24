import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const CustomizableNews = ({ openFilter }) => {
    console.log(openFilter)

    const { data: news = [] } = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:3001/news')
            return data;
        }
    })
    console.log(news)

    const region = [...new Set(news?.map(region => region.region))]
    console.log(region)
    const category = [...new Set(news?.map(category => category.category))]
    console.log(category)
    const title = [...new Set(news?.map(title => title.title))]
    console.log(title)



    return (
        <div className={`flex gap-8 justify-end -mb-[48px] ${openFilter ? "block" : "hidden"}`}>


            <div className="dropdown dropdown-hover z-30">
                <select className="bg-transparent border-b-2 border-green-700 w-full max-w-xs p-2">
                    <option className='disabled selected text-[#02AA08]' >Region</option>
                    {
                        region?.map(reg => <option className='text-[#02AA08]'>{reg}</option>)
                    }
                </select>
            </div>
            <div className="dropdown dropdown-hover z-30">
                <select className="bg-transparent border-b-2 border-green-700 w-full max-w-xs p-2">
                    <option className='disabled selected text-[#02AA08]' >Category</option>
                    {
                        category?.map(cat => <option className='text-[#02AA08]'>{cat}</option>)
                    }
                </select>
            </div>
            <div className="dropdown dropdown-hover z-30">
                <select className="bg-transparent border-b-2 border-green-700 w-full max-w-xs p-2">
                    <option className='disabled selected text-[#02AA08]' >Topic</option>
                    {
                        title?.map(tit => <option className='text-[#02AA08]'>{tit}</option>)
                    }
                </select>
            </div>
           
            <div className='z-30'>
                <button className='btn bg-[#02AA08]'>search</button>
            </div>
            <div className='z-30'>
                <button className='btn bg-[#02AA08]'>reset</button>
            </div>

        </div>
    );
};

export default CustomizableNews;