import React from 'react';

const CustomizableNews = () => {
    return (
        <div className='flex'>
            <div className="dropdown dropdown-hover z-30 absolute">
                <div tabIndex={0} role="button" className="btn btn-outline bg-none border-none border-b-2 m-1 w-48 hover:bg-none">Hoverfgfgfg</div>
                <ul tabIndex={0} className="dropdown-content menu z-[1] w-48">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>

            <div className="dropdown dropdown-hover z-30 absolute left-52">
                <div tabIndex={0} role="button" className="btn m-1">Hover</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
        </div>
    );
};

export default CustomizableNews;