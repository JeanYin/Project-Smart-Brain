import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='fa3 light-pink'>
                {'This Magic Brain will detect faces in your pictures. Git it a try!'}
            </p>
            <div className='center'>
                <div className='form center pa3 br3 shadow-5'>
                    <input 
                        className='f4 pa2 w-70 center' type='tex' 
                        onChange={onInputChange}
                    />
                    <button 
                        className='w-50 grow f4 link ph3 pv2 white bg-dark-gray'
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
         </div>
        </div>
    )
}

export default ImageLinkForm;