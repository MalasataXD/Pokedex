import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Pagination({goNext, goPrev})
{
    // This component is for the Navigation buttons for going forward and backwards.
    return(
        <div class="menuButtons">
                <button onClick={goPrev}>
                    <FaChevronLeft/>
                </button>
                <button onClick={goNext}>
                    <FaChevronRight />
                </button>
        </div>)

}