import React from 'react';
import './DashboardCard.scss';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useContext } from 'react';
import { AppContext } from '../context/AuthContext';

const DashboardCard = () => {

    const { totalViews } = useContext(AppContext);

    return (
        <div className='dashboardCardContainer'>
            <div className="dashboardCardSection">
                <div className="dashboardCardIcon">
                    <FontAwesomeIcon icon={faEye} />
                </div>
                <h4 className="dashboardCardViews">
                    {totalViews}
                </h4>
                <div className="dashboardCardText">
                    Total Views
                </div>
            </div>
        </div>
    )
}

export default DashboardCard;
