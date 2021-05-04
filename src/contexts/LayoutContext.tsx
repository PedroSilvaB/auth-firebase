import { createContext, useContext, useState } from 'react';
import Layout from '../components/Layout';

interface LayoutContextData{

}

const LayoutContext = createContext({} as LayoutContextData);


export const LayoutProvider = ({ children }) => {
    return (
        <LayoutContext.Provider value={{ }}>
            <Layout>
                {children}
            </Layout>
        </LayoutContext.Provider>
    )
}



const useLayout = () => useContext(LayoutContext);

export default useLayout;