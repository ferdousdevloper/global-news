import React from 'react';

const CustomizableNews = ({ openFilter }) => {
    console.log(openFilter)
    return (
        <div className={`flex gap-8 justify-end -mb-[48px] ${openFilter ? "block" : "hidden"}`}>


            <div className="dropdown dropdown-hover z-30">
                <select className="bg-transparent border-b-2 border-green-700 w-full max-w-xs p-2">
                    <option className='disabled selected text-[#02AA08]' >Pick the best JS framework</option>
                    <option className='text-[#02AA08]'>Svelte</option>
                    <option className='text-[#02AA08]'>Vue</option>
                    <option className='text-[#02AA08]'>React</option>
                </select>
            </div>
            <div className="dropdown dropdown-hover z-30">
                <select className="bg-transparent border-b-2 border-green-700 w-full max-w-xs p-2">
                    <option className='disabled selected text-[#02AA08]' >Pick the best JS framework</option>
                    <option className='text-[#02AA08]'>Svelte</option>
                    <option className='text-[#02AA08]'>Vue</option>
                    <option className='text-[#02AA08]'>React</option>
                </select>
            </div>
            <div className="dropdown dropdown-hover z-30">
                <select className="bg-transparent border-b-2 border-green-700 w-full max-w-xs p-2">
                    <option className='disabled selected text-[#02AA08]' >Pick the best JS framework</option>
                    <option className='text-[#02AA08]'>Svelte</option>
                    <option className='text-[#02AA08]'>Vue</option>
                    <option className='text-[#02AA08]'>React</option>
                </select>
            </div>
            <div className="dropdown dropdown-hover z-30">
                <select className="bg-transparent border-b-2 border-green-700 w-full max-w-xs p-2">
                    <option className='disabled selected text-[#02AA08]' >Pick the best JS framework</option>
                    <option className='text-[#02AA08]'>Svelte</option>
                    <option className='text-[#02AA08]'>Vue</option>
                    <option className='text-[#02AA08]'>React</option>
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