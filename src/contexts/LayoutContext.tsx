import { createContext, useContext } from 'react';
import Layout from '../components/Layout';
import useRoute from './RouterContext';

const LayoutContext = createContext(null);


export const LayoutProvider = ({ children }) => {
    const { dash } = useRoute()
    return (
        <LayoutContext.Provider value={{ dash }}>
            <Layout>
                {children}
            </Layout>
        </LayoutContext.Provider>
    )
}



const useLayout = () => useContext(LayoutContext);

export default useLayout;