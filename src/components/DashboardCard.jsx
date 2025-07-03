import React from 'react';
import './DashboardCard.scss';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashboardCard = () => {
    return (
        <div className='dashboardCardContainer'>
            <div className="dashboardCardSection">
                <div className="dashboardCardIcon">
                    <FontAwesomeIcon icon={faEye} />
                </div>
                <h4 className="dashboardCardViews">
                    123M
                </h4>
                <div className="dashboardCardText">
                    Total Views
                </div>
            </div>
        </div>
    )
}

export default DashboardCard;
