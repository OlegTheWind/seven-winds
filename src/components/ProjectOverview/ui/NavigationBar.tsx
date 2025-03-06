import React from 'react';
import styles from '../styles/NavigationBar.module.scss';


const NavigationBar: React.FC = () => {
    return (
        <>
            <aside className={styles.navigation_bar}>
                <ul style={{ width: '100%' }}>
                    <li className={styles.button_icon} style={{}}>МТО</li>
                    <li className={`${styles.button_icon} ${styles.blur_background }`}>СМР</li>
                    <li className={styles.button_icon}>по ра</li>
                    <li className={styles.button_icon}>Объекты</li>
                    <li className={styles.button_icon}>Рабочие</li>
                    <li className={styles.button_icon}>Капвложения</li>
                </ul>
            </aside>
        </>
    );
};

export default NavigationBar;
