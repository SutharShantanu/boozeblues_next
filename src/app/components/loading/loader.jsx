import { Loader } from 'lucide-react';
import React from 'react';


const loader = () => {
    return (
        <React.Fragment>
            <div className='bg-red-300'>
            <Loader size={16} strokeWidth={1.2} absoluteStrokeWidth />
            </div>
        </React.Fragment >
    )
}

export default loader;



// Default values shown
